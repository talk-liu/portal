#FROM node:10-alpine
FROM docker.riostox.com:5000/frontend-builder:riostox

COPY . /home/app

RUN cd /home/app && npm install

WORKDIR /home/app

ARG GIT_COMMIT_HASH

ENV GIT_COMMIT_HASH $GIT_COMMIT_HASH

RUN echo $GIT_COMMIT_HASH
RUN echo ${GIT_COMMIT_HASH}

RUN echo "GIT_COMMIT_HASH=$GIT_COMMIT_HASH"

RUN echo "GIT_COMMIT_HASH=${GIT_COMMIT_HASH}"


CMD ['npm', 'start']
