import { APIGatewayEvent } from 'aws-lambda';

import { handler } from '../handlers/create';
import db from '../lib/database';

jest.mock('../lib/database');
jest.mock('uuid/v4', () => jest.fn().mockImplementation(() => '12345'));
jest.mock('dayjs', () => jest.fn().mockImplementation(() => '12345678910'));

const mockItem = { sensor: 'kitchen', number: 205 };
const mockEvent = {
  body: JSON.stringify(mockItem),
} as APIGatewayEvent;

describe('Create handler', () => {
  it('Should return a 400 bad request error if there is no body', async (done) => {
    const mockEvent = {} as APIGatewayEvent;
    const result = await handler(mockEvent);
    expect(result).toEqual({
      statusCode: 400,
      body: JSON.stringify({ 'message': 'Bad Request' }),
    });
    done();
  });

  it('Should return a 400 bad request error if the required keys are not present in the request', async (done) => {
    const mockItem = { notvalidkey: '123' };
    const mockEvent = {
      body: JSON.stringify(mockItem),
    } as APIGatewayEvent;

    const result = await handler(mockEvent);
    expect(result).toEqual({
      statusCode: 400,
      body: JSON.stringify({ 'message': 'Bad Request' }),
    });
    done();
  });

  it('Should return the statuscode and message of the error if an error occurs', async (done) => {
    db.create = jest.fn().mockReturnValue(Promise.reject({ statusCode: 500, message: "some error" }));
    const result = await handler(mockEvent);

    expect(result).toEqual({
      statusCode: 500,
      body: JSON.stringify({ message: 'some error' }),
    });
    done();
  });

  it('Should return the default error code and message if none is given', async (done) => {
    db.create = jest.fn().mockReturnValue(Promise.reject());
    const result = await handler(mockEvent);

    expect(result).toEqual({
      statusCode: 500,
      body: JSON.stringify({ message: 'There was a problem creating the item' }),
    });
    done();
  });

  it('should return the newly created item if successful', async (done) => {
    db.create = jest.fn().mockReturnValue(Promise.resolve(mockItem));
    const result = await handler(mockEvent);

    expect(result).toEqual({
      statusCode: 200,
      body: JSON.stringify({
        item: {
          ...mockItem,
          id: '12345',
          createdAt: '12345678910',
        }
      }),
    });

    done();
  });
});
