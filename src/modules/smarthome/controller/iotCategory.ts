import { Inject, Provide } from '@midwayjs/decorator';
import { BaseController, CoolController } from '@cool-midway/core';
import { IoTCategory } from './../entities/iotCategory';
import { IotCategoryService } from './../service/iotCategoryService';

/**
 * 分类
 */
@Provide()
@CoolController({
  api: ['list', 'add', 'delete', 'update', 'page', 'info'],
  entity: IoTCategory,
  service: IotCategoryService,
})
export class IotCategoryController extends BaseController {
  @Inject()
  iotCategory: IoTCategory;
}
