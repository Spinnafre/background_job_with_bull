FROM node:latest as build

ARG env=production

ARG MAIL_PORT
ARG MAIL_HOST
ARG MAIL_USER
ARG MAIL_PASSWORD

WORKDIR /usr/src/app

COPY package*.json .

RUN npm ci --only=production



FROM node:18-alpine3.17 

USER node

ENV NODE_ENV production

LABEL AUTHOR="SPINNAFRE"

LABEL PROJECT_NAME="Background jobs with Bull.js and Node.js"

WORKDIR /usr/src/app 

COPY --from=build /usr/src/app/node_modules /usr/src/app/node_modules

COPY --chown=node:node . .

CMD [ "node","./build/src/server.js" ]