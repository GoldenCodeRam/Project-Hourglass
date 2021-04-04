import { createLogger, format, transports } from 'winston';
const { combine, timestamp, label, printf } = format;
 
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `[${timestamp} : ${label}]\t${level}: ${message}`;
});
 
const logger = createLogger({
  format: combine(
    format.colorize(),
    label({ label: "mainServer 🤖" }),
    timestamp({
      format: "hh:mm:ss A"
    }),
    myFormat,
  ),
  transports: [new transports.Console()],
});

export {
  logger,
}