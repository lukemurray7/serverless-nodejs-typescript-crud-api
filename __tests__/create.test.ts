import { handler } from '../handlers/create';
import db from '../lib/database';

jest.mock('../lib/database');

const mockEvent = {

} as any;


describe('Create handler', () => {
  it('Should return a 400 bad request error if there is no body', async (done) => {
    const result = await handler(mockEvent);
    expect(result).toEqual({
      statusCode: 400,
      body: '{"message":"Item to create not found"}'
    });
    done();
  })

  it('Should return the statuscode and message of the error if an error occurs', async (done) => {
    const mockItem = { id: '123' };
    const mockEvent = {
      body: JSON.stringify(mockItem),
    } as any;

    db.create = jest.fn().mockReturnValue(Promise.reject({ statusCode: 500, message: "some error" }));
    const result = await handler(mockEvent);

    expect(result).toEqual({
      statusCode: 500,
      body: JSON.stringify({ message: 'some error' }),
    });
    done();
  });

  it('Should return the default error code and message if none is given', async (done) => {
    const mockItem = { id: '123' };
    const mockEvent = {
      body: JSON.stringify(mockItem),
    } as any;

    db.create = jest.fn().mockReturnValue(Promise.reject());
    const result = await handler(mockEvent);

    expect(result).toEqual({
      statusCode: 500,
      body: JSON.stringify({ message: 'There was a problem creating the item' }),
    });
    done();
  });

  it('should return the newly created item if successful', async (done) => {
    const mockItem = { id: '123' };
    const mockEvent = {
      body: JSON.stringify(mockItem),
    } as any;

    db.create = jest.fn().mockReturnValue(Promise.resolve(mockItem));
    const result = await handler(mockEvent);

    expect(result).toEqual({
      statusCode: 200,
      body: JSON.stringify(mockItem),
    });
    done();
  });
});
