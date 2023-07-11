import { ServiceFactoryConfigOption } from '@midwayjs/core';

export interface IServiceBalancer {
  /**
   * 根据服务名称选择实例
   * @param serviceName 注册的服务名称
   * @param passingOnly 只返回通过健康检查的实例，默认为 true
   */
  select(serviceName: string, passingOnly?: boolean): any | never;
}

export interface INacosBalancer {
  /**
   * 根绝策略返回负载均衡器
   * @param strategy 负载均衡策略
   */
  getServiceBalancer(strategy?: string): IServiceBalancer;
}


export interface INacosConfig {
  registry?: ServiceFactoryConfigOption<INacosRegistry>;
  config?: ServiceFactoryConfigOption<INacosConfigClient>;
}

export interface INacosRegistry {
  serverList: string | string[],
  namespace: string,
  server?: IRegistryServer[]
}

export type INacosConfigClient = IServerAddr | IConfigClient

export interface IRegistryServer {
  serviceName: string,
  instance: Instance,                               //Instance
  groupName?: string
}
export interface IConfigServer {
  dataId: string,
  group: string,
  content: any,
  options?: any
}

interface Instance {
  ip: string,                                         //IP of instance
  port: number,                                       //Port of instance
  weight?: number,
  ephemeral?: boolean,
  clusterName?: string
}
interface IServerAddr {
  serverAddr: string,
  server?: IConfigServer[]

}



interface IConfigClient {
  endpoint: string,
  namespace: string,
  accessKey: string,
  secretKey: string,
  requestTimeout: number,
  server?: IConfigServer[]
}