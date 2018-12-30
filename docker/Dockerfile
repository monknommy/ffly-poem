FROM ubuntu:latest

LABEL maintainer="Shawn Xu <xx9483@gmail.com>"

RUN apt-get update

# python3
# -y option to auto accept prompt 
RUN apt-get install -y python3.7 \
&& ln -s /usr/bin/python3.7 /usr/bin/python

# pip
RUN  apt-get install -y python3-pip

# peewee for sqllite
RUN python -m pip install  --upgrade peewee

# AWS Python SDK
RUN python -m pip install boto3

#curl for later package installation.
RUN apt-get install -y curl

# nodejs 11.x
RUN curl -sL https://deb.nodesource.com/setup_11.x | bash - \
&& apt-get install -y nodejs

#serverless
RUN npm install -g serverless

CMD [ "/bin/bash" ]