import express from "express";
import http from "http";
import socketIo from "socket.io";

import { Coordinator } from "./ConnectionConstants";

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
  console.log(`Listening on port ${Coordinator.port}`);
});