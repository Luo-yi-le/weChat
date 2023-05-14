export default {

    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'cool',
    // 自动建表 注意：线上部署的时候不要使用，有可能导致数据丢失
    synchronize: true,
    subscribers: [],
    // 打印日志
    logging: true,
    // 字符集
    charset: 'utf8mb4',

};
