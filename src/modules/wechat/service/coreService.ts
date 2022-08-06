import { Inject, Provide, Logger } from '@midwayjs/decorator';
import { BaseService, CoolCommException } from '@cool-midway/core';
import { ILogger } from '@midwayjs/logger';
import { Context } from '@midwayjs/koa';
import request from 'request';
import { YAML } from './../core/yaml';
/**
 * 微信请求处理逻辑
 */
@Provide()
export class CoreService extends BaseService {
  @Inject()
  ctx: Context;

  @Logger()
  logger: ILogger;

  yaml: YAML = new YAML({
    fileName: 'wx.config.yml',
    filePath: './',
    encoding: 'utf8',
  });

  appID = '';
  appsecret = '';

  private respBaseXml = 'success';

  constructor(options) {
    super();
    this.appID = options.appID;
    this.appsecret = options.appsecret;

    this.getAccessToken = options.getAccessToken;
    this.saveAccessToken = options.saveAccessToken;
  }

  public async processRequest(request: any) {
    const respXml = this.respBaseXml;
    const respContent = '未知的消息类型';
  }

  public async isAccessTokenValidate(data: {
    access_token: any;
    expires_in: any;
  }) {
    if (!data || !data.access_token || !data.expires_in) {
      return false;
    } else {
      let expiresIn = data.expires_in;
      let now = new Date().getTime();
      return now < expiresIn ? true : false;
    }
  }

  public async updateAccessToken() {
    const url = await this.yaml.get('accToken', this.appID, this.appsecret);
    return new Promise((resolve, reject) => {
      request(url, (err, response, body) => {
        if (err) {
          reject(err);
        } else {
          let accessToken = JSON.parse(body);
          let data = {
            access_token: accessToken.access_token,
            expires_in:
              new Date().getTime() + (accessToken.expires_in - 20) * 1000,
          };
          resolve(data);
          console.log(data);
        }
      });
    });
  }

  public async getNowAccessToken(options) {
    return new Promise((resolve, reject) => {
      options.getAccessToken().then(data => {
        resolve(JSON.parse(data));
      });
    });
  }

  public async getAccessToken() {
    return new Promise((resolve, reject) => {});
  }

  public async saveAccessToken() {
    return new Promise((resolve, reject) => {});
  }
}
