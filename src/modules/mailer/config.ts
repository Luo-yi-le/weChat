import { BaseLogMiddleware } from '../base/middleware/log';
// import { BaseAuthorityMiddleware } from './middleware/authority';
import { ModuleConfig } from '@cool-midway/core';

/**
 * 模块的配置
 */
export default () => {
  return {
    // 模块名称
    name: '邮件管理',
    // 模块描述
    description: '邮件服务',
    // 中间件
    globalMiddlewares: [BaseLogMiddleware], //BaseAuthorityMiddleware
    // jwt 生成解密token的
    jwt: {
      // 单点登录
      sso: false,
      // 注意： 最好重新修改，防止破解
      secret: 'FOAPOFALOEQIPNNLQ',
      // token
      token: {
        // 2小时过期，需要用刷新token
        expire: 2 * 3600,
        // 15天内，如果没操作过就需要重新登录
        refreshExpire: 24 * 3600 * 15,
      },
    },
  } as ModuleConfig;
};
