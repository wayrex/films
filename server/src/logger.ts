import winston from 'winston';

const logFileFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.json(),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level} : ${info.message}`
  )
);
const logger = winston.createLogger({
  level: 'info',
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format: logFileFormat
    }),
    new winston.transports.File({
      filename: 'logs/combined.log',
      format: logFileFormat
    }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    })
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
// if (process.env.NODE_ENV !== 'production') {
//   logger.add(new winston.transports.Console({
//     format: winston.format.combine(
//       winston.format.colorize(),
//       winston.format.simple()
//     )
//   }));
// }

export default logger;