import { Inject, Provide } from '@midwayjs/decorator';
import { BaseController, CoolController } from '@cool-midway/core';
import { MailerCategoryService } from '../../service/categoryService';
import { MailerCategory } from '../../entities/category';

/**
 * 邮箱账号分类
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'list', 'page'],
  entity: MailerCategory,
  service: MailerCategoryService,
})
export class MailerCategoryController extends BaseController {
  @Inject()
  mailerCategoryService: MailerCategoryService;
}
