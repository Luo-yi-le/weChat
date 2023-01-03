import { Inject, Provide } from '@midwayjs/decorator';
import { BaseController, CoolController } from '@cool-midway/core';
import { WXUser } from '../../entities/user';
import { UserService } from '../../service/UserService';

/**
 * 微信用户
 */
@Provide()
@CoolController({
  api: ['list', 'page'],
  entity: WXUser,
  service: UserService,
})
export class WXUserController extends BaseController {
  @Inject()
  userService: UserService;
}
