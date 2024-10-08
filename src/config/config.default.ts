import { CoolConfig } from '@cool-midway/core';
import { MODETYPE } from '@cool-midway/file';
import { MidwayConfig } from '@midwayjs/core';
import * as redisStore from 'cache-manager-ioredis';
import { join } from 'path';
// import * as fsStore from 'cache-manager-fs-hash';
import { BaseEntitySubscriber } from './../global/subscriber/baseEntitySubscriber';
import axiosConfig from './axios.config';
import loggerConfig from './logger.config';
import socketConfig from './socket.config';
// import NacosConfig from './nacos.config';
import * as moment from 'moment';

const redis = {
  port: 6380, // Redis port
  host: '127.0.0.1', // Redis host
  password: '123456',
  db: 1,
};

export default {
  // 修改成你自己独有的key
  keys: 'wulingshan',
  koa: {
    port: 8091,
  },
  typeorm: {
    dataSource: {
      // 传入订阅类
      subscribers: [BaseEntitySubscriber],
    },
  },
  socketIO: socketConfig,
  axios: axiosConfig,
  midwayLogger: loggerConfig,
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
    mode: 'file',
    whitelist: null,
    base64: false,
    tmpdir: join('public/uploads/', moment().format('YYYYMMDD')),
  },
  // 模板渲染
  view: {
    mapping: {
      '.html': 'ejs',
    },
  },
  // nacos: NacosConfig,
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
