import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda';

import { lambdaResponse } from '../helpers';
import db from '../lib/database';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const id: string = event.pathParameters ? event.pathParameters.id : '';

  if (!id) {
    return lambdaResponse({ statusCode: 400, message: "Bad Request - no id found" }, null);
  }

  try {
    const item = await db.fetch(id);
    return lambdaResponse(null, JSON.stringify({ item }));
  } catch (error) {
    return lambdaResponse({
      statusCode: error.statusCode || 500,
      message: error.message || 'There was a problem deleting the item',
    }, null);
  }
};
