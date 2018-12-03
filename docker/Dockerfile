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

# AWS setup
RUN python -m pip install boto3 #aws python sdk

CMD [ "/bin/bash" ]