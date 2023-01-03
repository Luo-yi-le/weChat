import { Controller, Get, Inject, Logger } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { ILogger } from '@midwayjs/logger';

/**
 * 欢迎界面
 */
@Controller('/')
export class WelcomeController {
  @Logger('baseLogger')
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
