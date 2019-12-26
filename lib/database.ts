import { DynamoDB } from 'aws-sdk';
import {
  ScanInput,
  ScanOutput,
  DocumentClient,
  PutItemOutput,
  GetItemOutput,
  DeleteItemOutput
} from 'aws-sdk/clients/dynamodb';

const TableName = process.env.TABLE_NAME || '';

const fetch = async (id: string): Promise<GetItemOutput> => {
  const dynamodb = new DocumentClient();
  const params: DocumentClient.GetItemInput = {
    TableName,
    Key: { id },
  }
  return dynamodb.get(params).promise();
}

const list = async (): Promise<ScanOutput> => {
  const dynamodb = new DynamoDB.DocumentClient();
  const params: ScanInput = {
    TableName,
  };

  return dynamodb.scan(params).promise();
};

const create = async (item: DocumentClient.PutItemInputAttributeMap): Promise<PutItemOutput> => {
  const dynamodb = new DocumentClient();
  const params: DocumentClient.PutItemInput = {
    TableName,
    ConditionExpression: 'attribute_not_exists(id)',
    Item: item,
  }
  return dynamodb.put(params).promise();
};

const update = async (
  id: string,
  updateItems: DocumentClient.AttributeMap
): Promise<PutItemOutput> => {

  const attributeNames: DocumentClient.AttributeMap = {};
  const attributeValues: DocumentClient.AttributeMap = {};
  let updateExpression: string = 'set ';

  Object.keys(updateItems).forEach((key) => {
    attributeNames[`#${key}`] = `${key}`;
    attributeValues[`:${key}`] = updateItems[key];
    updateExpression = `${updateExpression}#${key} = :${key}, `;
  });

  const dynamodb = new DocumentClient();
  const params: DocumentClient.UpdateItemInput = {
    TableName,
    ExpressionAttributeNames: attributeNames,
    ExpressionAttributeValues: attributeValues,
    UpdateExpression: updateExpression.slice(0, -2),
    Key: { id },
    ReturnValues: 'ALL_NEW',
  }
  return dynamodb.update(params).promise();
};

const deleteItem = async (id: string): Promise<DeleteItemOutput> => {
  const dynamodb = new DocumentClient();
  const params: DocumentClient.DeleteItemInput = {
    TableName,
    ConditionExpression: 'attribute_exists(id)',
    Key: { id },
    ReturnValues: 'ALL_OLD',
  }

  return await dynamodb.delete(params).promise();
};

export default {
  list,
  fetch,
  create,
  update,
  delete: deleteItem,
};
