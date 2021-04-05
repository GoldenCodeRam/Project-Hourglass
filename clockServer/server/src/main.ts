import express from "express";
import http from "http";
import socketIo from "socket.io"

import { Server } from "./ConnectionConstants";
import Clock from "./utils/Clock";
import { logger } from "./utils/Logger";

const app = express();
app.use(express.json());

const httpServer = http.createServer(app);
const io = new socketIo.Server(httpServer, {
  cors: { origin: "*" },
});

const serverClock: Clock = new Clock();

app.get("/", (_request, response) => {
  response.sendStatus(200);
});

app.post("/offsetServerHour", (request, response) => {
  if (request.body.serverUnixDate) {
    response.send({ offsetUnixDate: serverClock.offsetDate(request.body.serverUnixDate)});
  } else {
    response.sendStatus(200);
  }
});

app.post("/setServerHourOffset", (request, response) => {
  if (request.body.timeDifference) {
    console.log("server hour then: ", serverClock.date);
    console.log(request.body.timeDifference);
    serverClock.date = new Date(serverClock.date.valueOf() - request.body.timeDifference);
    console.log("server hour now: ", serverClock.date);
    io.sockets.emit("serverHourChanged", request.body.timeDifference);
  }
  response.sendStatus(200);
});

io.on("connection", (socket) => {
  logger.info("New user connected 🎉");
  logger.warn("Send current server date to client.")
  socket.emit("newServerDate", serverClock.date);

  logger.warn("Starting to send the server date to the client every second.")
  serverClock.callback = (date: Date) => {
    socket.emit("serverDate", date);
  }

  socket.on("changeServerHour", (dateString: string) => {
    logger.info("Client sended a new date for the server.");
    serverClock.date = new Date(dateString);
    console.log("New date for the server: ", serverClock.date);
  });
});

httpServer.listen(Server.port, "0.0.0.0", () => {
  console.clear();
  logger.info(`Listening on port ${Server.port}.`);
});
