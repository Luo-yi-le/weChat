import { Provide } from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { SpaceCategoryEntity } from '../../entity/category';

/**
 * 空间分类
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: SpaceCategoryEntity,
})
export class BaseAppSpaceTypeController extends BaseController {}
