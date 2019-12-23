import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda';

import { lambdaResponse, ErrorObject } from '../helpers';
import db from '../lib/database';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if (!event.body) {
    return lambdaResponse({ statusCode: 400, message: "Item to create not found" }, null);
  }
  const body = JSON.parse(event.body);
  try {
    const created = await db.create(body);
    return lambdaResponse(null, JSON.stringify(created));
  } catch (error) {
    return lambdaResponse({
      statusCode: error ? error.statusCode : 500,
      message: error ? error.message : 'There was a problem creating the item',
    }, null);
  }
};
