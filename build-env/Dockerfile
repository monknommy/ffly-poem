FROM ubuntu:latest

LABEL maintainer="Shawn Xu <xx9483@gmail.com>"

RUN apt-get update

# nodejs prerequirement.
 RUN apt-get install -y curl
 RUN apt-get install -y gnupg

# nodejs v8.15  to simulate lambda runtime v8.10 in aws
# nodejs need to be installed before python, 
# other wise it override python setup.
 RUN curl -sL https://deb.nodesource.com/setup_8.x | bash - \
 && apt-get install -y nodejs

# python3
# -y option to auto accept prompt 
RUN apt-get install -y python3.7 \
&& ln -sf /usr/bin/python3.7 /usr/bin/python

# pip
RUN  apt-get install -y python3-pip

# peewee for sqllite
RUN python -m pip install  --upgrade peewee

# AWS Python SDK
RUN python -m pip install boto3

# Serverless
RUN npm install -g serverless

# Expose port for local server. 
EXPOSE 4000

# Expose port for create-react-app
EXPOSE 3000

CMD [ "/bin/bash" ]