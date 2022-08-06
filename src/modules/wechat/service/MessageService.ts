import { Inject, Provide, Logger } from '@midwayjs/decorator';
import { BaseService, CoolCommException } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { ILogger } from '@midwayjs/logger';
import { Context } from '@midwayjs/koa';
import { WXMessageEntity } from '../entities/message';

/**
 * 微信消息处理
 */
@Provide()
export class MessageService extends BaseService {
  @Inject()
  ctx: Context;

  @Logger()
  logger: ILogger;

  @InjectEntityModel(WXMessageEntity)
  message: Repository<WXMessageEntity>;

  async add(message: WXMessageEntity) {
    await this.message.save(message);
    return message.id;
  }
}
