import { ALL, Body, Inject, Post, Provide } from '@midwayjs/decorator';
import { BaseController, CoolController } from '@cool-midway/core';
import { WXMessageEntity } from '../../entities/message';
import { MessageService } from '../../service/MessageService';

/**
 * 菜单
 */
@Provide()
@CoolController({
  api: ['list'],
  entity: WXMessageEntity,
  service: MessageService,
})
export class WXMessageController extends BaseController {
  @Inject()
  messageService: MessageService;

  // /**
  //  * 修改公众号
  //  */
  // @Post('/updateAppSecret', { summary: '修改公众号' })
  // async updateAppSecret(@Body(ALL) message: WXMessageEntity) {
  //   // await this.wxAccountService.updateAppSecret(Account);
  //   return this.ok();
  // }
}
