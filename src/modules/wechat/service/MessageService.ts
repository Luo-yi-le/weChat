import { Inject, Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { Context } from '@midwayjs/koa';
import { WXMessageEntity } from '../entities/message';
import { WXUser } from '../entities/user';
import { WeChatAPI } from '../api/index';
import { CoreMessage } from '../core/message/coreMessage';
import { XMLHelper, Context as XMLContext } from './../core/xml/xmlHelper';
import { UserService } from './UserService';
import { CacheManager } from '@midwayjs/cache';

import {
  WX_MESSAGE_TYPE,
  WX_MESSAGE_TYPE_NAME,
  WX_MESSAGE_EVENT,
} from './../../../global/enum/wxEnum';

/**
 * 微信消息处理
 */
@Provide()
export class MessageService extends WeChatAPI {
  @Inject()
  ctx: Context;

  @Inject()
  cacheManager: CacheManager;

  @Inject()
  coreMessage: CoreMessage;

  @Inject()
  xmlHelper: XMLHelper;

  @Inject()
  userService: UserService;

  @InjectEntityModel(WXMessageEntity)
  wxMessageEntity: Repository<WXMessageEntity>;

  xmlPars: XMLContext;

  /**
   * 消息入口处理
   * @param message
   */
  async start(message: any, openid?: string) {
    const { xml } = await this.xmlHelper.parse(message, {
      trim: true,
    });
    this.xmlPars = xml;
    const msg: WXMessageEntity = Object.assign({}, this.xmlPars, {
      openid,
      name: WX_MESSAGE_TYPE_NAME[this.xmlPars.MsgType[0]],
    });

    const wxuser: WXUser = await this.fetchUserInfo(msg.FromUserName);
    if (wxuser && wxuser?.openid) {
      await this.userService.addWXUser(wxuser);
    }
    await this.wxMessageEntity.save(msg);
    if (this[this.xmlPars.MsgType[0]]) {
      return await this[this.xmlPars.MsgType[0]](this.xmlPars);
    }
    return await this.coreMessage.formTextMessage(this.xmlPars, '测试自动回复');
  }

  async add(message: WXMessageEntity) {
    await this.wxMessageEntity.save(message);
    return message.id;
  }

  async [WX_MESSAGE_TYPE.LINK]() {}
  async [WX_MESSAGE_TYPE.IMAGE]() {}
  async [WX_MESSAGE_TYPE.LOCATION]() {}
  async [WX_MESSAGE_TYPE.SHORTVIDEO]() {}
  async [WX_MESSAGE_TYPE.VIDEO]() {}
  async [WX_MESSAGE_TYPE.VOICE]() {}

  /**
   * 文本消息
   * @param message XMLContext
   * @returns
   */
  async [WX_MESSAGE_TYPE.TEXT](message: XMLContext) {
    const Content = await this.cacheManager.get(
      `wechat:verify:qrcode:${message.Content}`
    );
    if (message.Content == Content) {
      return await this.coreMessage.formTextMessage(
        message,
        '测试验证码缓存是否正常 ' + `wechat:verify:qrcode:${message.Content}`
      );
    } else {
      return await this.coreMessage.formTextMessage(
        message,
        '自动回复文本消息: ' + message.Content
      );
    }
  }

  /**
   * 消息事件
   * @param xmlPars 消息
   * @returns
   */
  async [WX_MESSAGE_TYPE.EVENT](xmlPars: XMLContext) {
    let tempalte = null;
    if (this[WX_MESSAGE_EVENT[xmlPars.Event]]) {
      tempalte = await this[xmlPars.Event](xmlPars);
    }
    return tempalte;
  }

  /**
   * 关注
   * @param message
   */
  async [WX_MESSAGE_EVENT.SUBSCRIBE](message: XMLContext) {
    return `
      <xml>
          <ToUserName><![CDATA[${message.FromUserName}]]></ToUserName>
          <FromUserName><![CDATA[${message.ToUserName}]]></FromUserName>
          <CreateTime>${new Date().getTime()}</CreateTime>
          <MsgType><![CDATA[text]]></MsgType>
          <Content><![CDATA[后台回复 [首页]: 进入电影首页~\n后台回复 [登录]: 进行微信登录绑定~\n后台回复 [游戏]: 进入游戏页面~\n后台回复 [电影名字]: 查询电影信息~\n后台回复 [语音]: 查询电影信息~\n也可以点击 <a href="http://www.baidu.com">  语音查电影</a>\n]]></Content>
      </xml>
    `;
  }

  /**
   * 取消关注
   * @param message
   */
  async [WX_MESSAGE_EVENT.UNSUBSCRIBE](message: XMLContext) {
    return `
    <xml>
        <ToUserName><![CDATA[${message.FromUserName}]]></ToUserName>
        <FromUserName><![CDATA[${message.ToUserName}]]></FromUserName>
        <CreateTime>${new Date().getTime()}</CreateTime>
        <MsgType><![CDATA[text]]></MsgType>
        <Content><![CDATA[]]></Content>
    </xml>
    `;
  }

  /**
   * 点击事件
   * @param message
   */
  async [WX_MESSAGE_EVENT.CLICK](message: XMLContext) {}
  async [WX_MESSAGE_EVENT.LOCATION](message: XMLContext) {}

  /**
   * 扫码
   * 用户已关注时的事件推送
   * @param message
   */
  async [WX_MESSAGE_EVENT.SCAN](message: XMLContext) {
    const number = new Date().getTime().toString().substr(7, 13);
    if (message.EventKey == '658801') {
      // eslint-disable-next-line prettier/prettier
      await this.cacheManager.set(`wechat:verify:qrcode:${number}`, number, { ttl: 60 * 5 });
      return `
        <xml>
            <ToUserName><![CDATA[${message.FromUserName}]]></ToUserName>
            <FromUserName><![CDATA[${message.ToUserName}]]></FromUserName>
            <CreateTime>${new Date().getTime()}</CreateTime>
            <MsgType><![CDATA[text]]></MsgType>
            <Content><![CDATA[您的登录验证码是:${number}，5分钟内有效]]></Content>
        </xml>
        `;
    }
  }
}
