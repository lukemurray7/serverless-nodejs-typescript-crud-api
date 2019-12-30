# MySense tech test

## Set up

You will need to have node installed, and the serverless framework to deploy this service.

1. Clone the repo and run `yarn install` or `npm install`.

2. Create a env.yml file in the root of the project, fill in the required environment variables, look at the sample-env.yml to see what is needed.

```
  TABLE_NAME: 'sensor-data-table'    # DynamoDB table name
  SECRET_NAME: 'my-api-key'   # Name of the API key secret stored in Systems Manager Parameter Store
  EMAIL_SUBSCRIBER_ADDRESS: 'example@test.com' # Email address needed to subscribe to the SNS delete topic
  SLACK_ENDPOINT: 'slack-endpoint' # Endpoint to post slack notifications to
```


3. If you want the SNS topic to post to slack - firstly you will need to create an incoming webhook using the slack api.

  To do so follow these instruction: https://slack.com/intl/en-gb/help/articles/115005265063-Incoming-WebHooks-for-Slack

4. Add an API Key (a uuid for example) to Systems Manager Parameter Store in the AWS console - use the same name as defined in the env.yml file.


5. To deploy the service run `yarn deploy`


6. To add some mock data to the dynamo table - run `yarn seed` or you can just add an item using the create endpoint. The default table name for seeding will be process.env.TABLE_NAME or "sensor-data-table". You will need to have programmatic access to AWS configured for this to work.


6. Test endpoints using the API Gateway endpoints returned in the console after running the deploy command.


7. To run the tests run `yarn test`

## Endpoints

The API URL will be in the format `https://<API_GATEWAY_ID>.execute-api.eu-west-1.amazonaws.com/<STAGE>/<PATH>`
You can find the `API_GATEWAY_ID` in the console, the stage will be `dev` unless specified otherwise.

All the endpoints will need an Authorization header which will be the api key you stored in Systems Manager Parameter store in step 4 above.


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
    "sensor": "kitchen"
    "number": 668
  }
```

### Delete

* http method: `DELETE`

* path: `/delete/{id}`

Id will be the id of the item to delete.