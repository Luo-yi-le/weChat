import { Inject, Provide, Logger } from '@midwayjs/decorator';
import { BaseService } from '@cool-midway/core';
import { ILogger } from '@midwayjs/logger';
import * as _ from 'lodash';
import { Context } from '@midwayjs/koa';
import sha1 = require('sha1');
import { MessageService } from './MessageService';
import { WX_MESSAGE_TYPE_NAME } from '../../../global/enum/wxEnum';
import { WeChatAPI } from '../api/index';
import { WXAccountService } from '../service/accountService';
import { CacheManager } from '@midwayjs/cache';
import { RedisService } from '@midwayjs/redis';
import { wxUtil } from './../api/util';
import { UUID } from './../../../global/utils/index';

@Provide()
export class InteractionService {
  @Logger('wechat')
  logger: ILogger;

  @Inject()
  redisService: RedisService;

  @Inject()
  wxutil: wxUtil;

  @Inject()
  messageService: MessageService;

  @Inject()
  cacheManager: CacheManager;

  @Inject()
  wxAccountService: WXAccountService;

  @Inject()
  api: WeChatAPI;

  config: any;

  public async action(
    signature?: string,
    nonce?: string,
    timestamp?: string,
    echostr?: string,
    openid?: any,
    request?: any,
    response?: any
  ) {
    await this.api.init();
    let message: string;
    if (!request && !request?.body && !openid) {
      this.config = {
        wechat: {
          appID: this.wxutil.getOpenApi('wxAppID'),
          appSecret: this.wxutil.getOpenApi('wxAppSecret'),
          token: this.wxutil.getOpenApi('wxToken'),
        },
      };
    } else if (request && request?.body && !signature && openid) {
      this.logger.info('接受微信消息：', request.body);
      message = await this.messageService.start(request.body, openid);
      this.logger.info('发送微信消息：', message);
    }
    return new Promise((resolve, reject) => {
      if (request && request?.body && !signature) {
        resolve(message);
      } else {
        const token = this.config?.wechat?.token;
        const str = [token, timestamp, nonce].sort().join('');
        const sha = sha1(str);
        if (sha === signature) {
          try {
            resolve(echostr + '');
          } catch (error) {
            this.logger.error('微信服务器发起请求异常', error);
          }
        } else {
          reject('wrong');
        }
        this.logger.info('微信服务器发起请求结束----');
      }
    });
  }

  /**
   * 刷新accessToken
   * @returns
   */
  public async token() {
    const wxAppSecret = this.wxutil.getOpenApi('wxAppSecret');
    // eslint-disable-next-line prettier/prettier
    const accessToken = await this.cacheManager.get(`wechat:accessToken:${wxAppSecret}`) || '';
    // eslint-disable-next-line prettier/prettier
    const expiresIn = await this.cacheManager.get(`wechat:accessTokenExpiresIn:${wxAppSecret}`) || 0;
    await this.api.init();
    // eslint-disable-next-line prettier/prettier
    if (accessToken && expiresIn && Number(expiresIn) > new Date().getTime()) { //判断是否存在缓存或者过期
      // eslint-disable-next-line prettier/prettier
      this.logger.info('accessToken信息有有效期：', new Date(Number(expiresIn)).toLocaleString(), JSON.stringify({appSecret: wxAppSecret, expiresIn: expiresIn, accessToken,})
      );
      return { access_token: accessToken, expires_in: expiresIn };
    } else {
      //重新获取token并写入缓存
      const accToken = await this.wxAccountService.getAccessToken(wxAppSecret);
      const res = await this.api.fetchAccessToken();
      if (res) {
        const param = Object.assign({}, accToken, {
          appSecret: wxAppSecret,
          accessToken: res.access_token,
          expiresIn: new Date().getTime() + (res.expires_in - 60) * 1000, //减去60秒 增加重新请求时间
        });
        // eslint-disable-next-line prettier/prettier
        await this.cacheManager.set(`wechat:accessToken:${wxAppSecret}`, res.access_token, { ttl: res.expires_in - 60 });
        // eslint-disable-next-line prettier/prettier
        await this.cacheManager.set(`wechat:accessTokenExpiresIn:${wxAppSecret}`, param.expiresIn, { ttl: res.expires_in - 60 });
        await this.wxAccountService.updateAccessToken(param);
        // eslint-disable-next-line prettier/prettier
        this.logger.info('重新获取accessToken，有效期', new Date(param.expiresIn).toLocaleString(), JSON.stringify(param));
        await this.api.init();
        return { access_token: res.access_token, expires_in: param.expiresIn };
      } else {
        this.logger.error('获取accessToken错误：', res);
        return new Error('获取accessToken错误: ' + res);
      }
    }
    // let res = await this.api.fetchAccessToken();
  }

  async loadConfigData(url: string, type?: string) {
    const noncestr = UUID(16);
    let timestamp = new Date().getTime() / 1000,
      jsapi_ticket = '',
      str = '';
    // eslint-disable-next-line prettier/prettier
    const ticket: string = await this.cacheManager.get('wechat:loadConfigData:ticket');
    // eslint-disable-next-line prettier/prettier
    const expiresIn = await this.cacheManager.get('wechat:loadConfigData:expires_in');
    await this.api.init();

    if (ticket && expiresIn && Number(expiresIn) > new Date().getTime()) {
      jsapi_ticket = ticket;
      str = `jsapi_ticket=${ticket}&noncestr=${noncestr}&timestamp=${timestamp}&url=${url}`;
    } else {
      let res = await this.api.getTicketOfJsApi(type);
      jsapi_ticket = res.ticket;
      str = `jsapi_ticket=${res.ticke}&noncestr=${noncestr}&timestamp=${timestamp}&url=${url}`;
      // eslint-disable-next-line prettier/prettier
      await this.cacheManager.set('wechat:loadConfigData:ticket', jsapi_ticket, { ttl: res.expires_in - 60 });
      // eslint-disable-next-line prettier/prettier
      await this.cacheManager.set('wechat:loadConfigData:expires_in', Number(res.expires_in) - 60, { ttl: res.expires_in - 60 });
    }
    return {
      jsapi_ticket: jsapi_ticket,
      timestamp: timestamp,
      noncestr,
      url,
      signature: sha1(str),
      appId: this.api.appID,
      appSecret: this.api.appSecret,
    };
  }
}
