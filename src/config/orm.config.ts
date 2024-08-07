export default {
  type: 'mysql',
  host: '172.18.0.8',
  port: 3307,
  username: 'root',
  password: 'root',
  database: 'cool',
  // 自动建表 注意：线上部署的时候不要使用，有可能导致数据丢失
  synchronize: true,
  subscribers: [],
  // 打印日志
  logging: true,
  // 字符集
  charset: 'utf8mb4',
};
