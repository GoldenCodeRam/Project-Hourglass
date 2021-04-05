"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var socket_io_1 = __importDefault(require("socket.io"));
var ConnectionConstants_1 = require("./ConnectionConstants");
var Clock_1 = __importDefault(require("./utils/Clock"));
var Logger_1 = require("./utils/Logger");
var app = express_1.default();
app.use(express_1.default.json());
var httpServer = http_1.default.createServer(app);
var io = new socket_io_1.default.Server(httpServer, {
    cors: { origin: "*" },
});
var serverClock = new Clock_1.default();
app.get("/", function (_request, response) {
    response.sendStatus(200);
});
app.post("/offsetServerHour", function (request, response) {
    if (request.body.serverUnixDate) {
        response.send({ offsetUnixDate: serverClock.offsetDate(request.body.serverUnixDate) });
    }
    else {
        response.sendStatus(200);
    }
});
app.post("/setServerHourOffset", function (request, response) {
    if (request.body.timeDifference) {
        console.log("server hour then: ", serverClock.date);
        console.log(request.body.timeDifference);
        serverClock.date = new Date(serverClock.date.valueOf() - request.body.timeDifference);
        console.log("server hour now: ", serverClock.date);
        io.sockets.emit("serverHourChanged", request.body.timeDifference);
    }
    response.sendStatus(200);
});
io.on("connection", function (socket) {
    Logger_1.logger.info("New user connected 🎉");
    Logger_1.logger.warn("Send current server date to client.");
    socket.emit("newServerDate", serverClock.date);
    Logger_1.logger.warn("Starting to send the server date to the client every second.");
    serverClock.callback = function (date) {
        socket.emit("serverDate", date);
    };
    socket.on("changeServerHour", function (dateString) {
        Logger_1.logger.info("Client sended a new date for the server.");
        serverClock.date = new Date(dateString);
        console.log("New date for the server: ", serverClock.date);
    });
});
httpServer.listen(ConnectionConstants_1.Server.port, "0.0.0.0", function () {
    console.clear();
    Logger_1.logger.info("Listening on port " + ConnectionConstants_1.Server.port + ".");
});
