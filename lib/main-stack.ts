import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as ecr from 'aws-cdk-lib/aws-ecr';

export class MainStack extends cdk.Stack {
  constructor(scope: Construct, id: string, namePrefix: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const ecr_repository = new ecr.Repository(this, namePrefix, {
      repositoryName: namePrefix,
      // imageTagMutability: ecr.TagMutability.IMMUTABLE,
      imageTagMutability: ecr.TagMutability.MUTABLE,
      imageScanOnPush: true,
    });

    ecr_repository.addToResourcePolicy(new iam.PolicyStatement({
      actions: [
        "ecr:BatchGetImage",
        "ecr:BatchCheckLayerAvailability",
        "ecr:CompleteLayerUpload",
        "ecr:GetDownloadUrlForLayer",
        "ecr:InitiateLayerUpload",
        "ecr:PutImage",
        "ecr:UploadLayerPart"
      ],
      // resources: ['*'], // not currently allowed!
      // principals: ['ARN HERE'],
      principals: [new iam.AnyPrincipal()],
    }));
  }
}
