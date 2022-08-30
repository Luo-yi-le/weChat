import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { EventSubscriberModel } from '@midwayjs/orm';
import { BaseEntity } from './../entity/baseEntity';
/**
 * 订阅者
 */
@EventSubscriberModel()
export class BaseEntitySubscriber
  implements EntitySubscriberInterface<BaseEntity>
{
  /**
   * 在实体插入之前调用。
   */
  async beforeInsert(event: InsertEvent<BaseEntity>) {
    event.entity.createTime = new Date();
    event.entity.updateTime = new Date();
  }

  async beforeUpdate(event: UpdateEvent<BaseEntity>) {
    event.entity.updateTime = new Date();
  }
}
