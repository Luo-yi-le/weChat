import { Provide, Inject, Logger } from '@midwayjs/decorator';
import { HttpService } from '@midwayjs/axios';
import { ILogger } from '@midwayjs/logger';
import {
  GetAccessTokenInfo,
  GetUserInfo,
  IReslut,
} from './../../../global/types/weChat';
import { CacheManager } from '@midwayjs/cache';
import { wxUtil } from './util';
import { Button } from './../entities/button';
// import _ = require('lodash');

@Provide()
export class WeChatAPI {
  @Inject()
  httpService: HttpService;

  @Inject()
  cacheManager: CacheManager;

  @Inject()
  util: wxUtil;

  @Logger()
  logger: ILogger;

  appID: any | string;
  appSecret: any | string;
  token: any | string;
  access_token: any | string;

  public async init() {
    this.appID = this.util.getOpenApi('wxAppID');
    this.appSecret = this.util.getOpenApi('wxAppSecret');
    this.token = this.util.getOpenApi('wxToken');
    this.access_token = await this.cacheManager.get(
      `wechat:accessToken:${this.appSecret}`
    );
  }

  /**
   * API接口 IP 即api.weixin.qq.com的解析地址，由开发者调用微信侧的接入IP。
   */
  public async getApiDomainIp(): Promise<any[] | IReslut> {
    const url = this.util.formatOpenApi('ip', this.access_token);
    const response = await this.httpService.get(url);
    // eslint-disable-next-line prettier/prettier
    const data = this.util.httpServiceResponse(response, url, '获取微信IP');
    return data;
  }

  /**
   * 本接口用于清空公众号/小程序/第三方平台等接口的每日调用接口次数
   */
  public async clearQuota(appid = this.appID): Promise<IReslut> {
    const url = this.util.formatOpenApi('clearQuota', this.access_token);
    const response = await this.httpService.post(url, { appid });
    // eslint-disable-next-line prettier/prettier
    const data = this.util.httpServiceResponse(response, url, '清空 api 的调用quota');
    return data;
  }

  /**
   * 获取AccessToken
   * @returns
   */
  public async fetchAccessToken(): Promise<GetAccessTokenInfo | any> {
    const url = this.util.formatOpenApi('accToken', this.appID, this.appSecret);
    const response = await this.httpService.get(url);
    if (response && response.data) {
      this.logger.info('微信接口: ', url, response.data);
      return response.data;
    } else {
      this.logger.error('微信接口获取AccessToken错误');
      return new Error();
    }
  }

  /**
   * 获取单个用户信息
   * @param openid 普通用户的标识，对当前公众号唯一
   */
  public async fetchUserInfo(openid: string): Promise<GetUserInfo | any> {
    const url = this.util.formatOpenApi('userInfo', this.access_token, openid);
    // eslint-disable-next-line prettier/prettier

    const response = await this.httpService.get(url);
    // eslint-disable-next-line prettier/prettier
    const data = this.util.httpServiceResponse(response, url, '获取单个用户信息错误');
    return data;
    if (response && response.data) {
      this.logger.info('微信接口: ', url, response.data);
      return response.data;
    } else {
      this.logger.error('微信接口获取AccessToken错误', response.data);
      return new Error(response.data);
    }
  }

  /**
   * 批量获取用户基本信息
   */
  public async fetchUserInfoList() {
    // eslint-disable-next-line prettier/prettier
    const url = this.util.formatOpenApi('userInfoList', this.access_token);
    const response = await this.httpService.get(url);
    // eslint-disable-next-line prettier/prettier
    const data = this.util.httpServiceResponse(response, url, '批量获取用户基本信息错误');
    return data;
  }

  /**
   * 创建菜单
   * @params menu
   */
  async createDefineMenu(menu): Promise<IReslut> {
    const url = this.util.formatOpenApi('createMenu', this.access_token);
    const response = await this.httpService.post(url, menu);
    const data = this.util.httpServiceResponse(response, url, '创建菜单');
    return data;
  }

  /**
   * 查询菜单
   * @returns
   */
  async inquiryDefineMenu() {
    const url = this.util.formatOpenApi('getMenu', this.access_token);
    const response = await this.httpService.get(url);
    return this.util.httpServiceResponse(response, url, '查询菜单');
  }

  /**
   * 删除菜单
   * @returns any
   */
  async deleteDefineMenu() {
    const url = this.util.formatOpenApi('deleteMenu', this.access_token);
    const response = await this.httpService.get(url);
    return this.util.httpServiceResponse(response, url, '删除菜单');
  }

  /**
   * 创建微信二维码
   * @param expire_seconds 二维码有效时间,以秒为单位
   * @param action_name 二维码类型, QR_SCENE为临时的整型参数值，QR_STR_SCENE为临时的字符串参数值，QR_LIMIT_SCENE为永久的整型参数值，QR_LIMIT_STR_SCENE为永久的字符串参数值
   */
  async getWeChatQrcode(expire_seconds = 5, action_name = 'QR_SCENE') {
    const qrcode = this.util.formatOpenApi('qrcode', this.access_token);
    let data = {
      expire_seconds: 60 * expire_seconds, //5分钟有效
      action_name: action_name,
      action_info: { scene: { scene_id: 658801 } },
    };
    const response = await this.httpService.post(qrcode, data);
    let reslut = this.util.httpServiceResponse(
      response,
      qrcode,
      '创建微信二维码'
    );
    const showqrcode = this.util.formatOpenApi('showqrcode', reslut.ticket);
    // reslut.qrcode = reslut.ticket;
    return showqrcode;
  }
}
