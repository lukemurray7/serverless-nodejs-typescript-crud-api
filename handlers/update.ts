import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda';

import { validateRequest } from '../helpers/validation';
import { lambdaResponse } from '../helpers/lambda-response';
import { UpdateInput, SensorData } from '../interfaces';
import { PutItemOutput } from 'aws-sdk/clients/dynamodb';

import db from '../lib/database';

const REQUIRED = ['id'];

/**
 * Update a sensor data item from the database. Returns the updated item
 *
 * @param event Api gateway event object
 */


export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if (!event.body || !validateRequest(event.body, REQUIRED)) {
    return lambdaResponse({ statusCode: 400, message: "Bad Request" }, null);
  }

  try {
    const { id, ...rest } = JSON.parse(event.body);
    const updated: PutItemOutput = await db.update(id, rest);

    return lambdaResponse(null, JSON.stringify({
      item: updated.Attributes,
    }));
  } catch (error) {
    return lambdaResponse({
      statusCode: error ? error.statusCode : 500,
      message: error ? error.message : 'There was a problem updating the item',
    }, null);
  }
};
