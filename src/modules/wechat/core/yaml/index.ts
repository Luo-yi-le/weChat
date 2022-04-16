import * as Yaml from 'yaml';
import * as fs from 'fs';
import { join } from 'path';
export class MenuCore {
  WxMenuApi: WxMenu | any;
  filePath = './../yaml/wx.config.yml';
  encoding = 'utf8';
  accToken = '';
  constructor(option?: MenuOptions) {
    this.filePath =
      join(__dirname, option.filePath + option.fileName) || this.filePath;
    this.encoding = option.encoding || this.encoding;
  }

  /**
   * 根据yaml 中的key获取对应的值
   * @param key
   * @returns Promise
   */
  async get(key: string): Promise<string | any> {
    return new Promise((resolve, reject) => {
      try {
        const yYaml = fs.readFileSync(this.filePath, 'utf8');
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
  filePath?: string;
  fileName?: string;
  encoding?: BufferEncoding;
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
