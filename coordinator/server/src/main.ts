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

const serverManager = new ServerManager();

app.get("/", (request, response) => {
  response.sendStatus(200);
});

io.on("connection", (socket) => {
  logger.info("New user connected, from", socket.handshake.headers.host);
  socket.emit("serverStatusList", serverManager.serverInformationList);

  socket.on("createServerInstance", () => {
    logger.info("Create new server instance order from client.");
    console.group();
    serverManager.createNewServerInstance().then((value) => {
      logger.warn("New server instance created!")
      console.groupEnd();
    });
  });
});

httpServer.listen(Coordinator.port, () => {
  console.clear();
  logger.info(`Listening on port ${Coordinator.port}.`);
});

