import { APIGatewayProxyResult } from 'aws-lambda';

export interface ErrorObject {
  message: string,
  statusCode: number,
};

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
