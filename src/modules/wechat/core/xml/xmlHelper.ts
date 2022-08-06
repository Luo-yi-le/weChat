import { Provide } from '@midwayjs/decorator';

import { parseString, parseStringPromise } from 'xml2js';
import type { convertableToString, ParserOptions } from 'xml2js';
import { WX_MESSAGE_TYPE } from '../../../../global/enum/wxEnum';
/**
 * xml处理
 */
@Provide()
export class XMLHelper {
  xml?: XML;
  context?: Context;
  public parse(
    xmlStr: convertableToString,
    options?: ParserOptions
  ): Promise<XML> {
    return new Promise((resolve, reject) => {
      parseString(xmlStr, options, (err: any, result: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  public async parsePromise(
    xmlStr: convertableToString,
    options?: ParserOptions
  ): Promise<XML> {
    const result = await parseStringPromise(xmlStr, options);
    return result;
  }
}

export interface XML {
  [x: string]: unknown | any;
  xml?: Context;
}

interface Context {
  [x: string]: any;
  ToUserName?: string | any;
  FromUserName?: string | any;
  CreateTime?: string | any;
  MsgType?: WX_MESSAGE_TYPE;
  Content?: string | any;
  MsgId?: string | any;
}
