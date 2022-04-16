import { Column, Index, Generated, PrimaryGeneratedColumn } from 'typeorm';
import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from './../../../global/entity/baseEntity';
import { Rule, RuleType } from '@midwayjs/validate';

function error(err) {
  console.log(err);
  return new Error(err + ':' + '不能为空');
}

/**
 * 微信公众号账号
 */
@EntityModel('wechat_account')
export class WXAccount extends BaseEntity {
  @Column({ comment: '用户token', default: '' })
  accessToken: string;

  @Rule(
    RuleType.string()
      .required()
      .error(err => new Error('公众号App-Secret不能为空'))
  )
  @Column({ comment: '公众号App-Secret' })
  appSecret: string;

  @Rule(
    RuleType.string()
      .required()
      .error(err => new Error('accountWeixin 公众号微信号不能为空'))
  )
  @Rule(RuleType.string().required())
  @Column({ comment: '公众号微信号' })
  accountWeixin: string;

  @Rule(RuleType.string().required())
  @Column({ comment: '微信公众账号原始ID' })
  appId: string;

  @Rule(RuleType.string().required())
  @Column({ comment: '公众号类型，1－服务号，2－订阅号，3－企业号' })
  accountType: string;

  @Rule(RuleType.string().required(), { required: false })
  @Column({ comment: ' 描述' })
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
