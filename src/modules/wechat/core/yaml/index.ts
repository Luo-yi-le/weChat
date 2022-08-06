import { Provide, Inject } from '@midwayjs/decorator';
import * as Yaml from 'yaml';
import * as fs from 'fs';
import { join } from 'path';
import { Format } from './../../../../global/comm/format';

type Formatted = number | string;
type FormatObject<U extends Formatted> = { [key: string]: U };
type T = Formatted;

/**
 * yml配置
 */
@Provide()
export class YAML {
  @Inject()
  format: Format;

  WxMenuApi: WxMenu | any;
  filePath = './../yaml/wx.config.yml';

  encoding: BufferEncoding;

  accToken: any;

  constructor(option?: MenuOptions) {
    this.filePath =
      join(__dirname, option.filePath + option.fileName) || this.filePath;
    this.encoding = option.encoding || 'utf8';
  }

  /**
   * 根据yaml 中的key获取对应的值
   * @param key
   * @returns Promise
   */
  async get(
    key: string,
    ...values: (T | FormatObject<T>)[]
  ): Promise<string | any> {
    const yml = await this.value(key);
    const res = this.format.formatString(yml[key], ...values);
    return res;
  }

  public async value(key: string) {
    return new Promise((resolve, reject) => {
      try {
        const yYaml = fs.readFileSync(this.filePath, this.encoding);
        const yml = Yaml.parse(yYaml);
        if (yml && yml[key]) {
          resolve(yml[key]);
        } else {
          reject('无【' + key + '】相关配置');
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  async setConfig(config: MenuOptions) {
    this.filePath =
      join(__dirname, config.filePath + config.fileName) || this.filePath;
    this.encoding = config.encoding || 'utf8';
  }

  /**
   * 测试
   * @returns
   */
  test() {
    try {
      let path = join(__dirname, './wx.config.yml');
      const yYaml = fs.readFileSync(path, 'utf8');
      let yaml = Yaml.parse(yYaml);
      return yaml;
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @deprecated
   * 弃用
   */
  readYaml() {
    try {
      const yYaml = fs.readFileSync(this.filePath, 'utf8');
      let yaml = Yaml.parse(yYaml);
      this.WxMenuApi = yaml['wxMenu'];
      this.accToken = yaml['accToken'];
    } catch (error) {
      console.error(error);
    }
  }

  save() {
    try {
      fs.writeFileSync(this.filePath, Yaml.stringify(this));
    } catch (error) {
      console.error(error);
    }
  }
}

interface MenuOptions {
  filePath: string;
  fileName: string;
  encoding: BufferEncoding;
}
type BufferEncoding =
  | 'ascii'
  | 'utf8'
  | 'utf-8'
  | 'utf16le'
  | 'ucs2'
  | 'ucs-2'
  | 'base64'
  | 'base64url'
  | 'latin1'
  | 'binary'
  | 'hex';

export declare interface WxMenu {
  create: string;
  selfMenu: string;
  delete: string;
  addconditional: string;
  get: string;
}
