import { Provide, Inject, Logger } from '@midwayjs/decorator';
import { ILogger } from '@midwayjs/logger';

import LocalizedStrings, {
  LocalizedStringsMethods as IStrings,
} from 'localized-strings';
import { FormatObject } from './../../../global/types/weChat';
import { openApi, IAPI } from './openApi';
type Formatted = number | string;
type T = Formatted;

/**
 * 微信处理类
 */
@Provide()
export class wxUtil {
  @Logger('wechat')
  logger: ILogger;
  /**
   * 占位符替换
   * @param str 替换的字符串
   * @param values 替换的值
   * @returns string
   */
  public formatString(str: string, ...values: (T | FormatObject<T>)[]): string {
    try {
      return new LocalizedStrings({ en: {} })
        .formatString(str, ...values)
        .toString();
    } catch (error) {
      return error;
    }
    // const localizedStrings: IStrings = new LocalizedStrings({ en: {} });
    // console.log(localizedStrings.formatString(str, ...values).toString());
  }

  /**
   * 占位符替换
   * @param key 替换的字符串
   * @param values 替换的值
   * @returns string
   */
  formatOpenApi(key: IAPI, ...values: (T | FormatObject<T>)[]) {
    return this.formatString(openApi[key], ...values);
  }

  /**
   * 获取值
   * @param key IAPI
   * @returns
   */
  getOpenApi(key: IAPI) {
    return openApi[key];
  }

  /**
   * 处理请求数据
   * @param response 请求数据
   * @param url 请求链接
   * @param errMsg 自定义错误信息
   * @returns
   */
  httpServiceResponse(response, url: string, errMsg?: string) {
    if (response && response.data) {
      this.logger.info('微信接口: ', url, response.data);
      return response.data;
    } else {
      this.logger.error('微信接口' + errMsg + ': ' + response.data);
      return new Error(response.data);
    }
  }
}
