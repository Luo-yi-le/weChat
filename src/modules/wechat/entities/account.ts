import { Column, Index, Generated, PrimaryGeneratedColumn } from 'typeorm';
import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from './../../../global/entity/baseEntity';
import { Rule, ColumnRule } from './../../../annotation/Rule';

/**
 * 微信公众号账号
 */
@EntityModel('wechat_account')
export class WXAccount extends BaseEntity {
  @Column({ comment: '用户token', default: null })
  accessToken?: string;

  // @Rule(ColumnRule.Required('string', true, '公众号App-Secret不能为空'))
  @Column({ comment: '公众号App-Secret' })
  appSecret?: string;

  @Column({ comment: '公众号微信号', default: null })
  accountWeixin?: string;

  @Column({ comment: '微信公众账号原始ID', default: null })
  appId?: string;

  @Column({
    comment: '公众号类型，1－服务号，2－订阅号，3－企业号',
    default: null,
  })
  accountType?: string;

  @Column({ comment: ' 描述', default: '' })
  accountDesc?: string;

  @Column({ comment: '公众号的原始ID', default: null })
  originalId?: string;

  @Column({ comment: '凭证有效时间，单位：秒', default: '0' })
  expiresIn?: string;

  // @Rule(ColumnRule.Required('string', false))
  @Column({ comment: '状态，0－无效，1－有效', default: null })
  status?: string;

  @Column({ comment: '是否认证，0－未认证，1－已认证', default: null })
  isFlag?: string;
}
