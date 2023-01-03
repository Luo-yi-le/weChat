import { Column } from 'typeorm';
import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from '../../../global/entity/baseEntity';

/**
 * 邮箱类型
 */
@EntityModel('mailer_user')
export class MailerUser extends BaseEntity {
  @Column({ comment: '发信邮箱账号' })
  toMail: string;

  @Column({ comment: '发信邮箱服务商', nullable: true })
  service?: string;

  @Column({ comment: '备注', nullable: true })
  remark?: string;

  @Column({ comment: '状态，0－无效，1－有效', nullable: true })
  status?: number;
}
