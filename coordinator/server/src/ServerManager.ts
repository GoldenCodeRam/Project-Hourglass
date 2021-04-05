import util from "util";
import exec from "child_process";
import axios from "axios";

import { ServerInformation, BASE_SERVER_PORT, MAX_SERVER_INSTANCES, SERVER_BASE_NAME } from "./interfaces/ServerInformation";
import { serverManagerLogger as logger } from "./utils/Logger";
import Clock from "./utils/Clock";

const execPromise = util.promisify(exec.exec);

export default class ServerManager {
  public serverInformationList: Array<ServerInformation> = new Array<ServerInformation>();

  private _serverClock = new Clock();

  constructor() {
    this.getRunningServers().then((list) => {
      this.serverInformationList = list;
    });
  }

  public async createNewServerInstance(): Promise<void> {
    const availablePort = this.getAvailablePort();
    if (availablePort != -1) {
      logger.warn("Creating new server instance.");
      const { stdout } = await execPromise(
        `bash ./src/scripts/createServer.sh ${SERVER_BASE_NAME}${availablePort} ${availablePort}`
      );
      if (stdout) {
        this.serverInformationList = await this.getRunningServers();
        return;
      }
    }
  }

  public async synchronizeServerClocks(): Promise<void> {
    const serverOffsets: Array<number> = [];
    let totalTimeDifference = 0;
    let averageTimeDifference = 0;

    for (const information of this.serverInformationList) {
      const response = await axios.post(`http://localhost:${information.serverPort}/offsetServerHour/`, {
        serverUnixDate: this._serverClock.date.valueOf(),
      });
      if (response.data) {
        console.log("Current offset of the server: ", response.data);
        totalTimeDifference += response.data.offsetUnixDate;
        serverOffsets.push(response.data.offsetUnixDate);
      }
    }

    averageTimeDifference = totalTimeDifference / (this.serverInformationList.length + 1);
    console.log("Average time difference of the clocks: ", averageTimeDifference);

    for (const information of this.serverInformationList) {
      const timeDifference = averageTimeDifference - serverOffsets[this.serverInformationList.indexOf(information)];
      console.log("Time difference to add or remove to the clock server: ", timeDifference);
      await axios.post(`http://localhost:${information.serverPort}/setServerHourOffset/`, {
        timeDifference: timeDifference,
      });
    }
  }

  private async getRunningServers(): Promise<Array<ServerInformation>> {
    logger.info("Getting running servers from Docker.");
    console.group();
    const runningServers = new Array<ServerInformation>();
    const { stdout } = await execPromise("bash ./src/scripts/getRunningServers.sh");
    const runningServersInformation = JSON.parse(stdout);
    runningServersInformation.forEach((information: any) => {
      runningServers.push({
        serverName: information.serverName,
        clientPort: information.clientPort,
        serverPort: information.serverPort,
        serverResponseCode: 200,
      })
    });
    logger.warn(`Running servers: ${runningServers.length}`);
    console.groupEnd();
    return runningServers;
  }

  private getAvailablePort(): number {
    logger.info("Getting an available port for a new server.");
    console.group();

    const occupiedPorts: Array<number> = [];
    let pendientPort = -1;

    this.serverInformationList.forEach((information) => {
      occupiedPorts.push(information.serverPort);
    });
    // Increase i by 2 to take only the server ports, the client port is always the server port + 1
    for (let i = 0; i + BASE_SERVER_PORT < BASE_SERVER_PORT + MAX_SERVER_INSTANCES; i += 2) {
      pendientPort = i + BASE_SERVER_PORT;
      occupiedPorts.forEach((port) => {
        if (port === pendientPort) {
          pendientPort = -1;
        }
      });
      if (pendientPort != -1) {
        logger.warn(`Available port for server found: ${pendientPort}`);
        console.groupEnd();
        return pendientPort;
      }
    }
    logger.error("There's no available port for a new server!");
    console.groupEnd();
    return pendientPort;
  }
}
