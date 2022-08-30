import { Column, Index, Generated, PrimaryGeneratedColumn } from 'typeorm';
import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from './../../../global/entity/baseEntity';
/**
 * 微信公众号菜单
 */
@EntityModel('wechat_menu')
export class WXMenuEntity extends BaseEntity {
  @Column({ comment: '父级Id', nullable: true })
  parentId?: string;

  @Column({ comment: '菜单级别', nullable: true })
  treeLevel?: string;

  @Column({ comment: '本集排序（升序）', nullable: true })
  treeSort?: number;

  @Column({ comment: '菜单类型', nullable: true })
  type?: string;

  @Column({ comment: '菜单关键字', nullable: true })
  @Generated('uuid')
  key?: string;

  @Column({ comment: '网页链接', nullable: true })
  url?: string;

  @Column({ comment: '永久素材id', nullable: true })
  mediaId?: string;

  @Column({ comment: '永久素材类型', nullable: true })
  mediaType?: string;

  @Column({ comment: '小程序的appid', nullable: true })
  appid?: string;

  @Column({ comment: '小程序的页面路径', nullable: true })
  pagepath?: string;

  @Column({ comment: '是否受保护', nullable: true })
  protectable?: string;

  @Column({ comment: '文字', type: 'longtext', nullable: true })
  content?: string;

  @Column({ comment: '状态', nullable: true })
  status?: string;
}
