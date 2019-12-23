import { SNSEvent } from 'aws-lambda';

export const handler = async (event: SNSEvent): Promise<string> => {
  console.log(event.Records);
  return 'done';
};
