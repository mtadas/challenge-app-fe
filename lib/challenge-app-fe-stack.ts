import * as cdk from '@aws-cdk/core';
import ec2 = require('@aws-cdk/aws-ec2');
import * as ecsPatterns from '@aws-cdk/aws-ecs-patterns';
import * as ecs from '@aws-cdk/aws-ecs';
import sm = require('@aws-cdk/aws-secretsmanager');

interface environment extends cdk.StackProps {
  vpcid: string,
  rdsSecretArn: string
}
export class ChallengeAppFeStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: environment) {
    super(scope, id, props);

    // vpc lookup
    const vpc = ec2.Vpc.fromLookup(this, 'VPC', {
      vpcId: props?.vpcid
    });

    //Get secret values from sm
    const dbSecret = sm.Secret.fromSecretAttributes(this, 'ImportedSecret', {
      secretArn: props?.rdsSecretArn!
    });

    const loadBalancedFargateService = new ecsPatterns.ApplicationLoadBalancedFargateService(this, 'Service', {
      vpc:vpc,
      memoryLimitMiB: 1024,
      cpu: 512,
      desiredCount: 2,
      taskImageOptions: {
        image: ecs.ContainerImage.fromRegistry("servian/techchallengeapp"),
        containerPort: 3000,
        secrets: {
          VTT_DbPassword: ecs.Secret.fromSecretsManager(dbSecret, 'password'),
          VTT_DbHost: ecs.Secret.fromSecretsManager(dbSecret, 'host'),
          VTT_DbPort: ecs.Secret.fromSecretsManager(dbSecret, 'port'),
        }
      },
    });
    
    loadBalancedFargateService.targetGroup.configureHealthCheck({
      path: "/healthcheck",
    });
  }
}
