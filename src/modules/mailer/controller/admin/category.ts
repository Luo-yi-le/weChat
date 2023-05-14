import { Inject, Post, Provide } from '@midwayjs/decorator';
import { CoolController } from '@cool-midway/core';
import { MailerCategoryService } from '../../service/categoryService';
import { MailerCategory } from '../../entities/category';
import { BaseController } from '../../../../global/controller/BaseController';

/**
 * 邮箱账号分类
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'list', 'info', 'page'],
  entity: MailerCategory,
  service: MailerCategoryService,
})
export class MailerCategoryController extends BaseController {
  @Inject()
  mailerCategoryService: MailerCategoryService;  
}
