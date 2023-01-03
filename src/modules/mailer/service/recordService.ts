import { Inject, Provide } from '@midwayjs/decorator';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { MailerRecord } from '../entities/record';
import { Context } from '@midwayjs/koa';
// eslint-disable-next-line prettier/prettier
import { createTransport, SendMailOptions, MailMessageInfo } from 'nodemailer';
import { MailerCategory } from '../entities/category';
import { MailerAdmin } from '../entities/adminMail';

/**
 * 发送邮件记录
 */
@Provide()
export class MailerRecordService extends BaseService {
  @InjectEntityModel(MailerRecord)
  mailerRecord: Repository<MailerRecord>;

  @InjectEntityModel(MailerAdmin)
  mailerAdmin: Repository<MailerAdmin>;

  @Inject()
  ctx: Context;

  async send(record: MailerRecord) {
    const admin_mail_server = await this.mailerAdmin.findOne({
      toMail: record.from,
    });
    const mailer_record = await this.mailerRecord.save(record);
    const SMTPtOptions: MailerCategory | any = {
      host: record.category.host,
      port: record.category.port,
      secure: record.category.secure ? true : false,
      auth: {
        user: admin_mail_server.toMail,
        pass: admin_mail_server.pass,
      },
      secureConnection: record.category.secure ? true : false,
    };

    const mailOptions: SendMailOptions = {
      from: admin_mail_server.toMail,
      to: record.to,
      bcc: record.bcc,
      cc: record.cc,
      subject: record.subject,
      html: record.html,
    } as MailerRecord;
    return new Promise((resolve, reject) => {
      createTransport(SMTPtOptions).sendMail(
        mailOptions,
        async (err, info: MailMessageInfo) => {
          if (!err) {
            await this.mailerRecord.update(mailer_record.id, { status: 1 });
            resolve('发送成功');
          } else {
            reject(err);
          }
        }
      );
    });
    createTransport(SMTPtOptions).sendMail(
      mailOptions,
      async (err, info: MailMessageInfo) => {
        if (!err) {
          await this.mailerRecord.update(mailer_record.id, { status: 1 });
          return '发送成功';
        } else {
          return err;
        }
      }
    );
  }
}
