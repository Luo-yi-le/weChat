import { INacosConfig } from '../components/nacos/src/interface';

export default {
  registry: {
    //注册中心
    client: {
      //单实例 https://midwayjs.org/en/docs/service_factory#%E5%8D%95%E4%B8%AA%E5%AE%9E%E4%BE%8B
      serverList: '127.0.0.1:8848', // replace to real nacos serverList
      namespace: 'public',
      server: [
        {
          serviceName: 'wechat',
          instance: {
            ip: '127.0.0.1',
            port: 8091,
          },
        },
      ],
    },
  },
  config: {
    //配置中心
    client: {
      serverAddr: '127.0.0.1:8848',
      server: [
        {
          dataId: 'wechat',
          group: 'DEFAULT_GROUP',
          content: `datasource.host=127.0.0.1
                    datasource.port=3306
                    datasource.username=root
                    datasource.password=creawor`,
        },
      ],
    },
  },
} as INacosConfig;
