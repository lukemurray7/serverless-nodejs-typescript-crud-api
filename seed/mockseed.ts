import { SensorData } from "../interfaces";

import { DocumentClient, PutItemOutput } from 'aws-sdk/clients/dynamodb';
const mockData = require('./mock-data.js');

const addItem = (item: SensorData): Promise<PutItemOutput> => {
  const dynamodb = new DocumentClient();
  const params: DocumentClient.PutItemInput = {
    TableName: process.env.TABLE_NAME || 'sensor-data-table',
    ConditionExpression: 'attribute_not_exists(id)',
    Item: item,
  };
  return dynamodb.put(params).promise();
};

const seedFakeData = async (): Promise<void> => {
  try {
    const promises: Promise<PutItemOutput>[] = mockData.fakeData.map((item: SensorData) => addItem(item));
    await Promise.all(promises);
    console.log('Seeded database');
    return;
  } catch (error) {
    console.log(error);
    return;
  }
};




seedFakeData();
