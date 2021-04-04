import { io } from "socket.io-client";

const socket = io(`http://127.0.0.1:${process.env.VUE_APP_SERVER_PORT}`);

export default socket;