import { Provide, Inject, Logger } from '@midwayjs/decorator';
import { HttpServiceFactory } from '@midwayjs/axios';
import { BaseService, CoolCommException } from '@cool-midway/core';
import { ILogger } from '@midwayjs/logger';
import { IWeChat } from './../../../global/types/weChat';
import { CacheManager } from '@midwayjs/cache';
import { RedisService } from '@midwayjs/redis';
import { wxUtil } from './util';
import { IAPI } from './openApi';
// import _ = require('lodash');

@Provide()
export class WeChatAPI extends BaseService {
  @Inject()
  httpServiceFactory: HttpServiceFactory;

  @Inject()
  cacheManager: CacheManager;

  @Inject()
  redisService: RedisService;

  @Inject()
  util: wxUtil;

  @Logger('wechatLogger')
  wechatLogger: ILogger;

  appID: any | string;
  appSecret: any | string;
  token: any | string;
  access_token: any | string;
  public CoolCommException(message: string) {
    return new CoolCommException(message);
  }

  public async init() {
    this.sqlParams = [];
    this.appID = this.util.getOpenApi('wxAppID');
    this.appSecret = this.util.getOpenApi('wxAppSecret');
    this.token = this.util.getOpenApi('wxToken');
    this.access_token = await this.cacheManager.get('wechat:accessToken');
  }

  /**
   * API接口 IP 即api.weixin.qq.com的解析地址，由开发者调用微信侧的接入IP。
   */
  public async getApiDomainIp(): Promise<any[] | IWeChat.IReslut> {
    const axiosResponse: IWeChat.HttpServiceResponse<IAPI> = {
      message: '获取微信IP',
      IAPI: 'ip',
      method: 'GET',
    };
    return await this.httpServiceResponse(axiosResponse);
  }

  /**
   * 本接口用于清空公众号/小程序/第三方平台等接口的每日调用接口次数
   */
  public async clearQuota(appid = this.appID): Promise<IWeChat.IReslut> {
    const axiosResponse: IWeChat.HttpServiceResponse<IAPI> = {
      message: '清空 api 的调用quota',
      IAPI: 'clearQuota',
      method: 'POST',
      data: { appid },
    };
    return await this.httpServiceResponse(axiosResponse);
  }

  /**
   * 获取AccessToken
   * @returns
   */
  public async fetchAccessToken(): Promise<IWeChat.GetAccessTokenInfo | any> {
    const axiosResponse: IWeChat.HttpServiceResponse<IAPI> = {
      message: '微信接口获取AccessToken',
      IAPI: 'accToken',
      method: 'GET',
      params: { appid: this.appID, secret: this.appSecret },
    };
    return await this.httpServiceResponse(axiosResponse);
  }

  /**
   * 获取单个用户信息
   * @param openid 普通用户的标识，对当前公众号唯一
   */
  public async fetchUserInfo(openid: any): Promise<IWeChat.GetUserInfo | any> {
    const axiosResponse: IWeChat.HttpServiceResponse<IAPI> = {
      message: '获取单个用户信息',
      IAPI: 'userInfo',
      method: 'GET',
      params: { openid: openid[0] },
    };
    return await this.httpServiceResponse(axiosResponse);
  }

  /**
   * 批量获取用户基本信息
   */
  public async fetchUserInfoList(
    data
  ): Promise<IWeChat.ICommon<IWeChat.GetUserInfo[]>> {
    const axiosResponse: IWeChat.HttpServiceResponse<IAPI> = {
      message: '批量获取用户基本信息',
      IAPI: 'userInfoList',
      method: 'POST',
      data,
    };
    return await this.httpServiceResponse(axiosResponse);
  }

  /**
   * 创建菜单
   * @params menu
   */
  async createDefineMenu(menu): Promise<IWeChat.IReslut> {
    const axiosResponse: IWeChat.HttpServiceResponse<IAPI> = {
      message: '创建菜单',
      IAPI: 'createMenu',
      method: 'POST',
      data: menu,
    };
    return await this.httpServiceResponse(axiosResponse);
  }

  /**
   * 查询菜单
   * @returns
   */
  async inquiryDefineMenu() {
    const axiosResponse: IWeChat.HttpServiceResponse<IAPI> = {
      message: '查询菜单',
      IAPI: 'getMenu',
      method: 'GET',
    };
    return await this.httpServiceResponse(axiosResponse);
  }

  /**
   * 删除菜单
   * @returns any
   */
  async deleteDefineMenu() {
    const axiosResponse: IWeChat.HttpServiceResponse<IAPI> = {
      message: '删除菜单',
      IAPI: 'deleteMenu',
      method: 'GET',
    };
    return await this.httpServiceResponse(axiosResponse);
  }

  /**
   * 创建微信二维码
   * @param expire_seconds 二维码有效时间,以秒为单位
   * @param action_name 二维码类型, QR_SCENE为临时的整型参数值，QR_STR_SCENE为临时的字符串参数值，QR_LIMIT_SCENE为永久的整型参数值，QR_LIMIT_STR_SCENE为永久的字符串参数值
   */
  async getWeChatQrcode(expire_seconds = 5, action_name = 'QR_SCENE') {
    let data = {
      expire_seconds: 60 * expire_seconds, //5分钟有效
      action_name: action_name,
      action_info: { scene: { scene_id: 658801 } },
    };
    const axiosResponse: IWeChat.HttpServiceResponse<IAPI> = {
      message: '创建微信二维码',
      IAPI: 'qrcode',
      method: 'POST',
      data,
    };
    let reslut: any = await this.httpServiceResponse(axiosResponse);
    // let reslut = this.util.httpServiceResponse(response, url, '创建微信二维码');
    const showqrcode = this.util.formatOpenApi('showqrcode', reslut.ticket);
    // reslut.qrcode = reslut.ticket;
    return showqrcode;
  }

  /**
   * 获取粉丝
   * @params next_openid 最后一位
   */
  async getFuns(next_openid = ''): Promise<IWeChat.IFuns | IWeChat.IReslut> {
    const axiosResponse: IWeChat.HttpServiceResponse<IAPI> = {
      message: '获取粉丝',
      IAPI: 'getFun',
      method: 'GET',
      params: { next_openid },
    };
    return await this.httpServiceResponse(axiosResponse);
  }

  /**
   * 设置用户备注名
   */
  async setFunName(data: IWeChat.ISetFunsName): Promise<IWeChat.IReslut> {
    const axiosResponse: IWeChat.HttpServiceResponse<IAPI> = {
      message: '设置用户备注名',
      IAPI: 'setFunName',
      method: 'POST',
      data,
    };
    return await this.httpServiceResponse(axiosResponse);
  }

  /**
   * 创建标签.
   * 一个公众号，最多可以创建100个标签。
   */
  async createTags(
    data: IWeChat.ITagsDefault
  ): Promise<IWeChat.ITags<IWeChat.ITagsDefault>> {
    const axiosResponse: IWeChat.HttpServiceResponse<IAPI> = {
      message: '创建标签',
      IAPI: 'createTags',
      method: 'POST',
      data,
    };
    return await this.httpServiceResponse(axiosResponse);
  }

  /**
   *
   * 获取公众号已创建的标签
   * @returns
   */
  async getTags(): Promise<IWeChat.ITags<IWeChat.ITagsDefault[]>> {
    const axiosResponse: IWeChat.HttpServiceResponse<IAPI> = {
      message: '获取公众号已创建的标签',
      IAPI: 'getTags',
      method: 'GET',
    };
    return await this.httpServiceResponse(axiosResponse);
  }

  /**
   *
   * 编辑标签
   * @returns
   */
  async updateTags(data: IWeChat.ITagsDefault): Promise<IWeChat.IReslut> {
    const axiosResponse: IWeChat.HttpServiceResponse<IAPI> = {
      message: '编辑标签',
      data,
      IAPI: 'updateTags',
      method: 'POST',
    };
    return await this.httpServiceResponse(axiosResponse);
  }

  /**
   *
   * 删除标签
   * @returns
   */
  async deleteTags(data: IWeChat.ITagsDefault): Promise<IWeChat.IReslut> {
    const axiosResponse: IWeChat.HttpServiceResponse<IAPI> = {
      message: '删除标签',
      data,
      IAPI: 'deleteTags',
      method: 'POST',
    };
    return await this.httpServiceResponse(axiosResponse);
    // return this.util.httpServiceResponse(response, url, data, '删除标签');
  }

  /**
   *
   * 批量为用户打标签
   * @returns
   */
  Batchtagging(data: IWeChat.IBatchTag): Promise<IWeChat.IReslut> {
    const axiosResponse: IWeChat.HttpServiceResponse<IAPI> = {
      message: '批量为用户打标签',
      data,
      IAPI: 'setBatchtagging',
      method: 'POST',
    };
    return this.httpServiceResponse(axiosResponse);
    // return this.util.httpServiceResponse(response, url, data, '删除标签');
  }

  async getidlist(data): Promise<IWeChat.IReslut> {
    const axiosResponse: IWeChat.HttpServiceResponse<IAPI> = {
      message: '获取用户身上的标签列表',
      data,
      IAPI: 'getidlist',
      method: 'POST',
    };
    return await this.httpServiceResponse(axiosResponse);
  }

  /**
   * JS-SDK使用权限签名算法
   * @returns any
   */
  async getTicketOfJsApi(type = 'jsapi'): Promise<IWeChat.IReslut> {
    const axiosResponse: IWeChat.HttpServiceResponse<IAPI> = {
      message: 'JS-SDK使用权限签名',
      IAPI: 'getTicketOfJsApi',
      method: 'GET',
      params: { type },
    };
    return this.httpServiceResponse(axiosResponse);
    // return this.util.httpServiceResponse(response, url, 'JS-SDK使用权限签名');
  }

  /**
   * 处理请求数据
   * @param response 请求数据
   * @param url 请求链接
   * @param errMsg 自定义错误信息
   * @returns
   */
  async httpServiceResponse(
    httpServiceResponse: IWeChat.HttpServiceResponse<IAPI>
  ) {
    const wechatAxios = this.httpServiceFactory.get('wechatAxios');
    // eslint-disable-next-line prettier/prettier
    const url = this.util.formatOpenApi(httpServiceResponse.IAPI, this.access_token);
    const response = await wechatAxios.request({
      url,
      method: httpServiceResponse.method,
      data: httpServiceResponse.data,
      params: httpServiceResponse.params,
    });
    // console.log(2222222, response);
    // eslint-disable-next-line prettier/prettier
    if (response && response.data) {
      this.wechatLogger.info(
        '微信接口【' + httpServiceResponse.message + '】: ',
        response.config.url,
        '参数' +
          JSON.stringify(
            httpServiceResponse.params
              ? httpServiceResponse.params
              : httpServiceResponse.data
          ),
        '返回结果' + JSON.stringify(response.data)
      );
      return Promise.resolve(response.data);
    } else {
      this.wechatLogger.error(
        '微信接口【' + httpServiceResponse.message + '】: ',
        response.config.url,
        '参数' +
          JSON.stringify(
            httpServiceResponse.params
              ? httpServiceResponse.params
              : httpServiceResponse.data
          ),
        '返回结果' + JSON.stringify(response.data)
      );
      return Promise.reject(response.data);
    }
  }
}
