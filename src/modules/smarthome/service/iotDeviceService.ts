import { Inject, Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { BaseService } from '@cool-midway/core';
import { Repository } from 'typeorm';
import { IoTDevice } from '../entities/iotDevice';
import * as _ from 'lodash';
import { Context } from '@midwayjs/koa';

/**
 * 设备
 */
@Provide()
export class IotDeviceService  extends BaseService{
  @InjectEntityModel(IoTDevice)
  ioTCategory: Repository<IoTDevice>;

  @Inject()
  ctx: Context;
}
