import { Inject, Provide } from '@midwayjs/decorator';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { MailerUser } from '../entities/userMail';
import { Context } from '@midwayjs/koa';

/**
 * 用户邮箱账号
 */
@Provide()
export class MailerUserService extends BaseService {
  @InjectEntityModel(MailerUser)
  mailerUser: Repository<MailerUser>;

  @Inject()
  ctx: Context;
}
