import express from "express";
import http from "http";
import socketIo from "socket.io";

import { Coordinator } from "./ConnectionConstants";
import ServerManager from "./ServerManager";
import { logger } from "./utils/Logger";

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
  logger.info(`New user connected, from ${socket.handshake.headers.host}`);
  socket.emit("serverStatusList", serverManager.serverInformationList);

  socket.on("createServerInstance", () => {
    logger.info("Create new server instance order from client.");
    serverManager.createNewServerInstance().then(() => {
      logger.warn("New server instance created!");
      socket.emit("serverStatusList", serverManager.serverInformationList);
    });
  });

  socket.on("synchronizeServerClocks", () => {
    logger.info("Trying to synchronize all clocks.");
    serverManager.synchronizeServerClocks();
  });
});

httpServer.listen(Coordinator.port, () => {
  console.clear();
  logger.info(`Listening on port ${Coordinator.port}.`);
});

