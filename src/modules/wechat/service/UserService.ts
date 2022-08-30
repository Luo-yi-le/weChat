import { Inject, Provide, Logger } from '@midwayjs/decorator';
import { BaseService, CoolCommException } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { WXUser } from '../entities/user';
import * as _ from 'lodash';
import { Context } from '@midwayjs/koa';
import { Validate } from '@midwayjs/validate';
import { WeChatAPI } from '../api/index';
import { ILogger } from '@midwayjs/logger';

/**
 * 微信公众号用户
 */
@Provide()
export class UserService extends BaseService {
  @InjectEntityModel(WXUser)
  wxUser: Repository<WXUser>;
  @Logger()
  logger: ILogger;

  @Inject()
  ctx: Context;

  @Inject()
  weChatAPI: WeChatAPI;

  async addWXUser(user: WXUser) {
    const exists = await this.wxUser.findOne({
      openid: user.openid,
    });
    let result = null;
    if (exists && exists?.id) {
      result = await this.wxUser.update(exists?.id, user);
      this.logger.info('更新微信用户：', result);
    } else {
      // delete user.createTime;
      // delete user.id;
      // delete user.updateTime;
      result = await this.wxUser.save(user);
    }

    return result;
  }
}
