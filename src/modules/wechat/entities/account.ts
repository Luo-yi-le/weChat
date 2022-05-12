import { Column, Index, Generated, PrimaryGeneratedColumn } from 'typeorm';
import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from './../../../global/entity/baseEntity';
import { RuleType } from '@midwayjs/validate';
import { columnRule } from './../../../global/comm/Rule';
import { Rule, ColumnRule } from './../../../annotation/Rule';

ColumnRule.Required('any');
/**
 * 微信公众号账号
 */
@EntityModel('wechat_account')
export class WXAccount extends BaseEntity {
  @Column({ comment: '用户token', default: '' })
  accessToken: string;

  @Rule(ColumnRule.Required('string', true, '公众号App-Secret不能为空'))
  @Column({ comment: '公众号App-Secret' })
  appSecret: string;

  @Rule(
    ColumnRule.Required('string', true, 'accountWeixin公众号微信号不能为空')
  )
  @Column({ comment: '公众号微信号' })
  accountWeixin: string;

  @Rule(ColumnRule.Required('string', true, 'appId 微信公众账号原始ID'))
  @Column({ comment: '微信公众账号原始ID' })
  appId: string;

  @Rule(RuleType.string(), { required: false })
  @Column({ comment: '公众号类型，1－服务号，2－订阅号，3－企业号' })
  accountType: string;

  @Rule(RuleType.string())
  @Column({ comment: ' 描述', default: '' })
  accountDesc: string;

  @Rule(RuleType.string().required())
  @Column({ comment: '公众号的原始ID' })
  originalId: string;

  @Rule(RuleType.string().required())
  @Column({ comment: '状态，0－无效，1－有效' })
  status: string;

  @Rule(RuleType.string().required())
  @Column({ comment: '是否认证，0－未认证，1－已认证' })
  isFlag: string;
}
