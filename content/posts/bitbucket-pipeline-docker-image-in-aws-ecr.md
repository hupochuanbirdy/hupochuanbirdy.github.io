---
title: "Bitbucket Pipeline for Docker Image Deployment to AWS ECR"
date: 2024-11-01T11:49:28Z
lastmod: 2024-11-01T11:49:28Z
subTitle: "Automating Docker Image Deployment to AWS ECR with Bitbucket Pipelines"
description: "This pipeline automates the build and deployment process of Docker images to AWS Elastic Container Registry (ECR) using Bitbucket Pipelines. By integrating with AWS, this setup streamlines continuous delivery, ensuring that Docker images are consistently built, tagged, and securely pushed to ECR, ready for deployment in a scalable environment."
draft: false
featured: true
type: posts
label: "orginal"
author: tothemoon
tags: ["Bitbucket"]
categories: ["Tutorial"]
cover:
    position: <left,right>
    image: "https://hupo-posts.s3.ap-northeast-2.amazonaws.com/2024-11-01/pipeline-ecr-flow.png"
    alt: "<alt text>"
    caption: "<text>"
---
##  Diagram

The diagram illustrates a Bitbucket pipeline setup for deploying Docker images to AWS Elastic Container Registry (ECR).

<div class="polaroid" >
   <a data-fancybox="gallery" data-src="https://hupo-posts.s3.ap-northeast-2.amazonaws.com/2024-11-01/pipeline-ecr-flow.png">
        <img src="https://hupo-posts.s3.ap-northeast-2.amazonaws.com/2024-11-01/pipeline-ecr-flow.png"/>
    </a>
</div>

1. Pipeline.yaml - Contains the Bitbucket pipeline configuration script, defining steps for building, testing, and deploying the Docker image.
2. Dockerfile - Specifies the instructions for building the Docker image.
3. Bitbucket - The repository where the source code and pipeline configuration reside.
4. Bitbucket Pipeline - Executes the pipeline steps as defined in Pipeline.yaml.
5. AWS ECR - The target registry where the Docker image is pushed and stored after deployment.

## Create a Repo in AWS ECR

1. Navigate to AWS ECR

<div class="polaroid" >
   <a data-fancybox="gallery" data-src="https://hupo-posts.s3.ap-northeast-2.amazonaws.com/2024-11-01/aws_ecr.png">
        <img src="https://hupo-posts.s3.ap-northeast-2.amazonaws.com/2024-11-01/aws_ecr.png"/>
    </a>
</div>


2. Create a repository

<div class="polaroid" >
   <a data-fancybox="gallery" data-src="https://hupo-posts.s3.ap-northeast-2.amazonaws.com/2024-11-01/aws_ecr_create_repo.png">
        <img src="https://hupo-posts.s3.ap-northeast-2.amazonaws.com/2024-11-01/aws_ecr_create_repo.png"/>
    </a>
</div>

3. Memorise the URI(need set permission for this repo)

<div class="polaroid" >
   <a data-fancybox="gallery" data-src="https://hupo-posts.s3.ap-northeast-2.amazonaws.com/2024-11-01/aws_ecr_repo_list.png">
        <img src="https://hupo-posts.s3.ap-northeast-2.amazonaws.com/2024-11-01/aws_ecr_repo_list.png"/>
    </a>
</div>




## Create a docker image which contains all the env your project needed

In my case, the environment I need includes Python 3.10.3, along with the packages boto3 (for AWS), os, json, and yaml.

## To Retrieve OpenID Connect (OIDC) information in Bitbucket

1. Navigate to Bitbucket [Repository Settings]
2. Click [OpenID Connect], Memorises Identity provider URL and Audience

<div class="polaroid" >
   <a data-fancybox="gallery" data-src="https://hupo-posts.s3.ap-northeast-2.amazonaws.com/2024-11-01/bitbucket-OIDC.png">
        <img src="https://hupo-posts.s3.ap-northeast-2.amazonaws.com/2024-11-01/bitbucket-OIDC.png"/>
    </a>
</div>


## Set up an IAM role and assign permissions to allow pulling and retrieving Docker images

### Create Identity Provider

1. Navigate to AWS IAM
2. Create Identity Provider, copy paste the Provider URL and Audience. Then [Add provider]


<div class="polaroid" >
   <a data-fancybox="gallery" data-src="https://hupo-posts.s3.ap-northeast-2.amazonaws.com/2024-11-01/aws_iam_identity_provider.png">
        <img src="https://hupo-posts.s3.ap-northeast-2.amazonaws.com/2024-11-01/aws_iam_identity_provider.png"/>
    </a>
</div>

### Create IMA Role

1. Navigate to AWS IAM
2. Click [Create Role]

<div class="polaroid" >
   <a data-fancybox="gallery" data-src="https://hupo-posts.s3.ap-northeast-2.amazonaws.com/2024-11-01/aws_iam_role.png">
        <img src="https://hupo-posts.s3.ap-northeast-2.amazonaws.com/2024-11-01/aws_iam_role.png"/>
    </a>
</div>


3. Assign permissions

<div class="polaroid" >
   <a data-fancybox="gallery" data-src="https://hupo-posts.s3.ap-northeast-2.amazonaws.com/2024-11-01/aws_iam_permission.png">
        <img src="https://hupo-posts.s3.ap-northeast-2.amazonaws.com/2024-11-01/aws_iam_permission.png"/>
    </a>
</div>

4. After finish the creation, Navigate to this role's detail page, Click [Add Permissions]

<div class="polaroid" >
   <a data-fancybox="gallery" data-src="https://hupo-posts.s3.ap-northeast-2.amazonaws.com/2024-11-01/aws_iam_bitbuckte_permission.png">
        <img src="https://hupo-posts.s3.ap-northeast-2.amazonaws.com/2024-11-01/aws_iam_bitbuckte_permission.png"/>
    </a>
</div>

Here is the yaml file looks like, Resource should be ECR URI

{{< highlight yaml "linenos=table" >}}

{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "GetAuthorizationToken",
            "Effect": "Allow",
            "Action": [
                "ecr:GetAuthorizationToken"
            ],
            "Resource": "*"
        },
        {
            "Sid": "ReadRepositoryContents",
            "Effect": "Allow",
            "Action": [
                "ecr:BatchCheckLayerAvailability",
                "ecr:GetDownloadUrlForLayer",
                "ecr:GetRepositoryPolicy",
                "ecr:DescribeRepositories",
                "ecr:ListImages",
                "ecr:DescribeImages",
                "ecr:BatchGetImage"
            ],
            "Resource": "arn:aws:ecr:us-east-1:URI"
        }
    ]
}
{{< /highlight >}}

## Write a pipeline to upload docker image to AWS ECR

1. Navigate to bitbucket
2. Click [Deployments], setup AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY which should download from IAM created before.


<div class="polaroid" >
   <a data-fancybox="gallery" data-src="https://hupo-posts.s3.ap-northeast-2.amazonaws.com/2024-11-01/bitbucket_dev_value.png">
        <img src="https://hupo-posts.s3.ap-northeast-2.amazonaws.com/2024-11-01/bitbucket_dev_value.png"/>
    </a>
</div>

and what the code of pipeline, very simple


{{< highlight yaml "linenos=table" >}}
options:
  docker: true

pipelines:
  default:
    - step:
        services:
          - docker
        caches:
          - docker
        name: Build and Push Docker Image to ECR
        script:
          # Push the Docker image to Amazon ECR
          - docker build -t $ECR_IMAGE_NAME:$BITBUCKET_COMMIT -f ./Dockerfile .
          - pipe: atlassian/aws-ecr-push-image:2.4.2
            variables:
              AWS_ACCESS_KEY_ID: "$AWS_ACCESS_KEY_ID" 
              AWS_SECRET_ACCESS_KEY: "$AWS_SECRET_ACCESS_KEY" 
              AWS_DEFAULT_REGION: "$AWS_REGION" 
              IMAGE_NAME: "$ECR_IMAGE_NAME"

{{< /highlight >}}




## Ref

https://support.atlassian.com/bitbucket-cloud/docs/use-aws-ecr-images-in-pipelines-with-openid-connect/