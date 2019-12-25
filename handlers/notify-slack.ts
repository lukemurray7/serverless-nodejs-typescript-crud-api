import axios from 'axios';
import { SNSEvent } from 'aws-lambda';

import { Message } from '../interfaces';


/**
 * Sends a slack notification based on an SNS event. Returns 'success' or 'error'
 *
 * @param event SNS event object
 */

export const handler = async (event: SNSEvent): Promise<string> => {
  const slackEndpoint: string = process.env.SLACK_ENDPOINT || '';

  const message: Message = JSON.parse(event.Records[0].Sns.Message);

  try {
    if (!slackEndpoint) {
      throw new Error('could not find slack api endpoint');
    }

    await axios.post(slackEndpoint, {
      text: `item: ${JSON.stringify(message.item)}\ndeletedAt: ${message.deletedAt}\ntable: ${message.tableName}`,
    });

    return 'success';
  } catch (error) {
    // do something to notify system of the error
    console.error(error);
    return 'error';
  }
};
