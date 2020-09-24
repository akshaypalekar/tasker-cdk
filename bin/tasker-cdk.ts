#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { TaskerCdkStack } from '../lib/tasker-cdk-stack';

const app = new cdk.App();
new TaskerCdkStack(app, 'TaskerCdkStack', {
    env: {
        region:"us-east-1"
    }
});
