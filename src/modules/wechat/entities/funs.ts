// import { Column, Index, Generated, PrimaryGeneratedColumn } from 'typeorm';
import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from './../../../global/entity/baseEntity';

/**
 * 微信公众号菜单
 */
@EntityModel('wechat_funs')
export class WXFunsEntity extends BaseEntity {}
