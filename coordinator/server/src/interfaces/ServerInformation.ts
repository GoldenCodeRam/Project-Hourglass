const BASE_SERVER_PORT = 4000,
      MAX_SERVER_INSTANCES = 50

const SERVER_BASE_NAME = "hourglass-server-"

export interface ServerInformation {
  serverName: string,
  clientPort: number,
  serverPort: number,
  serverResponseCode: number,
}

export {
  BASE_SERVER_PORT,
  MAX_SERVER_INSTANCES,
  SERVER_BASE_NAME,
}