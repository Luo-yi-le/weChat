import { Rule, RuleType } from '@midwayjs/validate';
/**
 * 登录参数校验
 */
export class AccountDTO {
  // 用户名
  @Rule(RuleType.string().required())
  appSecret: string;

  // 密码
  @Rule(RuleType.string().required())
  password: string;

  // 验证码ID
  @Rule(RuleType.string().required())
  captchaId: string;

  // 验证码
  @Rule(RuleType.required())
  verifyCode: number;
}
