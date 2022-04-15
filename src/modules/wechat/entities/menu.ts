import { Column, Index, Generated, PrimaryGeneratedColumn } from 'typeorm';
import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from './../../../global/entity/baseEntity';
/**
 * 微信公众号菜单
 */
@EntityModel('wechat_menu')
export class WXMenuEntity extends BaseEntity {
  @Column({ comment: '父级Id' })
  parentId: string;

  @Column({ comment: '菜单级别', default: '0' })
  treeLevel: string;

  @Column({ comment: '本集排序（升序）' })
  treeSort: number;

  @Column({ comment: '菜单类型' })
  menuType: string;

  @Column({ comment: '菜单关键字' })
  menuKey: string;

  @Column({ comment: '网页链接' })
  url: string;

  @Column({ comment: '永久素材id' })
  mediaId: string;

  @Column({ comment: '永久素材类型' })
  mediaType: string;

  @Column({ comment: '小程序的appid' })
  appid: string;

  @Column({ comment: '小程序的页面路径' })
  pagepath: string;

  @Column({ comment: '是否受保护' })
  protectable: string;

  @Column({ comment: '文字', type: 'longtext' })
  content: string;

  @Column({ comment: '状态' })
  status: string;
}
