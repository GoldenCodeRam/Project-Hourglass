"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var socket_io_1 = __importDefault(require("socket.io"));
var ConnectionConstants_1 = require("./ConnectionConstants");
var ServerManager_1 = __importDefault(require("./ServerManager"));
var Logger_1 = require("./utils/Logger");
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
    Logger_1.logger.info("New user connected, from " + socket.handshake.headers.host);
    socket.emit("serverStatusList", serverManager.serverInformationList);
    socket.on("createServerInstance", function () {
        Logger_1.logger.info("Create new server instance order from client.");
        serverManager.createNewServerInstance().then(function () {
            Logger_1.logger.warn("New server instance created!");
            socket.emit("serverStatusList", serverManager.serverInformationList);
        });
    });
    socket.on("synchronizeServerClocks", function () {
        Logger_1.logger.info("Trying to synchronize all clocks.");
        serverManager.synchronizeServerClocks();
    });
});
httpServer.listen(ConnectionConstants_1.Coordinator.port, function () {
    console.clear();
    Logger_1.logger.info("Listening on port " + ConnectionConstants_1.Coordinator.port + ".");
});
