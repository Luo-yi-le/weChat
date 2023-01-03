import { Inject, Provide } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { WeChatAPI } from '../api/index';
import { WXFunsEntity } from './../entities/funs';
import { WX_SUBSCRIBE_SCENE, GENDER_TYPE } from './../../../global/enum/wxEnum';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';

/**
 * 微信粉丝请求处理逻辑
 */
@Provide()
export class FunsService extends WeChatAPI {
  @Inject()
  ctx: Context;

  @InjectEntityModel(WXFunsEntity)
  wxFunsEntity: Repository<WXFunsEntity>;

  async getFuncs(next_openid = '') {
    let result = null;
    const res = await this.getFuns(next_openid);
    if (res.total > 0) {
      if (res.count > 0 && res.total >= res.count) {
        const userlist = [];
        res?.data?.openid?.forEach((item: any) => {
          userlist.push({ openid: item, lang: 'zh_CN' });
        });
        const user_list = await this.fetchUserInfoList({
          user_list: userlist,
        });
        // console.log(user_list);
        const user_info_list: WXFunsEntity[] = user_list.user_info_list;
        result = await this.addWXFuncs(user_info_list);
      } else {
        await this.getFuncs(res.next_openid);
      }
    }

    return result;
  }

  async addWXFuncs(userList: WXFunsEntity[]) {
    // const exists = await this.wxFunsEntity.findOne({
    //   openid: user.openid,
    // });
    userList.forEach(user => {
      user.subscribe_scene = user.subscribe
        ? WX_SUBSCRIBE_SCENE[user.subscribe_scene]
        : WX_SUBSCRIBE_SCENE.CANCEL_SCENE;

      user.sex = GENDER_TYPE[user.sex];
    });
    let result = null;
    result = await this.wxFunsEntity.save(userList, { reload: false });
    this.wechatLogger.info('添加或者更新微信粉丝：', result);
    return result;
  }
}
