import { Inject, Provide } from '@midwayjs/decorator';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { WXMenuEntity } from './../entities/menu';
import * as _ from 'lodash';
import { Context } from '@midwayjs/koa';

/**
 * 微信公众号菜单
 */
@Provide()
export class WXMenuService extends BaseService {}
