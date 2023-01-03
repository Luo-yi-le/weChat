import { Column } from 'typeorm';
import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from './../../../global/entity/baseEntity';

/**
 * 文件上传模块服务
 */
@EntityModel('file_mode')
export class FileEntities extends BaseEntity {
  @Column({ comment: '上传模块' })
  mode: string;

  @Column({ comment: 'API的密钥', unique: true })
  accessKeyId: string;

  @Column({ comment: 'accessKeySecret', nullable: true })
  accessKeySecret: string;

  @Column({ comment: '授权策略名称', nullable: true })
  bucketName?: string;

  @Column({ comment: '阿里云 endpoint', nullable: true })
  endpoint?: string;

  @Column({ comment: '区域', nullable: true })
  region?: string;

  @Column({ comment: '访问域名', nullable: true })
  publicDomain?: string;
}
