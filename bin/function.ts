#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { FunctionStack } from '../lib/function-stack';

const app = new cdk.App();
new FunctionStack(app, 'AWSLambdaCodeDeploySample');
