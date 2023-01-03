import { Inject, Provide } from '@midwayjs/decorator';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { MailerAdmin } from '../entities/adminMail';
import { Context } from '@midwayjs/koa';

/**
 * 管理员邮箱账号
 */
@Provide()
export class MailerAdminService extends BaseService {
  @InjectEntityModel(MailerAdmin)
  mailerAdmin: Repository<MailerAdmin>;

  @Inject()
  ctx: Context;
}
