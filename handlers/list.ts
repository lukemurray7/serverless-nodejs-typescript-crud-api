import { APIGatewayProxyResult } from 'aws-lambda';

import db from '../lib/database';
import { lambdaResponse } from '../helpers';


export const handler = async (): Promise<APIGatewayProxyResult> => {
  try {
    const readResult = await db.list();
    return lambdaResponse(null, JSON.stringify({ items: readResult }));
  } catch (error) {
    return lambdaResponse({
      statusCode: error ? error.statusCode : 500,
      message: error ? error.message : 'There was a problem creating the item',
    }, null);
  }
}

exports.handler = handler;
