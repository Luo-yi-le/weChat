import { Middleware, Config } from '@midwayjs/decorator';
import * as _ from 'lodash';
import { NextFunction, Context } from '@midwayjs/koa';
import { IMiddleware } from '@midwayjs/core';
import { BaseSysLogService } from '../service/sys/log';
// import * as jwt from 'jsonwebtoken';

/**
 * 日志中间件
 */
@Middleware()
export class BaseLogMiddleware implements IMiddleware<Context, NextFunction> {
  @Config('module.base')
  jwtConfig;

  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      const { url } = ctx;
      const baseSysLogService = await ctx.requestContext.getAsync(
        BaseSysLogService
      );
      if (url.includes('/interaction/')) {
        ctx.admin = {
          userId: '2',
          name: '微信登录用户',
        };
      } else {
        // const token = ctx.get('Authorization');
        // ctx.admin = jwt.verify(token, this.jwtConfig.jwt.secret);
      }
      baseSysLogService.record(
        ctx,
        ctx.url.split('?')[0],
        ctx.req.method === 'GET' ? ctx.request.query : ctx.request.body,
        ctx.admin ? ctx.admin.userId : null
      );
      await next();
    };
  }
  ignore(ctx: Context): boolean {
    // 下面的路由将忽略此中间件
    return (
      ctx.path === '/admin/base/sys/log/page' ||
      ctx.path.includes('/swagger-ui/') ||
      ctx.path.includes('/open/') ||
      ctx.path.includes('/qrcode')
    );
  }
}
