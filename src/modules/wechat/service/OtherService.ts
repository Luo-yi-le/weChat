import { Inject, Provide } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { WeChatAPI } from '../api/index';
import { UserService } from './UserService';

/**
 * 微信请求处理逻辑
 */
@Provide()
export class OtherService extends WeChatAPI {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  // @Task({
  //   repeat: { cron: '0 35 2 * * ?' },
  // })
  async getOtherApiDomainIp() {
    const res = await this.getApiDomainIp();
    this.wechatLogger.info(
      '刷新微信服务器IP成功： ' + JSON.stringify(res),
      new Error('刷新微信服务器IP失败： ' + JSON.stringify(res))
    );
  }

  async createQrCode(expire_seconds = 5, action_name = 'QR_SCENE') {
    const res = await this.getWeChatQrcode(expire_seconds, action_name)
    return res
  }
}
