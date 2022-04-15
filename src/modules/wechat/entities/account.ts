import { Column, Index, Generated, PrimaryGeneratedColumn } from 'typeorm';
import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from './../../../global/entity/baseEntity';

/**
 * 微信公众号账号
 */
@EntityModel('wechat_account')
export class WXAccount extends BaseEntity {
  @Column({ comment: '用户token' })
  accessToken: string;

  @Column({ comment: '公众号App-Secret' })
  appSecret: string;

  @Column({ comment: '公众号微信号' })
  accountWeixin: string;

  @Column({ comment: '微信公众账号原始ID' })
  appId: string;

  @Column({ comment: '公众号类型，1－服务号，2－订阅号，3－企业号' })
  accountType: string;

  @Column({ comment: ' 描述' })
  accountDesc: string;

  @Column({ comment: '公众号的原始ID' })
  originalId: string;

  @Column({ comment: '状态，0－无效，1－有效' })
  status: string;

  @Column({ comment: '是否认证，0－未认证，1－已认证' })
  isFlag: string;
}
