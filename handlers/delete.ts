import { APIGatewayProxyHandler } from 'aws-lambda';

const handler: APIGatewayProxyHandler = async (event, _context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'DELETE',
      qsp: event.queryStringParameters,
    }),
  };
}


module.exports = {
  handler,
};