import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as ChallengeAppDb from '../lib/challenge-app-fe-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new ChallengeAppDb.ChallengeAppFeStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
