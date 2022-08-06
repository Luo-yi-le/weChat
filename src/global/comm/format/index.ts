import { Provide } from '@midwayjs/decorator';
import LocalizedStrings, { LocalizedStringsMethods } from 'localized-strings';
type IStrings = LocalizedStringsMethods;
type Formatted = number | string;
type FormatObject<U extends Formatted> = { [key: string]: U };
type T = Formatted;
/**
 * 格式化类
 */
@Provide()
export class Format {
  /**
   * 占位符替换
   * @param str 替换的字符串
   * @param values 替换的值
   * @returns string
   */
  formatString(
    str: string,
    ...values: (T | FormatObject<T>)[]
  ): Array<string | T> | string {
    const localizedStrings: IStrings = new LocalizedStrings({ en: {} });
    // console.log(localizedStrings.formatString(str, ...values).toString());
    return localizedStrings.formatString(str, ...values).toString();
  }
}
