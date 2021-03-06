"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = __importDefault(require("util"));
var child_process_1 = __importDefault(require("child_process"));
var axios_1 = __importDefault(require("axios"));
var ServerInformation_1 = require("./interfaces/ServerInformation");
var Logger_1 = require("./utils/Logger");
var Clock_1 = __importDefault(require("./utils/Clock"));
var execPromise = util_1.default.promisify(child_process_1.default.exec);
var ServerManager = /** @class */ (function () {
    function ServerManager() {
        var _this = this;
        this.serverInformationList = new Array();
        this._serverClock = new Clock_1.default();
        this.getRunningServers().then(function (list) {
            _this.serverInformationList = list;
        });
    }
    ServerManager.prototype.createNewServerInstance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var availablePort, stdout, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        availablePort = this.getAvailablePort();
                        if (!(availablePort != -1)) return [3 /*break*/, 3];
                        Logger_1.serverManagerLogger.warn("Creating new server instance.");
                        return [4 /*yield*/, execPromise("bash ./src/scripts/createServer.sh " + ServerInformation_1.SERVER_BASE_NAME + availablePort + " " + availablePort)];
                    case 1:
                        stdout = (_b.sent()).stdout;
                        if (!stdout) return [3 /*break*/, 3];
                        _a = this;
                        return [4 /*yield*/, this.getRunningServers()];
                    case 2:
                        _a.serverInformationList = _b.sent();
                        return [2 /*return*/];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ServerManager.prototype.synchronizeServerClocks = function () {
        return __awaiter(this, void 0, void 0, function () {
            var serverOffsets, totalTimeDifference, averageTimeDifference, _i, _a, information, response, _b, _c, information, timeDifference;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        serverOffsets = [];
                        totalTimeDifference = 0;
                        averageTimeDifference = 0;
                        _i = 0, _a = this.serverInformationList;
                        _d.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        information = _a[_i];
                        return [4 /*yield*/, axios_1.default.post("http://localhost:" + information.serverPort + "/offsetServerHour/", {
                                serverUnixDate: this._serverClock.date.valueOf(),
                            })];
                    case 2:
                        response = _d.sent();
                        if (response.data) {
                            console.log("Current offset of the server: ", response.data);
                            totalTimeDifference += response.data.offsetUnixDate;
                            serverOffsets.push(response.data.offsetUnixDate);
                        }
                        _d.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        averageTimeDifference = totalTimeDifference / (this.serverInformationList.length + 1);
                        console.log("Average time difference of the clocks: ", averageTimeDifference);
                        _b = 0, _c = this.serverInformationList;
                        _d.label = 5;
                    case 5:
                        if (!(_b < _c.length)) return [3 /*break*/, 8];
                        information = _c[_b];
                        timeDifference = averageTimeDifference - serverOffsets[this.serverInformationList.indexOf(information)];
                        console.log("Time difference to add or remove to the clock server: ", timeDifference);
                        return [4 /*yield*/, axios_1.default.post("http://localhost:" + information.serverPort + "/setServerHourOffset/", {
                                timeDifference: timeDifference,
                            })];
                    case 6:
                        _d.sent();
                        _d.label = 7;
                    case 7:
                        _b++;
                        return [3 /*break*/, 5];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    ServerManager.prototype.getRunningServers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var runningServers, stdout, runningServersInformation;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Logger_1.serverManagerLogger.info("Getting running servers from Docker.");
                        console.group();
                        runningServers = new Array();
                        return [4 /*yield*/, execPromise("bash ./src/scripts/getRunningServers.sh")];
                    case 1:
                        stdout = (_a.sent()).stdout;
                        runningServersInformation = JSON.parse(stdout);
                        runningServersInformation.forEach(function (information) {
                            runningServers.push({
                                serverName: information.serverName,
                                clientPort: information.clientPort,
                                serverPort: information.serverPort,
                                serverResponseCode: 200,
                            });
                        });
                        Logger_1.serverManagerLogger.warn("Running servers: " + runningServers.length);
                        console.groupEnd();
                        return [2 /*return*/, runningServers];
                }
            });
        });
    };
    ServerManager.prototype.getAvailablePort = function () {
        Logger_1.serverManagerLogger.info("Getting an available port for a new server.");
        console.group();
        var occupiedPorts = [];
        var pendientPort = -1;
        this.serverInformationList.forEach(function (information) {
            occupiedPorts.push(information.serverPort);
        });
        // Increase i by 2 to take only the server ports, the client port is always the server port + 1
        for (var i = 0; i + ServerInformation_1.BASE_SERVER_PORT < ServerInformation_1.BASE_SERVER_PORT + ServerInformation_1.MAX_SERVER_INSTANCES; i += 2) {
            pendientPort = i + ServerInformation_1.BASE_SERVER_PORT;
            occupiedPorts.forEach(function (port) {
                if (port === pendientPort) {
                    pendientPort = -1;
                }
            });
            if (pendientPort != -1) {
                Logger_1.serverManagerLogger.warn("Available port for server found: " + pendientPort);
                console.groupEnd();
                return pendientPort;
            }
        }
        Logger_1.serverManagerLogger.error("There's no available port for a new server!");
        console.groupEnd();
        return pendientPort;
    };
    return ServerManager;
}());
exports.default = ServerManager;
