import {
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterUpdate,
} from 'typeorm';
/**
 * 模型基类
 */
export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ comment: '别名' })
  name: string;
  @Column({ comment: '创建时间' })
  createTime: Date;
  @Column({ comment: '更改时间' })
  updateTime: Date;

  @AfterInsert()
  createTimes() {
    this.createTime = new Date();
    this.updateTime = new Date();
  }

  @AfterUpdate()
  updateTimes() {
    this.updateTime = new Date();
  }
}
