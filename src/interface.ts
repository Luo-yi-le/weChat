import { ServiceFactoryConfigOption } from '@midwayjs/core';
/**
 * @description User-Service parameters
 */
export interface IUserOptions {
  uid: number;
}

export interface IUpLoad<T = any> {
  mode: string;
  service?: T;
  files?: string[];
  fields?: object;
}

declare module 'nodemailer' {
  interface MailMessageInfo extends SentMessageInfo {
    accepted?: any[];
    rejected?: any[];
    envelopeTime?: number;
    messageTime?: number;
    messageSize?: number;
    response?: string;
    envelope?: {
      form?: string;
      to?: any[];
    };
    messageId?: string;
  }
}

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
  registry?: ServiceFactoryConfigOption<any>;
  config?: ServiceFactoryConfigOption<any>;
}
