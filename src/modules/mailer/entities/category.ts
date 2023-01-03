import { Column } from 'typeorm';
import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from './../../../global/entity/baseEntity';

/**
 * 邮箱类型
 */
@EntityModel('mailer_category')
export class MailerCategory extends BaseEntity {
  @Column({ comment: '发信邮箱服务商', unique: true })
  host: string;

  @Column({ comment: '备注', nullable: true })
  remark?: string;

  auth?: {
    user: string;
    pass: string;
  };

  @Column({
    type: 'boolean',
    comment: '使用 SSL, 状态，0－不使用，1－使用',
    nullable: true,
  })
  secure?: boolean;

  @Column({ comment: 'SMTP 端口' })
  port?: number;

  @Column({ comment: '状态，0－无效，1－有效', nullable: true })
  status?: number;
}
