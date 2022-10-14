import { Column } from 'typeorm';
import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from './../../../global/entity/baseEntity';
import { WX_MESSAGE_TYPE } from './../../../global/enum/wxEnum';
/**
 * 微信公众号消息
 */
@EntityModel('wechat_message')
export class WXMessageEntity extends BaseEntity {
  @Column({ comment: 'openid' })
  openid?: string;

  @Column({ comment: '微信消息id，64位整型', default: '' })
  MsgId?: string;

  @Column({ comment: '微信消息事件', default: '' })
  event?: string;

  @Column({ comment: '微信消息事件标识', default: '' })
  eventKey?: string;

  // eslint-disable-next-line prettier/prettier
  @Column({ comment: '消息类型',type: 'enum', enum: WX_MESSAGE_TYPE, default: WX_MESSAGE_TYPE.TEXT })
  MsgType?: WX_MESSAGE_TYPE;

  @Column({ comment: '发送方帐号（一个OpenID）', default: '' })
  FromUserName?: string;

  @Column({ comment: '开发者微信号', default: '' })
  ToUserName?: string;

  @Column({ comment: '文本消息内容', default: '' })
  Content?: string;

  @Column({ comment: '消息的数据ID（消息如果来自文章时才有）', default: '' })
  MsgDataId?: string;

  // eslint-disable-next-line prettier/prettier
  @Column({ comment: '多图文时第几篇文章，从1开始（消息如果来自文章时才有）', default: '' })
  Idx?: string;

  @Column({ comment: '图片链接（由系统生成）', default: '' })
  PicUrl?: string;

  // eslint-disable-next-line prettier/prettier
  @Column({ comment: '图片、语音、视频消息媒体id，可以调用获取临时素材接口拉取数据。', default: '' })
  MediaId?: string;

  @Column({ comment: '语音格式，如amr，speex等', default: '' })
  Format?: string;

  @Column({ comment: '语音识别结果，UTF8编码', default: '' })
  Recognition?: string;

  // eslint-disable-next-line prettier/prettier
  @Column({ comment: '视频消息缩略图的媒体id，可以调用多媒体文件下载接口拉取数据。', default: '' })
  ThumbMediaId?: string;

  @Column({ comment: '地理位置纬度', default: '' })
  Location_X?: string;

  @Column({ comment: '地理位置经度', default: '' })
  Location_Y?: string;

  @Column({ comment: '地图缩放大小', default: '' })
  Scale?: string;

  @Column({ comment: '地理位置信息', default: '' })
  Label?: string;

  @Column({ comment: '消息标题', default: '' })
  Title?: string;

  @Column({ comment: '消息描述', default: '' })
  Description?: string;

  @Column({ comment: '消息链接', default: '' })
  Url?: string;
}
