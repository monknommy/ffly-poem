# Development
Development related tools live in here. 

## Docker
Instead of installing developement dependencies in your local machine or a sandbox, Docker containers that has all development tool preinstalled is used.

Build the image:
```
docker build -t ffly-poem-development .
```

Run container:
```
./start.sh
```

Once inside the container, you should able to see a linux shell with everything installed. For example, nodejs 8, python 3, serverless, typescript, react... Check Dockerfile for details.