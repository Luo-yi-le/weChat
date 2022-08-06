import { Inject, Provide, Logger } from '@midwayjs/decorator';
import { BaseService } from '@cool-midway/core';
import { ILogger } from '@midwayjs/logger';
import * as _ from 'lodash';
import { Context } from '@midwayjs/koa';
import { XMLHelper, XML } from './../core/xml/xmlHelper';
import { CoreMessage } from './../core/message/coreMessage';
import { YAML } from './../core/yaml';
import sha1 = require('sha1');
import { MessageService } from './MessageService';
import { WX_MESSAGE_TYPE_NAME } from '../../../global/enum/wxEnum';

@Provide()
export class InteractionService {
  @Logger()
  logger: ILogger;

  @Inject()
  xmlHelper: XMLHelper;
  @Inject()
  messageService: MessageService;

  @Inject()
  coreMessage: CoreMessage;

  yaml: YAML = new YAML({
    fileName: 'wx.config.yml',
    filePath: './',
    encoding: 'utf8',
  });

  public async action(
    signature?: string,
    nonce?: string,
    timestamp?: string,
    echostr?: string,
    openid?: any,
    request?: any,
    response?: any
  ) {
    let config: any;
    let xmlPars: XML;
    let message: string;

    if (!request && !request?.body && !openid) {
      config = {
        wechat: {
          appID: await this.yaml.value('wxAppID'),
          appSecret: await this.yaml.value('wxAppSecret'),
          token: await this.yaml.value('wxToken'),
        },
      };
    } else if (request && request?.body && !signature && openid) {
      xmlPars = await this.xmlHelper.parse(request.body, {
        trim: true,
      });
      this.logger.info('接受微信消息：', request.body);
      await this.messageService.add(
        Object.assign({}, xmlPars.xml, {
          openid,
          name: WX_MESSAGE_TYPE_NAME[xmlPars.xml.MsgType[0]],
        })
      );
      message = await this.coreMessage.formTextMessage(xmlPars.xml, '你好');
      this.logger.info('发送微信消息：', message);
    }
    return new Promise((resolve, reject) => {
      if (request && request?.body && !signature) {
        resolve(message);
      } else {
        const token = config?.wechat?.token;
        const str = [token, timestamp, nonce].sort().join('');
        const sha = sha1(str);
        if (sha === signature) {
          try {
            resolve(echostr + '');
          } catch (error) {
            this.logger.error('微信服务器发起请求异常', error);
          }
        } else {
          reject('wrong');
        }
        this.logger.info('微信服务器发起请求结束----');
      }
    });
  }
}
