import { SSM } from 'aws-sdk';

const getAPIKey = async () => {
  const ssm = new SSM();
  console.log(ssm);
  const key = await ssm.getParameter({ Name: 'test' }).promise();
  return key;
};

const handler = async (event) => {
  const token = event.authorizationToken.toLowerCase();
  console.log(token);
  try {
    const key = await getAPIKey();
    console.log(token, key);
  } catch (error) {
    console.log(error);
  }

}


exports.handler = handler;