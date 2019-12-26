import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda';

import { lambdaResponse } from '../helpers/lambda-response';
import { PutItemOutput } from 'aws-sdk/clients/dynamodb';
import notifications from '../lib/notifications';
import db from '../lib/database';

/**
 * Delete a sensor data item from the database. Returns the id
 *
 * @param event Api gateway event object
 */

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const id: string = event.pathParameters ? event.pathParameters.id : '';
  if (!id) {
    return lambdaResponse({ statusCode: 400, message: 'Bad Request' }, null);
  }

  try {
    const deleted: PutItemOutput = await db.delete(id);
    await notifications.send(deleted.Attributes || { id });
    return lambdaResponse(null, JSON.stringify(deleted.Attributes || { id }));
  } catch (error) {
    return lambdaResponse({
      statusCode: error.statusCode || 500,
      message: error.message || 'There was a problem deleting the item',
    }, null);
  }
};
