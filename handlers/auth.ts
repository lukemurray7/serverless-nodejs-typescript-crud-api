import { SSM } from 'aws-sdk';
import { CustomAuthorizerResult, CustomAuthorizerEvent } from 'aws-lambda';

const generatePolicy = (authenticated: boolean, methodArn: string): CustomAuthorizerResult => {
  return {
    // TODO work out what principal id is used for.
    principalId: '12345',
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: authenticated ? 'Allow' : 'Deny',
          Resource: methodArn,
        }
      ]
    }
  };
};

const getAPIKey = async (): Promise<string> => {
  const ssm: SSM = new SSM();
  const result = await ssm.getParameter({ Name: process.env.SECRET_NAME }).promise();
  return result.Parameter.Value;
};

const handler = async (event: CustomAuthorizerEvent): Promise<CustomAuthorizerResult> => {
  const token: string = event.authorizationToken.toLowerCase();
  console.log(event.methodArn);
  try {
    const key: string = await getAPIKey();
    if (token === key) {
      return generatePolicy(true, event.methodArn);
    }
    throw new Error("Unauthenticated");
  } catch (error) {
    return generatePolicy(false, event.methodArn);
  }
}


exports.handler = handler;
