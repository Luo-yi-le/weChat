import { Provide } from '@midwayjs/decorator';

/**
 * 描述
 */
@Provide()
export class WeChatCommon {
  accessToken: any;
  expireTime: any;
  constructor(accessToken: string, expireTime: number | any) {
    this.accessToken = accessToken;
    this.expireTime = expireTime;

    if (!(this instanceof WeChatCommon)) {
      return new WeChatCommon(accessToken, expireTime);
    }
  }
  public AccessToken(accessToken: string, expireTime: number | any) {
    if (!(this instanceof WeChatCommon)) {
      return new WeChatCommon(accessToken, expireTime);
    }
  }

  /*!
   * 检查AccessToken是否有效，检查规则为当前时间和过期时间进行对比
   *
   * Examples:
   * ```
   * token.isValid();
   * ```
   */
  public isValid() {
    return !!this.accessToken && new Date().getTime() < this.expireTime;
  }
}
