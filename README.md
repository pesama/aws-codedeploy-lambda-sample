# Sample CDK Lambda Deployment

**Disclaimer: This is a sample repository, with no production value whatsoever.**

This sample repository contains a bare implementation of a Lambda Function, deployed through CodeDeploy. It demonstrates how CodeDeploy automatically shifts traffic between versions upon deployments, bringing Blue/Green capabilities to Lambda functions. This repository's root is a CDK application, and Lambda sources may be found under `assets/functions`.

## Deploying this sample

By deploying the stack for the first time, all resources will be made available in your account. An alias `prod` is created for the Lambda function, that initially will be assigned to the first function's version directly. A Lambda deployment group will be created along with the Function and Alias, although no deployment will be triggered.

Once the stack finishes deploying, the API should start responding to GET requests to the configured `body` output of the Lambda function. You can run the script `scripts/monitor.sh` to periodically poll the API and output results.

If a change is now performed to the function's code and the app is deployed, the Function will inherently create a new version to reflect the last Function's state. However, instead of linking the `prod` alias to this last version directly, our CodeDeploy Deployment Group will automatically trigger a deployment, that will shift traffic of such alias progressively as described in our Group configuration. If you did any change in the output, the `monitor.sh` script will start showing those changes progressively as the deployment evolves.

## Local execution

A script has been prepared to enable local execution of the function. Simply run the script `scripts/local.sh` to locally execute your function.