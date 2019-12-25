import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda';
import { GetItemOutput } from 'aws-sdk/clients/dynamodb';

import { lambdaResponse } from '../helpers/lambda-response';
import db from '../lib/database';

/**
 * Fetches sensor data item based on the id passed. Returns the item.
 *
 * @param event Api gateway event object
 */

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const id: string = event.pathParameters ? event.pathParameters.id : '';

  if (!id) {
    return lambdaResponse({ statusCode: 400, message: "Bad Request - no id found" }, null);
  }

  try {
    const item: GetItemOutput = await db.fetch(id);
    return lambdaResponse(null, JSON.stringify({ item: item.Item }));
  } catch (error) {
    return lambdaResponse({
      statusCode: error.statusCode || 500,
      message: error.message || 'There was a problem deleting the item',
    }, null);
  }
};
