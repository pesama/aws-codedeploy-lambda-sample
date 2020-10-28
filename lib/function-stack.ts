import { AuthorizationType, LambdaIntegration, RestApi } from '@aws-cdk/aws-apigateway';
import { LambdaDeploymentConfig, LambdaDeploymentGroup } from '@aws-cdk/aws-codedeploy';
import { Alias, AssetCode, Function, Runtime } from '@aws-cdk/aws-lambda';
import { CfnOutput, Construct, Stack, StackProps } from '@aws-cdk/core';

export class FunctionStack extends Stack {

  /**
   * Defines the Lambda function
   * Changes in the code will trigger the deployment of this function
   */
  public readonly function: Function;

  /**
   * Alias for the function
   * Our consumers will always use this alias of the function
   */
  public readonly alias: Alias;

  /**
   * Deployment group
   * Manages the deployment of the function alias
   */
  public readonly deploymentGroup: LambdaDeploymentGroup;

  /**
   * Rest API.
   * This API uses the function as a backend, with the `prod` alias
   */
  public readonly api: RestApi;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Initialise function
    this.function = new Function(this, 'SampleFunction', {
      code: new AssetCode(`${__dirname}/../assets/functions/hello-world`),
      handler: 'index.handler',
      runtime: Runtime.NODEJS_12_X,
      logRetention: 1
    });

    // Initialise alias
    this.alias = new Alias(this, 'SampleAlias', {
      aliasName: 'prod',
      version: this.function.currentVersion,
    });

    // Initialise deployment
    this.deploymentGroup = new LambdaDeploymentGroup(this, 'SampleDeploymentGroup', {
      alias: this.alias,
      deploymentConfig: LambdaDeploymentConfig.LINEAR_10PERCENT_EVERY_1MINUTE
    });

    // Initialise API
    this.api = new RestApi(this, 'SampleApi');
    this.api.root.addMethod('GET', new LambdaIntegration(this.alias, {
      allowTestInvoke: true
    }), {
      authorizationType: AuthorizationType.NONE,
    });

    // Export API Url
    new CfnOutput(this, 'ApiEndpoint', { value: this.api.url });
  }
}
