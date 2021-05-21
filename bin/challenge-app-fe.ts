#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { ChallengeAppFeStack } from '../lib/challenge-app-fe-stack';
import fs = require('fs');
import yaml = require('js-yaml');

const app = new cdk.App();

const env = {
    account: app.node.tryGetContext('account'),
    region: app.node.tryGetContext('region'),
    branch: app.node.tryGetContext('branch'),
    application: app.node.tryGetContext('application'),
    role: app.node.tryGetContext('role')
};

//Define the stack name
var stack = `${env.application}-${env.role}-${env.branch}`

//Select variables based on the branch
var deployPattern = ''
if (env.branch === 'master'){
    deployPattern = 'prod'
}else {
    deployPattern = 'nonprod'
}

//Read config file
try {
    var fileContents = fs.readFileSync('./conf/config.yaml', 'utf8');
    var data: any = {}
    data = yaml.load(fileContents);
    var config = data.Pattern[deployPattern]
  } catch (err) {
    console.log(err);
  }

var vpcid = config.vpcid
var rdsSecretArn = config.rdsSecretArn

const appStack = new ChallengeAppFeStack(app, stack, {
    env: env,
    description: 'Creates ECS Cluster, Fargate Service with a Load Balancer',
    vpcid: vpcid,
    rdsSecretArn: rdsSecretArn
});

// Add dynamic tags
cdk.Tags.of(appStack).add('Name', stack)
cdk.Tags.of(appStack).add('Application', env.application)
cdk.Tags.of(appStack).add('Role', env.role)
cdk.Tags.of(appStack).add('Branch', env.branch)

// Add Tags defined in config.conf
data.Tags.forEach((element) => {
    cdk.Tags.of(appStack).add( 
    element.name, 
    element.value
    );
});


