import util from "util";
import createLogger from "logging";
import exec from "child_process";

import { ServerInformation, BASE_SERVER_PORT, MAX_SERVER_INSTANCES, SERVER_BASE_NAME } from "./interfaces/ServerInformation";

const logger = createLogger("Server Manager 🔧");
const execPromise = util.promisify(exec.exec);

export default class ServerManager {
  public serverInformationList: Array<ServerInformation> = new Array<ServerInformation>();

  constructor() {
    this.getRunningServers().then((list) => {
      this.serverInformationList = list;
    });
  }

  public async createNewServerInstance(): Promise<void> {
    const availablePort = this.getAvailablePort();
    if (availablePort != -1) {
      logger.warn("Creating new server instance.");
      const { stdout, stderr } = await execPromise(
        `bash ./src/scripts/createServer.sh ${SERVER_BASE_NAME}${availablePort} ${availablePort}`
      );
      if (stdout) {
        this.serverInformationList = await this.getRunningServers();
        return;
      }
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
    logger.warn("Running servers:", runningServers);
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
        logger.warn("Available port for server found: ", pendientPort);
        console.groupEnd();
        return pendientPort;
      }
    }
    logger.error("There's no available port for a new server!");
    console.groupEnd();
    return pendientPort;
  }
}