import { Inject, Provide } from '@midwayjs/decorator';
import { BaseService, CoolCommException } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { WXAccount } from '../entities/account';
import * as _ from 'lodash';
import { Context } from '@midwayjs/koa';
import { Validate } from '@midwayjs/validate';
import { YAML } from './../core/yaml';
/**
 * 微信公众号账号
 */
@Provide()
export class WXAccountService extends BaseService {
  @InjectEntityModel(WXAccount)
  wxAccount: Repository<WXAccount>;

  @Inject()
  ctx: Context;

  yaml: YAML = new YAML({
    fileName: 'wx.config.yml',
    filePath: './',
    encoding: 'utf8',
  });

  /**
   * 更新appSecret
   */
  public async updateAppSecret(param) {
    if (param.id && param.username === 'admin') {
      throw new CoolCommException('非法操作~');
    }
    const account = await this.wxAccount.findOne({ id: param.id });
    if (!account) {
      throw new CoolCommException('公众号不存在');
    }
    param.id = this.ctx.WXAccount.id;
    await this.wxAccount.save(param);
  }

  /**
   * 新增公众号
   * @param account WXAccount
   */
  @Validate()
  async add(account: WXAccount) {
    // return await this.yaml.get('accToken', 'aaaaaasddadasd', '44444444444');
    const exists = await this.wxAccount.findOne({
      appSecret: account.appSecret,
      appId: account.appId,
      originalId: account.originalId,
    });
    if (!_.isEmpty(exists)) {
      return '公众号[' + account.name + ']已经存在~';
    }
    await this.wxAccount.save(account);
    return account.id;
  }

  async delete(ids: string | number[]) {
    let idArr: any[] = [];
    if (ids instanceof Array) {
      idArr = ids;
    } else {
      idArr = ids.split(',');
    }
    for (const id of idArr) {
      const account = await this.wxAccount.findOne({ id });
      if (!_.isEmpty(account)) {
        throw new CoolCommException('公众号不存在');
      }
      await this.wxAccount.delete({ id });
    }
  }
}
