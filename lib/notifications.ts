import dayjs from 'dayjs';
import { SNS } from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

const send = async (item: DocumentClient.AttributeMap): Promise<null> => {
  const sns: SNS = new SNS();
  const deletedAt: string = dayjs().format('DD-MM-YYYY, HH:mm:ss');

  const message: string = JSON.stringify({
    item,
    deletedAt,
    tableName: process.env.TABLE_NAME,
  });

  const params: SNS.PublishInput = {
    TopicArn: process.env.DELETE_SNS_ARN,
    Message: message,
  };

  try {
    await sns.publish(params).promise();
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default {
  send,
};
