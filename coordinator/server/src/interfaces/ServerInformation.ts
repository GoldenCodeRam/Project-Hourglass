const BASE_SERVER_PORT = 4000,
      MAX_SERVER_INSTANCES = 50,
      CLIENT_SERVER_OFFSET = 1

export interface ServerInformation {
  serverName: string,
  clientPort: number,
  serverPort: number,
  serverResponseCode: number,
}

export {
  BASE_SERVER_PORT,
  MAX_SERVER_INSTANCES,
  CLIENT_SERVER_OFFSET,
}