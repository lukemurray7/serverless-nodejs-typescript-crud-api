import { APIGatewayProxyHandler } from 'aws-lambda';

const handler: APIGatewayProxyHandler = async (event, _context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'READ',
      qsp: event.queryStringParameters,
    }),
  };
}


module.exports = {
  handler,
};