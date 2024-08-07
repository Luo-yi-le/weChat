import { Provide } from '@midwayjs/decorator';
import { NextFunction } from '@midwayjs/koa';
// import { IMidwayWebNext } from '@midwayjs/web';
import { IMiddleware } from '@midwayjs/core';
import { Context } from 'egg';
import * as _ from 'lodash';

/**
 * swagger
 */
@Provide()
export class SwaggerMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      const { url } = ctx;
      await next();
      if (_.startsWith(url, '/swagger-ui/json')) {
        ctx.body.components.securitySchemes = {
          Authorization: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header',
          },
        };
        ctx.body.security = [{ Authorization: [] }];
      }
    };
  }

  static getName(): string {
    return 'SwaggerMiddleware';
  }
}
