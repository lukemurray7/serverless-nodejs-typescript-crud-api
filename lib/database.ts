import { DynamoDB } from 'aws-sdk';
import {
  AttributeMap,
  ScanInput,
  ScanOutput,
  GetItemInput,
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

const update = async (item: DocumentClient.PutItemInputAttributeMap): Promise<PutItemOutput> => {
  const dynamodb = new DocumentClient();
  const params: DocumentClient.PutItemInput = {
    TableName,
    ConditionExpression: 'attribute_exists(id)',
    Item: item,
  }
  return dynamodb.put(params).promise();
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
