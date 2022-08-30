import { CoolConfig } from '@cool-midway/core';
import { MODETYPE } from '@cool-midway/file';
import { MidwayConfig } from '@midwayjs/core';
import * as redisStore from 'cache-manager-ioredis';
import * as fsStore from 'cache-manager-fs-hash';
import { BaseEntitySubscriber } from './../global/subscriber/baseEntitySubscriber';

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
    client: {
      port: 6379, // Redis port
      host: '127.0.0.1', // Redis host
      password: '',
      db: 1,
    },
  },
  // redis缓存
  cache: {
    store: redisStore,
    options: {
      host: 'localhost',
      port: 6379,
      password: '',
      db: 0,
      keyPrefix: 'cache:',
      ttl: 100,
    },
  },
  // cool配置
  cool: {
    initDB: true,
    redis: {
      host: '127.0.0.1',
      port: 6379,
      password: '',
      db: 1,
    },
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
