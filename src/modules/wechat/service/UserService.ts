import { Inject, Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { WXUser } from '../entities/user';
import * as _ from 'lodash';
import { Context } from '@midwayjs/koa';
import { WeChatAPI } from '../api/index';
import { WX_SUBSCRIBE_SCENE, GENDER_TYPE } from './../../../global/enum/wxEnum';

/**
 * 微信公众号用户
 */
@Provide()
export class UserService extends WeChatAPI {
  @InjectEntityModel(WXUser)
  wxUser: Repository<WXUser>;

  @Inject()
  ctx: Context;

  async addWXUser(user: WXUser) {
    let result = null;
    user.subscribe_scene = user.subscribe
      ? WX_SUBSCRIBE_SCENE[user.subscribe_scene]
      : WX_SUBSCRIBE_SCENE.CANCEL_SCENE;
    user.sex = GENDER_TYPE[user.sex];
    result = await this.wxUser.save(user, { reload: false });
    this.wechatLogger.info('添加或者更新微信粉丝：', result);

    return result;
  }
}
