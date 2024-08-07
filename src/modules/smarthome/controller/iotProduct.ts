import { Inject, Provide } from '@midwayjs/decorator';
import { BaseController, CoolController } from '@cool-midway/core';
import { IoTProduct } from '../entities/iotProduct';
import { IotProductService } from '../service/iotProductServicey';

/**
 *
 */
@Provide()
@CoolController({
  api: ['list', 'add', 'delete', 'update', 'page', 'info'],
  entity: IoTProduct,
  service: IotProductService,
})
export class IotCategoryController extends BaseController {
  @Inject()
  iotCategory: IoTProduct;
}
