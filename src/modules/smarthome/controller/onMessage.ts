import {
  WSController,
  OnWSMessage,
  Inject,
  App,
} from '@midwayjs/core';
import { Context, Application } from '@midwayjs/socketio';

@WSController('/msg')
export class onMessageController {
  @Inject()
  ctx: Context;

  @App()
  app: Application;

  @OnWSMessage('myEvent')
  // @WSEmit('myEventResult')
  async gotMessage(data) {
    console.log('on data got', this.ctx, data);
  }
}
