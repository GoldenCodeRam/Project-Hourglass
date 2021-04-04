import { createLogger, format, transports } from 'winston';
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `[${timestamp} : ${label}]  ${level}: ${message}`;
});

const logger = createLogger({
  format: combine(
    format.colorize(),
    label({ label: "Main Server 🤖" }),
    timestamp({
      format: "hh:mm:ss A"
    }),
    myFormat,
  ),
  transports: [new transports.Console()],
});

const serverManagerLogger = createLogger({
  format: combine(
    format.colorize(),
    label({ label: "Server Manager 🔧" }),
    timestamp({
      format: "hh:mm:ss A"
    }),
    myFormat,
  ),
  transports: [new transports.Console()],
});

const clockLogger = createLogger({
  format: combine(
    format.colorize(),
    label({ label: "Clock ⏱" }),
    timestamp({
      format: "hh:mm:ss A"
    }),
    myFormat,
  ),
  transports: [new transports.Console()],
});

export {
  logger,
  serverManagerLogger,
  clockLogger,
}