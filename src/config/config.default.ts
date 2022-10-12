import { CoolConfig } from '@cool-midway/core';
import { MODETYPE } from '@cool-midway/file';
import { MidwayConfig } from '@midwayjs/core';
import * as redisStore from 'cache-manager-ioredis';
import * as fsStore from 'cache-manager-fs-hash';
import { BaseEntitySubscriber } from './../global/subscriber/baseEntitySubscriber';

const redis = {
  port: 6379, // Redis port
  host: '175.27.158.145', // Redis host
  password: '153759.Ljx',
  db: 1,
};

const logger = {
  maxFiles: '3d',
  fileLogName: 'wechat.log',
  enableConsole: false,
  level: 'warn',
  maxSize: '100m',
  format: info => {
    return `${info.timestamp} ${info.LEVEL} ${info.pid} ${info.labelText}${info.message}`;
  },
};

export default {
  // 修改成你自己独有的key
  keys: 'wulingshan',
  koa: {
    port: 8001,
  },
  typeorm: {
    dataSource: {
      // 传入订阅类
      subscribers: [BaseEntitySubscriber],
    },
  },
  midwayLogger: {
    default: {
      maxFiles: '3d',
      maxSize: '100m',
    },
    clients: {
      wechat: Object.assign({}, logger, { fileLogName: 'wechat.log' }),
      base: Object.assign({}, logger, { fileLogName: 'base.log' }),
      task: Object.assign({}, logger, { fileLogName: 'task.log' }),
    },
  },
  bodyParser: {
    enableTypes: ['json', 'form', 'text', 'xml'],
    formLimit: '1mb',
    jsonLimit: '1mb',
    textLimit: '1mb',
    xmlLimit: '1mb',
  },
  // 文件上传
  upload: {
    fileSize: '200mb',
  },
  // 模板渲染
  view: {
    mapping: {
      '.html': 'ejs',
    },
  },
  // 本地缓存
  // cache: {
  //   store: fsStore,
  //   options: {
  //     path: 'cache',
  //     ttl: -1,
  //   },
  // },
  redis: {
    client: redis,
  },
  // redis缓存
  cache: {
    store: redisStore,
    options: Object.assign({}, redis, { keyPrefix: 'cache:', ttl: 100 }),
  },
  //分布式定时任务
  task: {
    redis: redis,
    prefix: 'wechat-task',
    defaultJobOptions: {
      repeat: {
        tz: 'Asia/Shanghai', // Task 等参数里面设置的比如（0 0 0 * * *）本来是为了0点执行，但是由于时区不对，所以国内用户时区设置一下。
      },
    },
  },
  // cool配置
  cool: {
    initDB: true,
    redis: Object.assign({}, redis),
    // 是否自动导入数据库
    file: {
      // 上传模式 本地上传或云存储
      mode: MODETYPE.LOCAL,
      // 本地上传 文件地址前缀
      domain: 'http://127.0.0.1:8001',
    },
  } as CoolConfig,
} as
  | MidwayConfig
  | {
      cache: any;
    };
