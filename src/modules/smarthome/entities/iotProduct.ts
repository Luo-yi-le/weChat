import { Column } from 'typeorm';
import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from '../../../global/entity/baseEntity';

/**
 * 产品表
 */
@EntityModel('iot_product')
export class IoTProduct extends BaseEntity {

    @Column({
        comment: '是否系统通用（0-否，1-是）',
        default: 0,
        type: 'tinyint',
    })
    is_sys: number;

    @Column({
        comment: '是否启用授权码-否，1-是）',
        default: 0,
        type: 'tinyint',
    })
    is_authorize: number;

    @Column({ comment: '分类Id', type: 'simple-array', nullable: true })
    category_id?: [];



    @Column({ comment: 'mqtt账号', nullable: true })
    mqtt_account: string;

    @Column({ comment: 'mqtt密码', nullable: true })
    mqtt_sassword: string;

    @Column({ comment: '产品秘钥', nullable: true })
    mqtt_secret: string;


    @Column({ comment: '状态（1-未发布，2-已发布）', default: 0, nullable: true })
    status?: number;

    @Column({ comment: '物模型JSON（属性、功能、事件）', type: 'simple-json' })
    things_models_json: any[]

    @Column({ comment: '设备类型（1-直连设备、2-网关子设备、3-网关设备）', default: 1, nullable: true })
    device_type: number;

    @Column({ comment: '联网方式（1=wifi、2=蜂窝(2G/3G/4G/5G)、3=以太网、4=其他）', default: 1, nullable: true })
    network_method: number;

    @Column({ comment: '认证方式（1-简单认证、2-加密认证、3-简单+加密）', default: 1, nullable: true })
    vertificate_method: number;

    @Column({ comment: '图片地址', nullable: true })
    img_url: string;
    

    categoryName?: [];
}