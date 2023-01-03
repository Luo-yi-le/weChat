import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from './../../../global/entity/baseEntity';
import { Column, ManyToOne } from 'typeorm';
import { SpaceCategoryEntity } from './category';
/**
 * 图片空间信息分类
 */
@EntityModel('space_file')
export class SpaceFileEntity extends BaseEntity {
  @Column('text', { nullable: false })
  time: string;

  @Column({ nullable: false })
  url: string;

  @ManyToOne(type => SpaceCategoryEntity, category => category.files)
  category: SpaceCategoryEntity;

  @Column({ default: 0 })
  isDelete: number;

  @Column()
  encoding: string;

  @Column()
  size: string;

  @Column()
  destination: string;

  @Column({ default: 0, comment: '服务器类别' })
  serverCategory: number;

  @Column({ default: null, nullable: true, comment: '用户' })
  userName: string;
}
