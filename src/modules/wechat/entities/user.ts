import { Column } from 'typeorm';
import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from './../../../global/entity/baseEntity';
import { WX_SUBSCRIBE_SCENE } from './../../../global/enum/wxEnum';
/**
 * 微信公众号用户
 */
@EntityModel('wechat_user')
export class WXUser extends BaseEntity {
  @Column({ comment: '用户的标识，对当前公众号唯一' })
  openid?: string;

  @Column({ comment: '用户昵称', nullable: true })
  nickname?: string;

  @Column({ comment: '用户性别', nullable: true })
  sex?: number;

  @Column({ comment: '头像', nullable: true })
  headimgurl?: string;

  // eslint-disable-next-line prettier/prettier
  @Column({ comment: '用户特权信息，json 数组，如微信沃卡用户为（chinaunicom）', nullable: true })
  privilege?: string;

  @Column({ comment: '用户授权的作用域，使用逗号（,）分隔', nullable: true })
  scope?: string;

  // eslint-disable-next-line prettier/prettier
  @Column({ comment: '是否为是否为快照页模式虚拟账号，值为0时是普通用户，1时是虚拟帐号', nullable: true })
  is_snapshotuser?: number;

  // eslint-disable-next-line prettier/prettier
  @Column({ comment: '只有在用户将公众号绑定到微信开放平台帐号后，才会出现该字段。', nullable: true })
  unionid?: string;

  @Column({ comment: '用户的语言，简体中文为zh_CN', nullable: true })
  language?: string;

  @Column({ comment: '城市', nullable: true })
  city?: string;

  @Column({ comment: '省', nullable: true })
  province?: string;

  @Column({ comment: '国家', nullable: true })
  country?: string;

  // eslint-disable-next-line prettier/prettier
  @Column({ comment: '用户是否订阅该公众号标识，值为0时，代表此用户没有关注该公众号，拉取不到其余信息。', nullable: true })
  subscribe?: number;

  // eslint-disable-next-line prettier/prettier
  @Column({ comment: '用户关注时间，为时间戳。如果用户曾多次关注，则取最后关注时间', nullable: true })
  subscribe_time?: string;

  // eslint-disable-next-line prettier/prettier
  @Column({ comment: '公众号运营者对粉丝的备注，公众号运营者可在微信公众平台用户管理界面对粉丝添加备注', nullable: true })
  remark?: string;

  // eslint-disable-next-line prettier/prettier
  @Column({ comment: '用户所在的分组ID（兼容旧的用户分组接口）', nullable: true })
  groupid?: number;

  @Column({
    type: 'simple-array',
    comment: '用户被打上的标签 ID 列表',
    nullable: true,
  })
  tagid_list?: string[];

  @Column({
    comment: '返回用户关注的渠道来源',
    type: 'enum',
    enum: WX_SUBSCRIBE_SCENE,
    default: WX_SUBSCRIBE_SCENE.ADD_SCENE_QR_CODE,
  })
  subscribe_scene?: WX_SUBSCRIBE_SCENE;

  @Column({ comment: '二维码扫码场景（开发者自定义）', nullable: true })
  qr_scene?: number;

  @Column({ comment: '二维码扫码场景描述（开发者自定义）', nullable: true })
  qr_scene_str?: string;
}
