import { Provide } from '@midwayjs/decorator';
import LocalizedStrings from 'localized-strings';
import { IWeChat } from './../../../global/types/weChat';
import { openApi, IAPI } from './openApi';
type Formatted = number | string;
type T = Formatted;

/**
 * 微信处理类
 */
@Provide()
export class wxUtil {
  IAPI: IAPI;
  /**
   * 占位符替换
   * @param str 替换的字符串
   * @param values 替换的值
   * @returns string
   */
  public formatString(
    str: string,
    ...values: (T | IWeChat.FormatObject<T>)[]
  ): string {
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
  formatOpenApi(key: IAPI, ...values: (T | IWeChat.FormatObject<T>)[]) {
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
}
