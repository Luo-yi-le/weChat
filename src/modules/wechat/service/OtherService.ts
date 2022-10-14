import { Inject, Provide, Logger } from '@midwayjs/decorator';
import { BaseService } from '@cool-midway/core';
import { ILogger } from '@midwayjs/logger';
import { Context } from '@midwayjs/koa';
import { wxUtil } from '../api/util';
import { WeChatAPI } from '../api/index';
import { UserService } from './UserService';

/**
 * 微信请求处理逻辑
 */
@Provide()
export class OtherService extends BaseService {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Logger('wechat')
  logger: ILogger;

  @Inject()
  util: wxUtil;

  @Inject()
  weChatAPI: WeChatAPI;

  async createQrCode() {
    await this.weChatAPI.init();
    const qrcode = await this.weChatAPI.getWeChatQrcode();
    const res = await this.weChatAPI.getFuns();
    const userlist = [];
    res.data.openid.forEach(item => {
      userlist.push({ openid: item, lang: 'zh_CN' });
    });
    const a = await this.weChatAPI.fetchUserInfoList({ user_list: userlist });
    a.user_info_list.find(async item => {
      await this.userService.addWXUser(item);
    });
    return qrcode;
  }

  // @Task({
  //   repeat: { cron: '0 35 2 * * ?' },
  // })
  async getApiDomainIp() {
    await this.weChatAPI.init();
    const res = await this.weChatAPI.getApiDomainIp();
    this.logger.info(
      '刷新微信服务器IP成功： ' + JSON.stringify(res),
      new Error('刷新微信服务器IP失败： ' + JSON.stringify(res))
    );
  }
}
