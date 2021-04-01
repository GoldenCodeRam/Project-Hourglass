import util from "util";
import createLogger from "logging";
import exec from "child_process";

import { ServerInformation } from "./interfaces/ServerInformation";

const logger = createLogger("Server Manager 🔧");
const execPromise = util.promisify(exec.exec);

export default class ServerManager {
  constructor() {
    this.getRunningServers();
  }

  public async getRunningServers(): Promise<Array<ServerInformation>> {
    logger.info("Getting running servers from Docker.");
    console.group();
    const runningServers = new Array<ServerInformation>();
    const { stdout, stderr } = await execPromise("bash ./src/scripts/getRunningServers.sh");
    logger.info(stdout, stderr);
    console.groupEnd();
    return runningServers;
  }
}