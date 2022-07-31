// import { Rule, RuleType } from '@midwayjs/validate';
import { Rule, ColumnRule } from './../../../annotation/Rule';

/**
 * 登录参数校验
 */
export class AccountDTO {
  // 用户名
  @Rule(ColumnRule.Required('string', true, '用户名'))
  appSecret: string;

  // 密码
  @Rule(ColumnRule.Required('string', true, '密码'))
  password: string;

  // 验证码ID
  @Rule(ColumnRule.Required('string', true, '密码'))
  captchaId: string;

  // 验证码
  @Rule(ColumnRule.Required('string', true, '验证码'))
  verifyCode: number;
}
