import { Injectable } from '@nestjs/common';
import { createLogger, transports, format } from 'winston';

@Injectable()
export class WinstonLogger {
  private readonly logger = createLogger({
    transports: [
      new transports.Console({
        format: format.combine(
          format.timestamp(),
          format.colorize(),
          format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
        ),
      }),
      new transports.File({ filename: 'error.log', level: 'error' }),
      new transports.File({ filename: 'combined.log' }),
    ],
  });

  error(message: string, trace: string) {
    this.logger.error(message, trace);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  info(message: string) {
    this.logger.info(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }
}