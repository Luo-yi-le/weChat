import { Provide } from '@midwayjs/decorator';
/**
 * 微信消息处理
 */
@Provide()
export class CoreMessage {
  public async formatMessage(xmlObjext: any) {
    let msg = {};
    if (typeof xmlObjext === 'object') {
      for (let attr in xmlObjext.xml) {
        msg[attr] = xmlObjext.xml[attr][0];
      }
    }
    return msg;
  }

  public async formTextMessage(msg: any, content = '') {
    const reponse = `
    <xml>
        <ToUserName><![CDATA[${msg.FromUserName}]]></ToUserName>
        <FromUserName><![CDATA[${msg.ToUserName}]]></FromUserName>
        <CreateTime>${new Date().getTime()}</CreateTime>
        <MsgType><![CDATA[text]]></MsgType>
        <Content><![CDATA[${content}]]></Content>
    </xml>
    `;

    return reponse;
  }
}
