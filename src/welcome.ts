import { Controller, Get, Post, Inject, Query } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
const sha1 = require('sha1')
/**
 * 欢迎界面
 */
@Controller('/')
export class WelcomeController {
  @Inject()
  ctx: Context;

  @Get('/')
  public async welcome() {
    await this.ctx.render('welcome', {
      text: 'WeChat 后台管理！！！',
      footer: '作者：wulingshan',
    });
  }

  @Get('/interface')
  public async checkWeChat(
    @Query('signature') signature: string,
    @Query('nonce') nonce: string,
    @Query('timestamp') timestamp: string,
    @Query('echostr') echostr: string) {
    var config = {
      wechat: {
        appID: 'wx14d4e0686278afb6',
        appSecret: 'e7c20c8348c91d1b160d983a31bde0e8',
        token: 'wulingshan'

      }
    }
    const token = config.wechat.token
    const str = [token, timestamp, nonce].sort().join('')
    const sha = sha1(str)
    console.log(333333, sha)
    if (sha === signature) {
      this.ctx.body = echostr + ''
    }
    else {
      this.ctx.body = 'wrong'
    }
  }
}
