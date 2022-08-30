import {
  Controller,
  Get,
  Post,
  Inject,
  Query,
  Logger,
} from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { ILogger } from '@midwayjs/logger';

const sha1 = require('sha1');
/**
 * 欢迎界面
 */
@Controller('/')
export class WelcomeController {
  @Logger()
  logger: ILogger;

  @Inject()
  ctx: Context;

  @Get('/')
  public async welcome() {
    await this.ctx.render('welcome', {
      text: 'WeChat 后台管理！！！',
      footer: '作者：wulingshan',
    });
  }
}
