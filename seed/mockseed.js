const { DynamoDB } = require('aws-sdk');
const mockData = require('./mock-data.js');

const dynamodb = new DynamoDB.DocumentClient();

const addItem = (item) => {
  console.log(item);
  const params = {
    TableName: process.env.TABLE_NAME || 'sensor-data-table',
    Item: item,
  };
  return dynamodb.put(params).promise();
};

const seedFakeData = async () => {
  try {
    const promises = mockData.fakeData.map(item => addItem(item));
    await Promise.all(promises);
    console.log('Seeded database');
    return;
  } catch (error) {
    console.log(error);
    return null;
  }
};




seedFakeData();
