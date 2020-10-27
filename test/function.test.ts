import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as Function from '../lib/function-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new Function.FunctionStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
