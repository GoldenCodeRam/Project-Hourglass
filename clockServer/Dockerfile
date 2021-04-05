FROM node:15.13.0-alpine3.10

ENV VUE_APP_SERVER_PORT=8080

WORKDIR /clockServer/client

COPY ./client/package*.json ./

RUN npm install
RUN npm install -g serve

WORKDIR /clockServer/server

COPY ./server/package*.json ./

RUN npm install

WORKDIR /clockServer/client

COPY ./client ./

WORKDIR /clockServer/server

COPY ./server/out ./

WORKDIR /clockServer

EXPOSE 8080
EXPOSE 8081

COPY ./start.sh ./

RUN chmod u+x ./start.sh

CMD sh start.sh
