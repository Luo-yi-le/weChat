import { Column, TreeChildren,Tree, TreeParent, TreeLevelColumn  } from 'typeorm';
import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from '../../../global/entity/baseEntity';

/**
 * 分类
 */
@EntityModel('iot_category')
@Tree("closure-table")
export class IoTCategory extends BaseEntity {
    @Column({
        comment: '是否系统通用（0-否，1-是）',
        default: 0,
        type: 'tinyint',
    })
    is_sys: number;

    @Column({ comment: '父菜单ID', type: 'bigint', nullable: true })
    parent_id: number;

    @TreeChildren()
    children: IoTCategory;

    @TreeParent()
    parent: IoTCategory;

    @TreeLevelColumn()
    level: number;
}