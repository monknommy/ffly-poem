FROM ubuntu:latest

LABEL maintainer="Xuan Xu <xx9483@gmail.com>"

#python3
RUN apt-get update \
  && apt-get install -y python3-pip python3-dev \
  && cd /usr/local/bin \
  && ln -s /usr/bin/python3 python \
  && pip3 install --upgrade pip

# AWS setup
RUN pip install boto3 #aws python sdk
mkdir /.aws #will get mounted on docker run

CMD [ "/bin/bash" ]