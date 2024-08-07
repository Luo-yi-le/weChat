import { Inject, Provide } from '@midwayjs/decorator';
import { BaseController, CoolController } from '@cool-midway/core';
import { OtherService } from '../../service/OtherService';

/**
 * 微信其他处理
 */
@Provide()
@CoolController()
export class WXOtherController extends BaseController {
  @Inject()
  otherService: OtherService;
}
