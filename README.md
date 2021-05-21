
  
# challenge-app-fe 
  
# README  
  
This repository uses AWS CDK to deploy a Fargate service running on an ECS cluster fronted by an application load balancer.
 * if you branch this repo, GitHub actions will build a new stack for your branch.  
  
# BUILD DETAILS  
  
## AWS ECS
  
Amazon Elastic Container Service (Amazon ECS) is a highly scalable, fast container management service that makes it easy to run, stop, and manage containers on a cluster. AWS Fargate is a serverless compute engine for containers that works with [Amazon Elastic Container Service (ECS)](https://aws.amazon.com/ecs/). 
Fargate removes the need to provision and manage servers, lets you specify and pay for resources per application, and improves security through application isolation by design.
 
  

## Access to the application
  
Endpoint: **CloudFormation Output**  
  
  
# Deployment  and Cofing
  
  
### Deploy the stack
  
Build requirements:
 * VPC network with subnets must be present before building the stack
 * RDS Database has to be provisioned before building the application
 * RDS Database must contain the database schema for the application
 * AWS secret and access key has to be defined in the GitHub secrets
 * Secret names have to match the ones defined  in the github action file **.github/workflows/dev.yml**
 * rdsSecretArn to be updated in the **./conf/config.conf file** 
 * vpcid to be updated in the **./conf/config.conf file** 

Branching off master will trigger a new build following the below naming  
**application-role-branch**  
Build definition can be found  
**.github/workflows/dev.yml**  

### Configuration  
  
Configuration can be found in the **conf/config.yaml** file. This config will apply tags to all taggable resources 
  
### Variables  
  
AWS credentials must be defined in the GitHub secrets and will be accessed via the GitHub actions file  
```  
  
aws-access-key-id: ${{ secrets.DEV_AWS_ACCESS_KEY_ID }}  
  
aws-secret-access-key: ${{ secrets.DEV_AWS_SECRET_ACCESS_KEY }}  
  
```  
  
The build variables can be declared in the **GitHub actions file** <img src="https://img.icons8.com/fluent/48/000000/github.png"/>  
  
  
```  
  
env:  
  
APPLICATION: challenge-app  
  
ROLE: fe  
  
REGION: ap-southeast-2  
  
```  
  
### Cleaning up  
  
Once you've finished using your stack, don't forget to clean up after yourself. The easiest way to delete the CloudFormation stack, just light the fuse!  
**Destroy branch build**![Bomb](https://img.icons8.com/emoji/48/000000/bomb-emoji.png)  

### AWS CDK commands  
  
* `npm run build` compile typescript to js  
  
* `npm run watch` watch for changes and compile  
  
* `npm run test` perform the jest unit tests  
  
* `cdk deploy` deploy this stack to your default AWS account/region  
  
* `cdk diff` compare deployed stack with current state  
  
* `cdk synth` emits the synthesized CloudFormation template
  
# Roadmap  
  
* Move fargate parameters to config.yaml
  
* Add route 53 CNAME creation per build/Branch name  
  
* Add logic to use branched RDS Database builds
  
* Add logic to destroy branch builds  

* Create CDK test cases 
  
  
### Contributing  
  
via Pull Requests.  
  
i.e. clone this repo & create a branch. 