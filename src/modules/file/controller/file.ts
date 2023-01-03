import {
  Inject,
  Provide,
  Post,
  File,
  Fields,
  Config,
} from '@midwayjs/decorator';

import { BaseController, CoolController } from '@cool-midway/core';
import { FileEntities } from '../entities/fileEntities';
import { FileService } from '../service/fileService';
import { ApiBody } from '@midwayjs/swagger';

/**
 * 文件服务类型
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'list', 'page'],
  entity: FileEntities,
  service: FileService,
})
export class FileController extends BaseController {
  @Inject()
  fileService: FileService;

  @Config('module.file')
  fileConfig;

  @Inject()
  ctx;

  @Post('/upload', { summary: '上传' })
  @ApiBody({ description: 'hello file' })
  @ApiBody({ description: 'hello fields', type: FileEntities })
  async upload(@File() files: any, @Fields() fields: FileEntities) {
    // await this.fileService.upload();
    return { files, fields: this.fileConfig.file, ctx: this.ctx.files };
  }
}
