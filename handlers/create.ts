import dayjs from 'dayjs';
import uuid from 'uuid/v4';
import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda';

import { validateRequest } from '../helpers/validation';
import { SensorData, CreateInput } from '../interfaces';
import { lambdaResponse } from '../helpers/lambda-response';

import db from '../lib/database';

const REQUIRED = ['number', 'sensor'];

/**
 * Creates a new sensor data item and stores it in the database. Returns the new item.
 *  
 * @param event Api gateway event object
 */

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if (!event.body || !validateRequest(event.body, REQUIRED)) {
    return lambdaResponse({ statusCode: 400, message: "Bad Request" }, null);
  }

  const body: CreateInput = JSON.parse(event.body);
  const newSensorDataItem: SensorData = {
    ...body,
    id: uuid(),
    createdAt: dayjs().valueOf().toString(),
  };

  try {
    await db.create(newSensorDataItem);
    return lambdaResponse(null, JSON.stringify({ item: newSensorDataItem }));
  } catch (error) {
    return lambdaResponse({
      statusCode: error ? error.statusCode : 500,
      message: error ? error.message : 'There was a problem creating the item',
    }, null);
  }
};
