import {
  ALL,
  Body,
  Inject,
  Post,
  Get,
  Provide,
  Query,
  Logger,
  Param,
} from '@midwayjs/decorator';
import { BaseController, CoolController } from '@cool-midway/core';
import { ILogger } from '@midwayjs/logger';
import { Context } from '@midwayjs/koa';
import { InteractionService } from '../../service/InteractionService';
/**
 * 微信入口
 */
@Provide()
@CoolController('/interaction')
export class InteractionController extends BaseController {
  @Logger()
  logger: ILogger;

  @Inject()
  interactionService: InteractionService;

  @Inject()
  ctx: Context;

  @Get('/action')
  public async action(
    @Query('signature') signature: string,
    @Query('nonce') nonce: string,
    @Query('timestamp') timestamp: string,
    @Query('echostr') echostr: string
  ) {
    const reslut = await this.interactionService.action(
      signature,
      nonce,
      timestamp,
      echostr,
      null,
      null,
      null
    );
    this.ctx.body = reslut;
  }

  @Post('/action')
  // eslint-disable-next-line prettier/prettier
  public async interaction(@Query(ALL) query: any, @Body(ALL) params: any) {
    const message = await this.interactionService.action(
      null,
      null,
      null,
      null,
      query.openid,
      this.ctx.request,
      this.ctx.response
    );
    this.ctx.body = message;
  }

  @Get('/loadConfigData')
  public async loadConfigData(
    @Query('url') url?: string,
    @Query('type') type?: string
  ) {
    const res = await this.interactionService.loadConfigData(url, type);
    return this.ok(res);
  }
}
