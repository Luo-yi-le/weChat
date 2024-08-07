import { Column, CreateDateColumn } from 'typeorm';
import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from '../../../global/entity/baseEntity';
import { Rule, ColumnRule } from './../../../annotation/Rule';
/**
 * 设备
 */
@EntityModel('iot_device')
export class IoTDevice extends BaseEntity {
  @Column({
    comment: '是否系统通用（0-否，1-是）',
    default: 0,
    type: 'tinyint',
  })
  is_sys: number;

  @Column({ comment: '产品', nullable: true })
  product_id?: string;

  @Rule(ColumnRule.Required('string', true, '设备编号不能为空'))
  @Column({ comment: '设备编号' })
  serial_number: string;

  @Rule(ColumnRule.Required('string', true, '固件版本不能为空'))
  @Column({ comment: '固件版本', nullable: false })
  firmware_version: string;

  @Column({
    type: 'tinyint',
    comment: '设备状态（1-未激活，2-禁用，3-在线，4-离线）',
    default: 1,
    nullable: true,
  })
  status: number;

  @Column({
    type: 'tinyint',
    comment:
      '信号强度（\r\n信号极好4格[-55— 0]，\r\n信号好3格[-70— -55]，\r\n信号一般2格[-85— -70]，\r\n信号差1格[-100— -85]）',
    nullable: true,
  })
  rssi: number;

  @Column({
    type: 'tinyint',
    comment: '定位方式(1=ip自动定位，2=设备定位，3=自定义)',
    nullable: true,
  })
  location_way: number;

  @Column({ comment: '物模型值', type: 'simple-array' })
  things_model_value: any[];

  @Column({ comment: '设备所在地址', nullable: true })
  network_address: string;

  @Column({ comment: '设备入网IP', nullable: true })
  network_ip: string;

  @Column({ comment: '设备经度', nullable: true })
  longitude: string;

  @Column({ comment: '设备纬度', nullable: true })
  latitude: string;

  @CreateDateColumn({
    nullable: true,
    comment: '激活时间',
    type: 'datetime',
  })
  active_time: Date;

  @Column({
    comment: '设备摘要，格式[{"name":"device"},{"chip":"esp8266"}]',
    type: 'simple-array',
  })
  summary: any[];

  @Column({ comment: '图片地址', nullable: true })
  img_url: string;
}
