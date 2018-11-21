#!/usr/bin/env bash
#This script will start the development environment for you.
set -e

BOT=$1


docker run \
  -it --rm \
  --name ffly-poem-dev-env  \
  --mount type=bind,source="$(pwd)",target=/ffly-poem \
  --mount type=bind,source="$(pwd)/.aws",target=/root/.aws \
  ffly-poem-dev-env
