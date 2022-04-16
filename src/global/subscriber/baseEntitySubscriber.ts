import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
} from 'typeorm';
import { BaseEntity } from './../entity/baseEntity';
/**
 * 订阅者
 */
@EventSubscriber()
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

  async afterInsert(event: InsertEvent<BaseEntity>) {
    console.log(event);
  }
}
