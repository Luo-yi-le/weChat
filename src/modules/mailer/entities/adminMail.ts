import { Column } from 'typeorm';
import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from './../../../global/entity/baseEntity';

/**
 * 邮箱类型
 */
@EntityModel('mailer_admin')
export class MailerAdmin extends BaseEntity {
  @Column({ comment: '发信邮箱账号', unique: true })
  toMail: string;

  @Column({ comment: '发信邮箱密码' })
  pass: string;

  auth: {
    user: string;
    pass: string;
  };

  @Column({ comment: '备注', nullable: true })
  remark?: string;

  @Column({ comment: '状态，0－无效，1－有效', nullable: true })
  status?: number;
}
