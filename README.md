# MySense tech test

## Set up

1. Clone the repo and run `yarn install` or `npm install`.

2. If you want the SNS topic to post to slack - firstly you will need to create an incoming webhook using the slack api.

To do so follow these instruction: https://slack.com/intl/en-gb/help/articles/115005265063-Incoming-WebHooks-for-Slack

3. Add an API Key to Systems Manager Parameter Store in the AWS console - whatever you call the secret name will be used in the env.yml in the next step.

4. Create a env.yml file in the root of the project, fill in the required environment variables, look at the sample-env.yml to see what is needed.

```
  TABLE_NAME: 'value'    # DynamoDB table name.
  SECRET_NAME: 'value'   # Name of the API key secret stored in Systems Manager Parameter Store.
  EMAIL_SUBSCRIBER_ADDRESS: 'value' # Email address needed to subscribe to the SNS delete topic.
  SLACK_ENDPOINT: 'value' # Endpoint to post slack notifications to.
```

5. To deploy the service run `yarn deploy`

6. Test endpoints using the API Gateway endpoints returned in the console after running the deploy command.

7. To run the tests run `yarn test`

## Endpoints

The API URL will be in the format `https://<API_GATEWAY_ID>.execute-api.eu-west-1.amazonaws.com/<STAGE>/<PATH>`
You can find the `API_GATEWAY_ID` in the console, the stage will be `dev` unless specified otherwise.

### Create

* http method: `POST`

* path: `/create`

* body: The body of the new item - eg:

```
  {
    "sensor": "kitchen"
    "number": 450
  }
```

### Read

#### List

* http method: `GET`

* path: `/list`

#### Fetch

* http method: `GET`

* path: `/list/{id}`

Id will be the id of the item to fetch.


### Update

* http method: `UPDATE`

* path: `/update`

* body: The body of the updated item - eg:

```
  {
    "id": "12345"
    "type": "gardenSensor"
    "time": "random time + 1"
  }
```

### Delete

* http method: `DELETE`

* path: `/delete/{id}`

Id will be the id of the item to delete.