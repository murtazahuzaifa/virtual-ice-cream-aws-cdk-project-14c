import * as cdk from '@aws-cdk/core';
require('dotenv').config();
import lambda = require('@aws-cdk/aws-lambda');
import { CfnApiKey, MappingTemplate, PrimaryKey, Values, GraphqlApi, Schema, FieldLogLevel } from '@aws-cdk/aws-appsync';
import { AttributeType, Table } from '@aws-cdk/aws-dynamodb';
import * as cloudfront from '@aws-cdk/aws-cloudfront';
import * as origins from '@aws-cdk/aws-cloudfront-origins';
import * as s3 from '@aws-cdk/aws-s3';
import * as s3deploy from '@aws-cdk/aws-s3-deployment';
import { join } from 'path';

export class AwsCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    ////////////////  deploy webstie  //////////////////////////////////
    // create a s3 bucket 
    const websiteBucket = new s3.Bucket(this, 'WebsiteBucket', {
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: '404.html',
      publicReadAccess: true
    })
    // create a cloudfront distribution 
    const distribution = new cloudfront.Distribution(this, 'myDist', {
      defaultBehavior: { origin: new origins.S3Origin(websiteBucket), }
    });
    // log domain name
    new cdk.CfnOutput(this, "DistributionDomainName", {
      value: `https://${distribution.domainName}`
    })
    // create s3 deployment bucket
    const websiteDeployment = new s3deploy.BucketDeployment(this, 'DeployWebsite', {
      sources: [s3deploy.Source.asset(join('__dirname', '/../../', 'packages/www/public'))],
      destinationBucket: websiteBucket,
      distribution: distribution
    })

    //////////////////////// deploying graphql backend ////////////////////////////////

    // Create a new AppSync GraphQL API
    const api = new GraphqlApi(this, 'Api', {
      name: `virtauliceapi`,
      logConfig: {
        fieldLogLevel: FieldLogLevel.ALL,
      },
      schema: new Schema({ filePath: join('__dirname', '/../', 'schema/schema.graphql') }),
    });
    // create graphql api key
    const apiKey = new CfnApiKey(this, 'the-virtual-ice-cream-graphql-service-api-key', {
      apiId: api.apiId
    });

    // Create new DynamoDB Table for ice-creams
    const iceCreamsTable = new Table(this, 'IceCreamsTable', {
      partitionKey: {
        name: 'id',
        type: AttributeType.STRING,
      },
    });

    // Add iceCreams DynamoDB as a Datasource for the Graphql API.
    const iceCreamsDS = api.addDynamoDbDataSource('IceCreams', iceCreamsTable);

    // Query Resolver to get all iceCreams
    iceCreamsDS.createResolver({
      typeName: 'Query',
      fieldName: 'allIceCreams',
      requestMappingTemplate: MappingTemplate.dynamoDbScanTable(),
      responseMappingTemplate: MappingTemplate.dynamoDbResultList(),
    });

    // Query Resolver to get a single iceCream
    iceCreamsDS.createResolver({
      typeName: 'Query',
      fieldName: 'getIceCream',
      requestMappingTemplate: MappingTemplate.dynamoDbGetItem('id', 'id'),
      responseMappingTemplate: MappingTemplate.dynamoDbResultItem(),
    });

    // Mutation Resolver for adding a new iceCreams
    iceCreamsDS.createResolver({
      typeName: 'Mutation',
      fieldName: 'addIceCream',
      requestMappingTemplate: MappingTemplate.dynamoDbPutItem(
        PrimaryKey.partition('id').auto(),
        Values.projecting('iceCream')),
      responseMappingTemplate: MappingTemplate.dynamoDbResultItem(),
    });

    // defines an AWS Lambda resource
    const dispatchLambda = new lambda.Function(this, 'GithubDispatchHandler', {
      runtime: lambda.Runtime.NODEJS_12_X,      // execution environment
      code: lambda.Code.fromAsset('lambda'),  // code loaded from the "lambda" directory
      handler: 'dispatch.handler',             // file is "dispatch", function is "handler"
      environment: {
        GITHUB_DISPATCH_API: "https://api.github.com/repos/murtazahuzaifa/virtual-ice-cream-aws-cdk-project-13c/dispatches",
        GITHUB_DISPATCH_WORKFLOW_TOKEN: process.env.GITHUB_DISPATCH_WORKFLOW_TOKEN as string,
      }
    });

    //  Add Lambda as a Datasource for the Graphql API.
    const dispatchLambdaDS = api.addLambdaDataSource('DispatchEvent', dispatchLambda);

    // Mutation Resolver to add new ice cream page
    dispatchLambdaDS.createResolver({
      typeName: 'Query',
      fieldName: 'addIceCreamPage',
      requestMappingTemplate: MappingTemplate.lambdaRequest(),
      responseMappingTemplate: MappingTemplate.lambdaResult(),
    });

    // Log GraphQL API Endpoint
    new cdk.CfnOutput(this, 'Endpoint', {
      value: api.graphqlUrl
    });

    // Log API Key
    new cdk.CfnOutput(this, 'API_Key', {
      value: apiKey.attrApiKey
    });



  }
}
