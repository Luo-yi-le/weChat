import { Column } from 'typeorm';
import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from '../../../global/entity/baseEntity';
import { MailerCategory } from './category';

/**
 * 发邮件记录
 */
@EntityModel('mailer_record')
export class MailerRecord extends BaseEntity {
  category?: MailerCategory;

  @Column({ comment: '发信邮箱账号' })
  from: string;

  @Column({ comment: '收信人邮箱，可以多个' })
  to: string;

  @Column({ comment: '抄送', nullable: true })
  cc?: string;

  @Column({ comment: '密送', nullable: true })
  bcc?: string;

  @Column({ comment: '发送的主题', nullable: true })
  subject?: string;

  @Column({ comment: '发送的text内容', nullable: true })
  text?: string;

  @Column({ comment: '发送的html内容', nullable: true })
  html?: string;

  @Column({ type: 'simple-array', comment: '邮件的附件', nullable: true })
  attachments?: any[];

  @Column({ comment: '备注', nullable: true })
  remark?: string;

  @Column({ comment: '发送状态，0－失败，1－成功', default: 0, nullable: true })
  status?: number;
}
