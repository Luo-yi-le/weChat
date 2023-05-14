import { Inject, Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { BaseService } from '@cool-midway/core';
import { Repository } from 'typeorm';
import { IoTProduct } from '../entities/iotProduct';
import * as _ from 'lodash';
import { Context } from '@midwayjs/koa';

/**
 * 产品
 */
@Provide()
export class IotProductService  extends BaseService{
  @InjectEntityModel(IoTProduct)
  ioTProduct: Repository<IoTProduct>;

  @Inject()
  ctx: Context;
}
