import { Inject, Provide } from '@midwayjs/decorator';
import { BaseController, CoolController } from '@cool-midway/core';
import { MailerAdmin } from '../../entities/adminMail';
import { MailerAdminService } from '../../service/mailerAdminService';

/**
 * 管理员邮箱账号
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'list', 'page'],
  entity: MailerAdmin,
  service: MailerAdminService,
})
export class MailerAdminController extends BaseController {
  @Inject()
  mailerAdminService: MailerAdminService;
}
