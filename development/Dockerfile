FROM ubuntu:latest

LABEL maintainer="Shawn Xu <xx9483@gmail.com>"

RUN apt-get update

# nodejs prerequirements.
 RUN apt-get install -y curl
 RUN apt-get install -y gnupg

# nodejs v14 to simulate lambda runtime v14 in AWS.
# nodejs need to be installed before python to avoid override.
 RUN curl -sL https://deb.nodesource.com/setup_14.x | bash - \
 && apt-get install -y nodejs

# python3
RUN apt-get install -y python3.9 \
&& ln -sf /usr/bin/python3.9 /usr/bin/python

# pip
RUN  apt-get install -y python3-pip

# peewee for sqllite.
RUN python -m pip install  --upgrade peewee

# AWS Python SDK.
RUN python -m pip install boto3

# Serverless.
RUN npm install -g serverless

RUN npm install -g typescript

# https://www.npmjs.com/package/apollo Command line tool for Apollo
RUN npm install -g apollo

# Expose port for local server. 
EXPOSE 4000

# Expose port for create-react-app.
EXPOSE 3000

CMD [ "/bin/bash" ]