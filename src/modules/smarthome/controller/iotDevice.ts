import { Inject, Provide } from '@midwayjs/decorator';
import { BaseController, CoolController } from '@cool-midway/core';
import { IoTDevice } from '../entities/iotDevice';
import { IotDeviceService } from '../service/iotDeviceService';

/**
 * 分类
 */
@Provide()
@CoolController({
  api: ['list', 'add', 'delete', 'update', 'page', 'info'],
  entity: IoTDevice,
  service: IotDeviceService,
})
export class IoTDeviceController extends BaseController {
  @Inject()
  iotDevice: IoTDevice;
}
