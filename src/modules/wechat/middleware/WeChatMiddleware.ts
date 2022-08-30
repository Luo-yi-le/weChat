import { Middleware } from '@midwayjs/decorator';
import * as _ from 'lodash';
import { NextFunction, Context } from '@midwayjs/koa';
import { IMiddleware, IMidwayBaseApplication } from '@midwayjs/core';
import { InteractionService } from '../service/InteractionService';
/**
 * 微信中间件
 */
@Middleware()
export class WeChatMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      const { url } = ctx;
      if (url.includes('/interaction/') || url.includes('/wechat/')) {
        const interactionService = await ctx.requestContext.getAsync(
          InteractionService
        );
        interactionService.token();
      }
      await next();
    };
  }
}
