import { CoolConfig } from '@cool-midway/core';
import { MidwayConfig } from '@midwayjs/core';

/**
 * 本地开发 npm run dev 读取的配置文件
 */
export default {
  orm: {
    type: 'mysql',
    host: '175.27.158.145',
    port: 3306,
    username: 'admin2',
    password: '153759.Ljx',
    database: 'cool',
    // 自动建表 注意：线上部署的时候不要使用，有可能导致数据丢失
    synchronize: true,
    subscribers: [],
    // 打印日志
    logging: true,
    // 字符集
    charset: 'utf8mb4',
  },
  cool: {
    // 是否自动导入数据库
    initDB: true,
    redis: {
      host: '175.27.158.145',
      port: 6379,
      password: '153759.Ljx',
      db: 1,
    },
  } as CoolConfig,
} as MidwayConfig;
