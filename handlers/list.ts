import { APIGatewayProxyResult } from 'aws-lambda';

import { lambdaResponse } from '../helpers/lambda-response';
import { ScanOutput } from 'aws-sdk/clients/dynamodb';

import db from '../lib/database';

/**
 * Lists all sensor data items. Returns the a list of items.
 *
 * @param event Api gateway event object
 */

export const handler = async (): Promise<APIGatewayProxyResult> => {
  try {
    const data: ScanOutput = await db.list();
    return lambdaResponse(null, JSON.stringify({ items: data.Items }));
  } catch (error) {
    return lambdaResponse({
      statusCode: error ? error.statusCode : 500,
      message: error ? error.message : 'There was a problem creating the item',
    }, null);
  }
}

exports.handler = handler;
