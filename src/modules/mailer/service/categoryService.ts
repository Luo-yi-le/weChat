import { Inject, Provide } from '@midwayjs/decorator';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { MailerCategory } from '../entities/category';
import { Context } from '@midwayjs/koa';

/**
 * 邮件类型
 */
@Provide()
export class MailerCategoryService extends BaseService {
  @InjectEntityModel(MailerCategory)
  mailerCategory: Repository<MailerCategory>;

  @Inject()
  ctx: Context;
}
