import { Inject, Provide, App, Files } from '@midwayjs/decorator';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { FileEntities } from '../entities/fileEntities';
import { Context, Application } from '@midwayjs/koa';
import { join } from 'path';
import { existsSync, mkdirSync, writeFile, unlink } from 'fs';
import { IUpLoad } from '../../../interface';
/**
 * 文件服务类型
 */
@Provide()
export class FileService extends BaseService {
  @InjectEntityModel(FileEntities)
  fileEntities: Repository<FileEntities>;

  @Inject()
  ctx: Context;

  @App()
  app: Application;

  init() {
    this.sqlParams = [];
    const filePath = join(this.app.getBaseDir(), '..', 'public');
    const uploadsPath = join(filePath, 'uploads');
    const tempPath = join(filePath, 'temp');

    if (!existsSync(uploadsPath)) {
      mkdirSync(uploadsPath);
    }
    if (!existsSync(tempPath)) {
      mkdirSync(tempPath);
    }
  }

  async upload(upload?: IUpLoad<FileEntities>) {
    if (upload.mode == 'local') {
      this.local(upload);
    }
  }

  local(upload?: IUpLoad<FileEntities>) {
    if (!upload.files.length) {
      return new Error('文件不能为空！');
    }
  }
}
