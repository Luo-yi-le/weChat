import { Middleware } from '@midwayjs/decorator';
import * as _ from 'lodash';
import { NextFunction, Context } from '@midwayjs/koa';
import { IMiddleware } from '@midwayjs/core';
import { BaseLogMiddleware } from '../../base/middleware/log';
/**
 * 日志中间件
 */
@Middleware()
export class LogMiddleware
  extends BaseLogMiddleware
  implements BaseLogMiddleware {}
