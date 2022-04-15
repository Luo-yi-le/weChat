import * as Yaml from 'yaml';
import * as fs from 'fs';

export class Menu {
  WxMenuApi: WxMenu | any;
  filePath = './../../../../global/yaml/wx.config.yml';
  encoding = 'utf8';
  constructor(option?: MenuOptions) {
    this.filePath = option.filePath || this.filePath;
    this.encoding = option.encoding || this.encoding;
    this.readYaml();
  }

  readYaml() {
    try {
      const wxYaml = fs.readFileSync(this.filePath, 'utf8');
      let reslut = Yaml.parse(wxYaml);
      this.WxMenuApi = reslut['wxMenu'];
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
