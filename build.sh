#!/bin/sh

VERSION=$(node -p "require('./package.json').version")

echo "Building campus.idiomascombasi.com.br"
docker build -t gcr.io/campusicb/idiomascombasi_app:$VERSION .
docker tag gcr.io/campusicb/idiomascombasi_app:$VERSION gcr.io/campusicb/idiomascombasi_app:latest
