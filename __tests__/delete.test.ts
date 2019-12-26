import { APIGatewayProxyEvent, APIGatewayEvent } from 'aws-lambda';

import { handler } from '../handlers/delete';

import notifications from '../lib/notifications';
import db from '../lib/database';

jest.mock('../lib/database');
jest.mock('../lib/notifications');


const mockEvent = {
  pathParameters: {
    "id": "12345",
  },
} as unknown as APIGatewayEvent;

describe('Delete handler', () => {
  it('Should return a 400 bad request error if there is no id', async (done) => {
    const mockEvent = {} as APIGatewayProxyEvent;
    const result = await handler(mockEvent);
    expect(result).toEqual({
      statusCode: 400,
      body: JSON.stringify({ 'message': 'Bad Request' }),
    });
    done();
  });

  it('Should return the statuscode and message of the error if an error occurs', async (done) => {
    db.delete = jest.fn().mockReturnValue(Promise.reject({ statusCode: 500, message: "some error" }));
    const result = await handler(mockEvent);

    expect(result).toEqual({
      statusCode: 500,
      body: JSON.stringify({ message: 'some error' }),
    });
    done();
  });

  it('should call send a notification and return a lambda response on success', async (done) => {
    const mockResult = { Attributes: { id: '12345' } };
    db.delete = jest.fn().mockReturnValue(Promise.resolve(mockResult));
    notifications.send = jest.fn().mockReturnValue(Promise.resolve());
    const result = await handler(mockEvent);

    expect(notifications.send).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      statusCode: 200,
      body: JSON.stringify(mockResult.Attributes),
    });
    done();
  });
});
