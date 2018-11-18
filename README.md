# Firefly Poem
A poem view web app.
诗词 web app。

## Goal
* Explore product focused developing process. 
* Explore new techologies, like aws, graphQL, lambda, nosql, docker. 
* Cost friendly, ideally, free.

## Techologies
* **AWS Infra**: The infra layer. Heavely depends on aws infra, so that we can focus on building product.
* **Lambda**: Cheap web backend solution.
* **GraphQL**: An api layer that suppose to make product development easier.
* **Docker**: Used for development environment setup, replace VM.

## 目标
* 探索一个以产品为中心的开发流程。
* 探索新技术在产品开发中的可行性，比如 aws, graphQL, lambda, nosql, docker。
* 越便宜越好，最好免费。

## 技术：
* **AWS Infra**: infra 层。尽可能的使用AWS的infra，这样可以更多的聚焦在产品的研发。
* **Lambda**: 极其廉价的价格。
* **GraphQL**: 又一个可以让产品开发更方便的api层。
* **Docker**: 用Docker来搭配开发环境，抛弃VM。

# Setup
preprequirements: 
* Docker installed: https://www.docker.com/products/docker-engine
* AWS IAM User: https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/signup-create-iam-user.html
  * ffly-poem/.aws will get mapped to ~/.aws in container, so all config goes there.
  * Required permissions: dynamo admin.

## Setup Development Environment
build Docker image:
```bash
cd docker
docker build -t ffly-poem-dev-env .
```
start:
```bash
./start_dev_env.sh
```
now you should in a ubuntu container with all dependency setup correctly for you.
