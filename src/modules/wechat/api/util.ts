import { Provide } from '@midwayjs/decorator';
import util = require('util');
/*!
 * 对返回结果的一层封装，如果遇见微信返回的错误，将返回一个错误
 * 参见：http://mp.weixin.qq.com/wiki/17/fa4e1434e57290788bde25603fa2fcbd.html
 */
@Provide()
export class WeChatUtil {
  public async wrapper(
    callback: (err: Error | any, data: Data, res: string) => void
  ) {
    return (err: any, data: Data, res: any) => {
      callback = callback || function () {};
      if (err) {
        err.name = 'WeChatAPI' + err.name;
        return callback(err, data, res);
      }

      if (data && data.errcode) {
        err = new Error(data.errmsg);
        err.name = 'WeChatAPIError';
        err.code = data.errcode;
        return callback(err, data, res);
      }
      if (data == null) {
        err = new Error('No data received.');
        err.name = 'WeChatAPIError';
        err.code = -1;
        return callback(err, data, res);
      }
      callback(null, data, res);
    };
  }

  /*!
   * 对提交参数一层封装，当POST JSON，并且结果也为JSON时使用
   */
  public async postJSON(data: any) {
    return {
      dataType: 'json',
      type: 'POST',
      data: data,
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }

  public async make(host: { [x: string]: any }, name: string, fn: any) {
    host[name] = function () {
      // eslint-disable-next-line prefer-rest-params
      const args: any = arguments;
      this.preRequest(this['_' + name], args);
    };
    host['_' + name] = fn;
  }

  public extend(origin: { [x: string]: any }, add: { [x: string]: any }) {
    if (!add || typeof add !== 'object') return origin;
    let keys = Object.keys(add);
    let i = keys.length;
    while (i--) {
      origin[keys[i]] = add[keys[i]];
    }
    return origin;
  }
}

interface Data {
  [x: string]: any;
  expires_in?: number;
  errcode: any;
  errmsg: string;
}
