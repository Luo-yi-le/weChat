import { CoolConfig } from '@cool-midway/core';
import { MidwayConfig } from '@midwayjs/core';
import orm from './orm.config'

/**
 * 本地开发 npm run dev 读取的配置文件
 */
export default {
  orm: orm,
  cool: {
    // 是否自动导入数据库
    initDB: true,
    redis: {
      host: '127.0.0.1',
      port: 6379,
      // password: '153759.Ljx',
      db: 1,
    },
  } as CoolConfig,
} as MidwayConfig;
