import { LogMiddleware } from './middleware/LogMiddleware';
import { WeChatMiddleware } from './middleware/WeChatMiddleware';
import { SwaggerMiddleware } from './middleware/SwaggerMiddleware';
// import { BaseAuthorityMiddleware } from './middleware/authority';
import { ModuleConfig } from '@cool-midway/core';

/**
 * 模块的配置
 */
export default () => {
  return {
    post: '9999',
    // 模块名称
    name: '权限管理',
    // 模块描述
    description: '基础的权限管理功能，包括登录，权限校验',
    // 中间件
    globalMiddlewares: [LogMiddleware, SwaggerMiddleware, WeChatMiddleware], //BaseAuthorityMiddleware
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
