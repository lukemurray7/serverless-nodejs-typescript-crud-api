import { APIGatewayProxyResult } from 'aws-lambda';
import { ErrorObject } from '../interfaces';



export const lambdaResponse = (error: ErrorObject | null, response: string | null): APIGatewayProxyResult => {
  if (error) {
    return {
      statusCode: error.statusCode,
      body: JSON.stringify({
        message: error.message,
      }),
    };
  }

  return {
    statusCode: 200,
    body: response ? response : JSON.stringify({}),
  };
};
