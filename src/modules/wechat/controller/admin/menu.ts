import { ALL, Body, Inject, Post, Provide } from '@midwayjs/decorator';
import { BaseController, CoolController } from '@cool-midway/core';
import { WXMenuEntity } from '../../entities/menu';
import { WXMenuService } from '../../service/menuService';

/**
 * 微信菜单
 */
@Provide()
@CoolController({
  api: ['list', 'page'],
  entity: WXMenuEntity,
  service: WXMenuService,
})
export class WXMenuController extends BaseController {
  @Inject()
  wxMenuService: WXMenuService;

  /**
   * 新增或者修改菜单
   */
  @Post('/saveOrUpdateMenu', { summary: '新增或者修改菜单' })
  async saveOrUpdateMenu(@Body(ALL) message: any) {
    const res = await this.wxMenuService.saveOrUpdateMenu(message);
    const menu = await this.wxMenuService.submitMenuToWeChat();
    return this.ok({ res, menu });
  }
}
