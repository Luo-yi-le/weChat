import { WSController, Provide, OnWSMessage, Inject } from '@midwayjs/core';
import { Context } from '@midwayjs/socketio';

@WSController('/msg')
export class onMessageController {

  @Inject()
  ctx: Context;

  @OnWSMessage('myEvent')
  async gotMessage(data) {
    console.log('on data got', this.ctx.id, data);
  }
}