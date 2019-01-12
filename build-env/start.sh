#!/usr/bin/env bash
#This script will start the development environment for you.
set -e

docker run \
  -it --rm \
  -p 4000:4000 \
  -p 3000:3000 \
  --name ffly-poem-dev-env  \
  --mount type=bind,source="$(pwd)/../",target=/ffly-poem \
  --mount type=bind,source="$(pwd)/../.aws",target=/root/.aws \
  ffly-poem-dev-env
