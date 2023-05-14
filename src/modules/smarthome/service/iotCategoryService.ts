import { Inject, Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { BaseService } from '@cool-midway/core';
import { Repository } from 'typeorm';
import { IoTCategory } from '../entities/iotCategory';
import * as _ from 'lodash';
import { Context } from '@midwayjs/koa';

/**
 * 分类
 */
@Provide()
export class IotCategoryService  extends BaseService{
  @InjectEntityModel(IoTCategory)
  ioTCategory: Repository<IoTCategory>;

  @Inject()
  ctx: Context;
}
