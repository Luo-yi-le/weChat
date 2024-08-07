import { RedisService } from '@midwayjs/redis';
import { Middleware, IMiddleware, Inject, Logger, IgnoreMatcher } from '@midwayjs/core';
import { NextFunction, Context } from '@midwayjs/koa';
import { Utils } from '../comm/utils';
import { BaseSysLogService } from '../modules/base/service/sys/log';
import { ILogger } from '@midwayjs/logger';

@Middleware()
export class IdempotencyMiddleware implements IMiddleware<Context, NextFunction> {
    @Inject()
    redisService: RedisService;

    @Inject()
    utils: Utils;

    @Inject()
    baseSysLogService: BaseSysLogService;

    // 服务器日志
    @Logger('IdempotencyMiddleware')
    idempotencyMiddlewareLogger: ILogger;

    /**
     * 获取客户端ip
     *
     * @param {Context} context请求上下文
     * @return {*} 
     * @memberof IdempotencyMiddleware
     */
    async getIp(context: Context) {
        const ip = await this.utils.getReqIP(context);
        let Addr:any = {}
        Addr.ip = typeof ip === 'string' ? ip : ip.join(',');
        const ipAddrArr = [];
        for (const e of Addr.ip.split(','))
          ipAddrArr.push(await this.utils.getIpAddr(context, e));
        Addr.ipAddr = ipAddrArr.join(',');
        return Addr
    }

    /**
     * 幂等性检查中间件
     * @return {*} 返回一个生成中间件函数的异步函数，该中间件函数接受上下文和下一个中间件作为参数
     * @memberof IdempotencyMiddleware
     */
    resolve() {
        return async (ctx: Context, next: NextFunction) => {
             // 获取日志服务实例
            const baseSysLogService = await ctx.requestContext.getAsync(
                BaseSysLogService
              );

            // 获取客户端IP地址
            const addr = await this.getIp(ctx);
             // redis唯有key
            const uniqueKey =  addr.ipAddr ? addr.ipAddr : addr.ip + ':'+ ctx.request.url + JSON.stringify(ctx.request.query) + JSON.stringify(ctx.request.body);
            try {
                //在Redis中设置锁，以确保请求的幂等性
                const lockAcquired = await this.redisService.set(uniqueKey, 'true', 'EX', 30); // 锁有效期30秒
                // 如果锁已被其他请求获取，则返回409状态码
                if (!lockAcquired) {
                    ctx.status = 409;
                    ctx.message = '请求已处理. 请勿重复提交';
                    this.idempotencyMiddlewareLogger.warn(uniqueKey + ctx.message)
                    return;
                }
                // 执行下一个中间件或路由处理器
                await next();
                // 请求处理完成，删除锁
                await this.redisService.del(uniqueKey);
                //添加日志
                baseSysLogService.record(
                    ctx,
                    ctx.url.split('?')[0] + ' 日志提示：'+ ctx.message,
                    ctx.req.method === 'GET' ? ctx.request.query : ctx.request.body,
                    ctx.admin ? ctx.admin.userId : null
                );
            } catch (error) {
                ctx.status = 500;
                ctx.message = '幂等性检查期间发生内部服务器错误';
                this.idempotencyMiddlewareLogger.warn(uniqueKey + ctx.message + JSON.stringify(error))
            }
        };
    }
    // 下面的路由将忽略此中间件
    ignore(ctx: Context): boolean {
        return (
          ctx.path === '/admin/base/sys/log/page' ||
          ctx.path.includes('/swagger-ui/') ||
          ctx.path.includes('/open/') ||
          ctx.path.includes('/qrcode')
        );
      }

    /**
     * 获取中间件名称
     * 
     * @returns {string} 中间件的名称
     */
    static getName(): string {
        return 'IdempotencyMiddleware';    // 中间件名
    }

    
}