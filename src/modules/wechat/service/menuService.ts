import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { WXMenuEntity } from './../entities/menu';
import * as _ from 'lodash';
// import { Context } from '@midwayjs/koa';
import { Button } from './../entities/button';
import { WeChatAPI } from '../api/index';

/**
 * 微信公众号菜单
 */
@Provide()
export class WXMenuService extends WeChatAPI {
  @InjectEntityModel(WXMenuEntity)
  wxMenuEntity: Repository<WXMenuEntity>;

  /**
   * 如果有id 并 sub_button为空
   * 如果有id 并 sub_button不为空
   * 如果无id 并 sub_button不为空
   * @param button
   * @returns
   */
  public async saveOrUpdateMenu(button: Button[]) {
    button.forEach(async (item: Button) => {
      if (item?.id && !item?.sub_button.length) {
        delete item?.sub_button;
        await this.updateMenu(item);
      } else if (item?.id && item?.sub_button.length) {
        item?.sub_button.forEach(async (sub_item: Button) => {
          if (sub_item.id) {
            await this.updateMenu(sub_item);
          } else {
            sub_item.parentId = item.id;
            const res = await this.wxMenuEntity.save(sub_item);
            this.wechatLogger.info('保存菜单：', res);
          }
        });
      } else if (!item?.id && item?.sub_button.length) {
        const sub_button = _.cloneDeep(item?.sub_button);
        delete item?.sub_button;
        const menu = await this.wxMenuEntity.save(item);
        sub_button.forEach(async (sub_item: Button) => {
          sub_item.parentId = menu.id;
          const res = await this.wxMenuEntity.save(sub_item);
          this.wechatLogger.info('保存菜单：', res);
        });
      }
    });
    return button;
  }

  public async submitMenuToWeChat() {
    let button = [];
    const menu: any[] = await this.list();
    menu.forEach((b, bindex) => {
      button.push({
        name: b.name,
        sub_button: [],
      });
      if (b?.sub_button && b?.sub_button.length) {
        b?.sub_button.forEach(sub_button => {
          switch (sub_button.type) {
            case 'click':
              button[bindex].sub_button.push({
                type: sub_button.type,
                name: sub_button.name,
                key: sub_button.key,
              });
              break;
            case 'view':
              button[bindex].sub_button.push({
                type: sub_button.type,
                name: sub_button.name,
                url: sub_button.url,
              });
              break;
            case 'miniprogram':
              button[bindex].sub_button.push({
                type: sub_button.type,
                name: sub_button.name,
                url: '',
                appid: sub_button.appid,
                pagepath: sub_button.pagepath,
              });
              break;
          }
        });
      } else {
        delete button[bindex].sub_button;
        switch (b.type) {
          case 'click':
            button[bindex] = Object.assign({}, button[bindex], {
              type: b.type,
              key: b.key,
            });
            break;
          case 'view':
            button[bindex] = Object.assign({}, button[bindex], {
              type: b.type,
              url: b.url,
            });
            break;
          case 'miniprogram':
            button[bindex] = Object.assign({}, button[bindex], {
              type: b.type,
              url: '',
              appid: b.appid,
              pagepath: b.pagepath,
            });
            break;
        }
      }
    });
    const res = await this.createDefineMenu({ button: button });
    return res;
  }
  public async updateMenu(button: Button) {
    const findOne = await this.wxMenuEntity.findOne({ id: button.id });
    // eslint-disable-next-line prettier/prettier
    const res = await this.wxMenuEntity.update(button.id, Object.assign({}, findOne, button));
    this.wechatLogger.info('更新菜单：', res);
    return res;
  }

  public async selectParentId(parentId: any) {
    // eslint-disable-next-line prettier/prettier
    return await this.wxMenuEntity.find({ parentId }) || [];
  }

  public async list(): Promise<any> {
    // eslint-disable-next-line prettier/prettier
    const menu: WXMenuEntity[] = await this.nativeQuery('SELECT a.* FROM wechat_menu a where a.parentId IS NULL ORDER BY a.treeSort ASC');
    if (!menu.length) return [];
    menu.forEach(async item => {
      const res = await this.setMenu(item);
      item['sub_button'] = res || [];
    });
    const promise = new Promise((resolve, reject) => {
      menu.forEach((item, index) => {
        this.setMenu(item)
          .then(res => {
            menu[index]['sub_button'] = res || [];
            resolve(menu);
          })
          .catch(error => {
            reject(error);
          });
      });
    });
    return promise;
  }

  async setMenu(item) {
    const menuParen = await this.selectParentId(item.id);
    return menuParen;
  }
}
