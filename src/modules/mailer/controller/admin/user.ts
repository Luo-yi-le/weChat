import { Inject, Provide } from '@midwayjs/decorator';
import { BaseController, CoolController } from '@cool-midway/core';
import { MailerUser } from '../../entities/userMail';
import { MailerUserService } from '../../service/mailerUserService';

/**
 * 用户邮箱账号
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'list', 'page'],
  entity: MailerUser,
  service: MailerUserService,
})
export class MailerUserController extends BaseController {
  @Inject()
  mailerUserService: MailerUserService;
}
