import { Inject, Post, Provide } from '@midwayjs/decorator';
import { BaseController, CoolController } from '@cool-midway/core';
import { FunsService } from '../../service/funsService';
import { WXFunsEntity } from '../../entities/funs';

/**
 * 微信菜单
 */
@Provide()
@CoolController({
  api: ['list', 'page'],
  entity: WXFunsEntity,
  service: FunsService,
})
export class FunsController extends BaseController {
  @Inject()
  funsService: FunsService;

  @Post('/getFuns', { summary: '获取粉丝' })
  async getFuns() {
    return this.ok(await this.funsService.getFuncs());
  }
}
