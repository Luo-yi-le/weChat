import { Inject, Provide, Logger } from '@midwayjs/decorator';
import { BaseService, CoolCommException } from '@cool-midway/core';
import { ILogger } from '@midwayjs/logger';
import { Context } from '@midwayjs/koa';
import { wxUtil } from '../api/util';
import { WeChatAPI } from '../api/index';

/**
 * 微信请求处理逻辑
 */
@Provide()
export class OtherService extends BaseService {
  @Inject()
  ctx: Context;

  @Logger()
  logger: ILogger;

  @Inject()
  util: wxUtil;

  @Inject()
  weChatAPI: WeChatAPI;

  async createQrCode() {
    await this.weChatAPI.init();
    const qrcode = await this.weChatAPI.getWeChatQrcode();
    return qrcode;
  }
}
