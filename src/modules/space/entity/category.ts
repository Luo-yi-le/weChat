import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from '../../../global/entity/baseEntity';
import { Column, OneToMany } from 'typeorm';
import { SpaceFileEntity } from './file';

/**
 * 图片空间信息分类
 */
@EntityModel('space_category')
export class SpaceCategoryEntity extends BaseEntity {
  @Column({ comment: '类别名称' })
  name: string;

  @Column({ comment: '父分类ID', type: 'tinyint', nullable: true })
  parentId: number;

  @Column({ default: 0 })
  isDelete: number;

  @Column({ nullable: true })
  desc: string;

  @Column()
  code: string;

  @OneToMany(type => SpaceFileEntity, file => file.category)
  files: SpaceFileEntity[];
}
