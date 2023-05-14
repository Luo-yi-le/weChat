import { Inject, Provide } from '@midwayjs/decorator';
import { CoolController } from '@cool-midway/core';
import { MailerUser } from '../../entities/userMail';
import { MailerUserService } from '../../service/mailerUserService';
import { BaseController } from '../../../../global/controller/BaseController';

/**
 * 用户邮箱账号
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'list', 'page', 'info'],
  entity: MailerUser,
  service: MailerUserService,
})
export class MailerUserController extends BaseController {
  @Inject()
  mailerUserService: MailerUserService;
}
