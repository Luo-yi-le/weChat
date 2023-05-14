import { Inject, Provide, Post, Body, ALL } from '@midwayjs/decorator';
import { CoolController } from '@cool-midway/core';
import { MailerRecordService } from '../../service/recordService';
import { MailerRecord } from '../../entities/record';
import { BaseController } from '../../../../global/controller/BaseController';

/**
 * 发送邮箱记录
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'list', 'page', 'info'],
  entity: MailerRecord,
  service: MailerRecordService,
})
export class MailerRecordController extends BaseController {
  @Inject()
  mailerRecordService: MailerRecordService;

  @Post('/send', { summary: '发送邮件' })
  async send(@Body(ALL) record: MailerRecord) {
    return this.ok(await this.mailerRecordService.send(record));
  }
}
