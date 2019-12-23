import { DynamoDB } from 'aws-sdk';

const TableName = process.env.TABLE_NAME || '';

const fetch = async (id: string) => {
  const dynamodb = new DynamoDB.DocumentClient();
  const params = {
    TableName,
    Key: { id },
  }
  const data = await dynamodb.get(params).promise();
  return data.Item;
}

const list = async () => {
  const dynamodb = new DynamoDB.DocumentClient();
  const params = {
    TableName,
  };

  const data = await dynamodb.scan(params).promise();
  return data.Items;
};

const create = async (item: DynamoDB.DocumentClient.PutItemInputAttributeMap) => {
  const dynamodb = new DynamoDB.DocumentClient();
  const params = {
    TableName,
    ConditionExpression: 'attribute_not_exists(id)',
    Item: item,
  }
  await dynamodb.put(params).promise();
  return item;
};

const update = async (item: DynamoDB.DocumentClient.PutItemInputAttributeMap) => {
  const dynamodb = new DynamoDB.DocumentClient();
  const params = {
    TableName,
    KeyConditionExpression: 'attribute_exists(id)',
    ExpressionAttributeNames: {
      '#id': 'id',
    },
    ExpressionAttributeValues: {
      ':id': item.id,
    },
    Item: item,
  }
  const created = await dynamodb.put(params).promise();
  return created.$response;
};

const deleteItem = async (id: string) => {
  const dynamodb = new DynamoDB.DocumentClient();
  const params = {
    TableName,
    Key: {
      id,
    },
  }
  const deleted = await dynamodb.delete(params).promise();
  return deleted.$response;
};

export default {
  list,
  fetch,
  create,
  update,
  delete: deleteItem,
};
