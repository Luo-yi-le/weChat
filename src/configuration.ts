import { Configuration, App } from '@midwayjs/decorator';
import {
  IMidwayContainer,
  ILifeCycle,
  Context,
  IMidwayBaseApplication,
} from '@midwayjs/core';
// import { Queue } from 'bullmq';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import { join } from 'path';
import * as staticFile from '@midwayjs/static-file';
import * as view from '@midwayjs/view-ejs';
import * as orm from '@midwayjs/orm';
// import * as typeorm from '@midwayjs/typeorm';
import * as cool from '@cool-midway/core';
import * as file from '@cool-midway/file';
import * as midwayTask from '@midwayjs/task';
import * as swagger from '@midwayjs/swagger';
import * as axios from '@midwayjs/axios';
import * as redis from '@midwayjs/redis';
import * as cache from '@midwayjs/cache';
import * as upload from '@midwayjs/upload';
// import { QueueService } from '@midwayjs/task';
// import * as socketio from '@midwayjs/socketio';
import * as task from '@cool-midway/task';
// import * as pay from '@cool-midway/pay';
// import * as es from '@cool-midway/es';
// import * as rpc from '@cool-midway/rpc';
// import * as captcha from '@midwayjs/captcha';
@Configuration({
  imports: [
    // http://koajs.cn/
    koa,
    // 参数验证 http://midwayjs.org/docs/extensions/validate
    validate,
    // 本地任务 http://midwayjs.org/docs/extensions/task
    task,
    // 模板渲染 http://midwayjs.org/docs/extensions/render
    view,
    // 静态文件托管 http://midwayjs.org/docs/extensions/static_file
    staticFile,
    // typeorm https://typeorm.io  打不开？ https://typeorm.biunav.com/zh/
    orm,
    // socketio http://www.midwayjs.org/docs/extensions/socketio
    // socketio,
    // cool-admin 官方组件 https://www.cool-js.com
    cool,
    // 文件上传 阿里云存储 腾讯云存储 七牛云存储
    file,
    // 导入Http组件
    axios,
    redis,
    swagger,
    midwayTask,
    cache,
    // upload,
    // 任务与队列
    // task,
    // 支付 微信与支付宝
    // pay,
    // elasticsearch
    // es,
    // rpc 微服务 远程调用
    // rpc,
    // 验证码
    // captcha,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle implements ILifeCycle {
  @App()
  app: koa.Application;
  async onConfigLoad(
    container: IMidwayContainer,
    mainApp?: IMidwayBaseApplication<Context>
  ): Promise<any> {}
  async onReady(container?: IMidwayContainer) {
    const httpServiceFactory = await container.getAsync(
      axios.HttpServiceFactory
    );

    const wechatAxios = httpServiceFactory.get('wechatAxios');
    wechatAxios.interceptors.request.use(
      config => {
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );
  }

  // 应用停止
  async onStop() {}

  // eslint-disable-next-line prettier/prettier
  async onServerReady(container: IMidwayContainer, app?: IMidwayBaseApplication<Context>): Promise<void> {
    // Task这块的启动后立马执行
    // let result: QueueService = await container.getAsync(QueueService);
    // let job: Queue = result.getQueueTask('TaskInfoService', 'initTask');
    // console.log(22222222222, result);
  }
}
