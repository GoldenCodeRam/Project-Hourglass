import express from "express";
import http from "http";
import socketIo from "socket.io";
import createLogger from "logging";

import { Coordinator } from "./ConnectionConstants";
import ServerManager from "./ServerManager";

const logger = createLogger("Main Server 💻");

const app = express();
const httpServer = new http.Server(app);
const io = new socketIo.Server(httpServer, {
  cors: { origin: "*" },
});

app.get("/", (request, response) => {
  response.sendStatus(200);
});

io.on("connection", (socket) => {
  console.log("New user connected!");
  socket.on("message", (message) => {
    console.log(message);
  });
});

httpServer.listen(Coordinator.port, () => {
  console.clear();
  logger.info(`Listening on port ${Coordinator.port}.`);
  const serverManager = new ServerManager();
});

