import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda';

import { lambdaResponse } from '../helpers';
import db from '../lib/database';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if (!event.body) {
    return lambdaResponse({ statusCode: 400, message: "Item to update not found" }, null);
  }
  const body = JSON.parse(event.body);
  try {
    const updated = await db.update(body);
    return lambdaResponse(null, JSON.stringify({ item: updated }));
  } catch (error) {
    return lambdaResponse({
      statusCode: error ? error.statusCode : 500,
      message: error ? error.message : 'There was a problem updating the item',
    }, null);
  }
};
