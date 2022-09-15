import {
  ALL,
  Body,
  Get,
  Inject,
  Post,
  Provide,
  Query,
} from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { TaskInfoEntity } from '../../entity/info';
import { TaskInfoService } from '../../service/info';

/**
 * 任务
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'page'],
  entity: TaskInfoEntity,
  service: TaskInfoService,
  before: ctx => {
    ctx.request.body.limit = ctx.request.body.repeatCount;
  },
  pageQueryOp: {
    fieldEq: ['status', 'type'],
  },
})
export class TaskInfoController extends BaseController {
  @Inject()
  taskInfoService: TaskInfoService;

  /**
   * 手动执行一次
   */
  @Post('/once', { summary: '执行一次' })
  async once(@Body('id') id: number) {
    return this.ok(await this.taskInfoService.once(id));
  }

  /**
   * 暂停任务
   */
  @Post('/stop', { summary: '停止' })
  async stop(@Body('id') id: number) {
    return this.ok(await this.taskInfoService.stop(id));
  }

  /**
   * 开始任务
   */
  @Post('/start', { summary: '开始' })
  async start(@Body('id') id: number, @Body('type') type: number) {
    return this.ok(await this.taskInfoService.start(id, type));
  }

  /**
   * 日志
   */
  @Get('/log', { summary: '日志' })
  async log(@Query(ALL) params: any) {
    return this.ok(await this.taskInfoService.log(params));
  }
  /**
   * 添加或者修改任务
   */
  @Post('/addOrUpdate', { summary: '添加或者修改任务' })
  async addOrUpdate(@Body(ALL) task: TaskInfoEntity) {
    return this.ok(await this.taskInfoService.addOrUpdate(task));
  }
}
