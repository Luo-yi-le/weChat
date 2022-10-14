import {
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { Rule, RuleType } from '@midwayjs/validate';
/**
 * 模型基类
 */
export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Rule(
    RuleType.string()
      .required()
      .error(err => new Error('name不能为空'))
  )
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

  // @AfterUpdate()
  // updateTimes() {
  //   this.updateTime = new Date();
  // }
}
