"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var socket_io_1 = __importDefault(require("socket.io"));
var logging_1 = __importDefault(require("logging"));
var ConnectionConstants_1 = require("./ConnectionConstants");
var ServerManager_1 = __importDefault(require("./ServerManager"));
var logger = logging_1.default("Main Server 💻");
var app = express_1.default();
var httpServer = new http_1.default.Server(app);
var io = new socket_io_1.default.Server(httpServer, {
    cors: { origin: "*" },
});
var serverManager = new ServerManager_1.default();
app.get("/", function (request, response) {
    response.sendStatus(200);
});
io.on("connection", function (socket) {
    logger.info("New user connected, from", socket.handshake.headers.host);
    socket.emit("serverStatusList", serverManager.serverInformationList);
    socket.on("createServerInstance", function () {
        logger.info("Create new server instance order from client.");
        console.group();
        serverManager.createNewServerInstance().then(function (value) {
            logger.warn("New server instance created!");
            console.groupEnd();
        });
    });
});
httpServer.listen(ConnectionConstants_1.Coordinator.port, function () {
    console.clear();
    logger.info("Listening on port " + ConnectionConstants_1.Coordinator.port + ".");
});
