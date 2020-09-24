import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as s3Deployment from '@aws-cdk/aws-s3-deployment';
import * as cloudfront from '@aws-cdk/aws-cloudfront';
import * as origins from '@aws-cdk/aws-cloudfront-origins';


export class TaskerCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const appBucket = new s3.Bucket(this, "TaskerFrontEndAppBucket", {
      publicReadAccess: true,
      websiteIndexDocument: 'index.html'
    });

    //Deploy s3 Bucket
    new s3Deployment.BucketDeployment(this, 'DeployTaskerFrontEnd', {
      sources: [s3Deployment.Source.asset('../tasker-front-end/dist/tasker-front-end')],
      destinationBucket: appBucket,
    });


    // Creates a distribution for a S3 bucket.
    new cloudfront.Distribution(this, 'taskerFrontEndDist', {
      defaultBehavior: { 
        origin: new origins.S3Origin(appBucket) 
      },
    });


  }
}
