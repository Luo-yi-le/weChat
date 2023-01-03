import {
  ALL,
  Body,
  Inject,
  Post,
  Get,
  Provide,
  Query,
} from '@midwayjs/decorator';
import { BaseController, CoolController } from '@cool-midway/core';
import { Context } from '@midwayjs/koa';
import { InteractionService } from '../../service/InteractionService';
/**
 * 微信入口
 */
@Provide()
@CoolController('/interaction')
export class InteractionController extends BaseController {
  @Inject()
  interactionService: InteractionService;

  @Inject()
  ctx: Context;

  @Get('/action', { summary: '针对微信公众号get请求' })
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

  @Post('/action', { summary: '针对微信公众号psot请求' })
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

  @Get('/loadConfigData', { summary: '获取公众号配置权限' })
  public async loadConfigData(
    @Query('url') url?: string,
    @Query('type') type?: string
  ) {
    const res = await this.interactionService.loadConfigData(url, type);
    return this.ok(res);
  }

  @Post('/qrcode', { summary: '获取微信二维码' })
  async qrcode() {
    const qrcode = await this.interactionService.createQrCode();
    return this.ok(qrcode);
  }
}
