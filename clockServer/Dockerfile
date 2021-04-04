FROM node:15.13.0-alpine3.10

ENV VUE_APP_SERVER_PORT=8080

WORKDIR /clockServer

COPY ./client ./client
COPY ./server/out ./server
COPY ./server/package*.json ./server
COPY ./start.sh ./

WORKDIR /clockServer/client

RUN npm install
RUN npm install -g serve

WORKDIR /clockServer/server

RUN npm install

EXPOSE 8080
EXPOSE 8081

WORKDIR /clockServer

RUN chmod u+x ./start.sh

CMD sh start.sh