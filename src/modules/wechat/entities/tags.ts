import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';
import { EntityModel } from '@midwayjs/orm';
import { Rule, ColumnRule } from './../../../annotation/Rule';

/**
 * 微信公众号标签下的粉丝
 */
@EntityModel('wechat_tags')
export class WXTagsEntity {
  @PrimaryColumn()
  id?: number;

  @Rule(ColumnRule.Required('string', true, '标签名【name】不能为空'))
  @Column({ comment: '别名', nullable: true })
  name?: string;

  @CreateDateColumn({
    nullable: false,
    comment: '创建时间',
    type: 'timestamp',
  })
  createTime?: Date;

  @UpdateDateColumn({
    nullable: false,
    comment: '更改时间',
    type: 'timestamp',
  })
  updateTime?: Date;

  @Column({ comment: '标签下粉丝数', nullable: true })
  count?: number;
}
