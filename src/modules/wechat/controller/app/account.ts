import {
  ALL,
  Body,
  Get,
  Inject,
  Post,
  Provide,
  Query,
} from '@midwayjs/decorator';
import { BaseController, CoolController } from '@cool-midway/core';
import { WXAccount } from '../../entities/account';
import { WXAccountService } from '../../service/accountService';

/**
 * 菜单
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update'],
  entity: WXAccount,
  service: WXAccountService,
})
export class WXAccountAccount extends BaseController {
  @Inject()
  wxAccountService: WXAccountService;

  /**
   * 修改公众号
   */
  @Post('/updateAppSecret', { summary: '修改公众号' })
  async updateAppSecret(@Body(ALL) Account: WXAccount) {
    await this.wxAccountService.updateAppSecret(Account);
    return this.ok();
  }
}
