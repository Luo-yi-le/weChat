const logger = {
  maxFiles: '3d',
  enableConsole: true,
  level: 'info',
  consoleLevel: 'info',
  enableFile: true,
  enableError: true,
  enableJSON: false,
  maxSize: '100m',
  format: info => {
    return `${info.timestamp} ${info.LEVEL} ${info.pid} ${info.labelText}${info.message}`;
  },
};
export default {
  default: {
    maxFiles: '3d',
    maxSize: '100m',
    level: 'warn',
    consoleLevel: 'info',
  },
  clients: {
    wechatLogger: Object.assign({}, logger, {
      fileLogName: 'wechatLogger.log',
    }),
    baseLogger: Object.assign({}, logger, { fileLogName: 'baseLogger.log' }),
    taskLogger: Object.assign({}, logger, { fileLogName: 'taskLogger.log' }),
  },
};
