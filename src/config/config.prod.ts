import { CoolConfig } from '@cool-midway/core';
import { MidwayConfig } from '@midwayjs/core';
import orm from './orm.config';
import redis from './redis.config';

/**
 * 本地开发 npm run dev 读取的配置文件
 */
export default {
  orm: orm,
  cool: {
    // 是否自动导入数据库
    initDB: true,
    redis: redis,
  } as CoolConfig,
} as MidwayConfig;
