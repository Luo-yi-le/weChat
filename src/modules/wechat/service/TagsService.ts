import { Inject, Provide, App } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { WeChatAPI } from '../api/index';
import { WXTagsEntity } from '../entities/tags';
import { InjectEntityModel } from '@midwayjs/orm';
import { getConnection, Repository, In } from 'typeorm';
import { IMidwayApplication } from '@midwayjs/core';
import { WXFunsEntity } from './../entities/funs';

/**
 * 微信标签请求处理逻辑
 */
@Provide()
export class TagsService extends WeChatAPI {
  @Inject()
  ctx: Context;

  @InjectEntityModel(WXFunsEntity)
  wxFunsEntity: Repository<WXFunsEntity>;

  @App()
  apptttt: IMidwayApplication;

  @InjectEntityModel(WXTagsEntity)
  wxTagsEntity: Repository<WXTagsEntity>;

  async getWxTags() {
    let tagsList: WXTagsEntity[] = (await this.getTags()).tags,
      result = null;
    if (tagsList.length) {
      result = await this.wxTagsEntity.save(tagsList);
    }
    this.wechatLogger.info('%s %j', '更新微信粉丝标签：', result);
    return result;
  }

  async createWxTags(tags: WXTagsEntity) {
    await this.getWxTags();
    if (!tags.name) {
      return this.CoolCommException('标签名不能为空');
    }
    const tag = await this.wxTagsEntity.findOne({ name: tags.name });
    if (tag) {
      return this.CoolCommException(`标签名【${tags.name}】已存在`);
    }
    const data = {
      tag: { ...tags },
    };
    const wxTags = await this.createTags(data);
    const result = await this.wxTagsEntity.save(wxTags.tag);
    this.wechatLogger.info('%s %j', '添加微信粉丝标签：', result);
    return result;
  }

  async updateWxTags(tags: WXTagsEntity) {
    let result = null;
    await this.getWxTags();
    if (!tags.name && !tags.id) {
      result = this.CoolCommException('标签参数不完整');
    }
    const tag = await this.wxTagsEntity.findOne({ name: tags.name });
    if (tag) {
      result = this.CoolCommException(`标签名【${tags.name}】已存在`);
    }
    const data = {
      tag: { ...tags },
    };
    const wxTags = await this.updateTags(data);
    if (wxTags.errcode == 0) {
      result = await this.wxTagsEntity.save(tags);
    } else {
      result = this.CoolCommException(wxTags.errmsg);
    }
    this.wechatLogger.info('%s %j', '编辑标签 ', result);
    return result;
  }

  async deleteWXTags(tags: WXTagsEntity) {
    let result = null;
    if (!tags.id) {
      result = this.CoolCommException('请选择标签');
    }
    const tag = await this.wxTagsEntity.findOne({ id: tags.id });
    if (!tag) {
      result = this.CoolCommException('标签不存在');
    }
    const data = {
      tag: { id: tags.id },
    };
    const wxTags = await this.deleteTags(data);
    if (wxTags.errcode == 0) {
      result = await this.wxTagsEntity.delete({ id: tags.id });
    } else {
      result = this.CoolCommException(wxTags.errmsg);
    }
    this.wechatLogger.info('%s %j', '删除标签 ', result);
    return result;
  }

  /**
   * 批量给粉丝打上标签
   * 单个粉丝打上多个标签
   * @param data
   * @returns
   */
  async BatchtagOfTagIdArray({ openid_list, tagid }) {
    let result = null;
    if (!openid_list) {
      return this.CoolCommException('粉丝不能为空');
    }
    if (!tagid) {
      return this.CoolCommException('标签不能为空');
    }
    if (Array.isArray(tagid) && tagid.length > 1) {
      if (openid_list.lenght > 0 && openid_list.lenght < 21) {
        return this.CoolCommException('粉丝不能超过20个');
      }
      Promise.all(
        tagid.map(id => this.Batchtagging({ openid_list, tagid: id }))
      )
        .then(async res => {
          const tidlist = await this.getidlistfoWeChat({
            openid: openid_list[0],
          });
          if (tidlist) {
            result = await this.wxFunsEntity.update(openid_list, {
              tagid_list: tidlist.tagid_list,
            });
            this.wechatLogger.info('单个粉丝打上多个标签', tidlist, result);
          }
        })
        .catch(err => {
          return this.CoolCommException('微信接口失败' + err);
        });
      // result = await getConnection()
      //   .createQueryBuilder()
      //   .update(WXFunsEntity)
      //   .set({ tagid_list: [...tidlist.tagid_list] })
      //   .where({ openid: In(openid_list) })
      //   .execute();
    }
    if (
      typeof tagid == 'number' ||
      (Array.isArray(tagid) && tagid.length == 1)
    ) {
      result = await this.BatchtagOfOpenidListArray({ openid_list, tagid });
    }
    return result;
  }

  /**
   * 批量给粉丝打上标签
   * 多个粉丝打上一个标签
   * @param data
   * @returns
   */
  async BatchtagOfOpenidListArray({ openid_list, tagid }) {
    let result = null;
    await this.Batchtagging({ openid_list, tagid });
    const funsList = await this.wxFunsEntity.findByIds(openid_list);
    funsList.forEach(funs => {
      funs.tagid_list.push(tagid);
      funs.tagid_list = Array.from(new Set(funs.tagid_list));
    });
    result = await this.wxFunsEntity.save(funsList, { reload: false });
    this.wechatLogger.info('多个粉丝打上一个标签');
    return result;
  }

  /**
   * 获取用户身上的标签列表
   * @param data
   * @returns
   */
  async getidlistfoWeChat(data): Promise<any> {
    const res = await this.getidlist(data);
    return res;
  }
}
