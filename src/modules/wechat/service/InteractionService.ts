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

@Provide()
export class InteractionService {
  @Logger()
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
    const accessToken = await this.cacheManager.get(
      `wechat:accessToken:${wxAppSecret}`
    );
    const expiresIn = await this.cacheManager.get(
      `wechat:accessTokenExpiresIn:${wxAppSecret}`
    );
    // eslint-disable-next-line prettier/prettier
    if (accessToken && expiresIn && Number(expiresIn) > new Date().getTime()) {
      this.logger.info(
        'accessToken信息有有效期：',
        new Date(Number(expiresIn)).toLocaleString(),
        JSON.stringify({
          appSecret: wxAppSecret,
          expiresIn: expiresIn,
          accessToken,
        })
      );
      await this.api.init();
      return {
        access_token: accessToken,
        expires_in: expiresIn,
      };
    } else {
      const accToken = await this.wxAccountService.getAccessToken(wxAppSecret);
      const res = await this.api.fetchAccessToken();
      if (res) {
        const param = Object.assign({}, accToken, {
          appSecret: wxAppSecret,
          accessToken: res.access_token,
          expiresIn: new Date().getTime() + (res.expires_in - 60) * 1000, //减去60秒 增加重新请求时间
        });
        await this.cacheManager.set(
          `wechat:accessToken:${wxAppSecret}`,
          res.access_token,
          { ttl: res.expires_in - 60 }
        );
        await this.cacheManager.set(
          `wechat:accessTokenExpiresIn:${wxAppSecret}`,
          param.expiresIn,
          { ttl: res.expires_in - 60 }
        );
        await this.wxAccountService.updateAccessToken(param);
        this.logger.info(
          '重新获取accessToken，有效期',
          new Date(param.expiresIn).toLocaleString(),
          JSON.stringify(param)
        );
        await this.api.init();
        return {
          access_token: res.access_token,
          expires_in: param.expiresIn,
        };
      } else {
        this.logger.error('获取accessToken错误：', res);
        return new Error('获取accessToken错误: ' + res);
      }
    }
    // let res = await this.api.fetchAccessToken();
  }
}
