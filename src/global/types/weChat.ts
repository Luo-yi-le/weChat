import { WX_SUBSCRIBE_SCENE } from './../enum/wxEnum';

export type FormatObject<U extends number | string> = { [key: string]: U };

/**
 * 获取access_token返回
 * @access_token 获取到的凭证
 * @expires_in 凭证有效时间，单位：秒
 */
export interface ICommon<T = any> {
  [key: string]: T;
}

export interface GetAccessTokenInfo extends ICommon {
  access_token?: string;
  expires_in?: number;
}

export interface ITagsDefault extends ICommon{
  id?: number| string;
  name?: string;
  count?: number;
}

/**
 * 微信数据响应格式
 */
export interface IReslut extends ICommon {
  errcode?: number;
  errmsg?: string;
}

export interface GetUserInfo extends ICommon {
  subscribe?: string | number | any;
  openid?: string;
  nickname?: any | string;
  sex?: any | number;
  language?: any | string;
  city?: any | string;
  province?: any | string;
  country?: any | string;
  headimgurl?: any | string;
  subscribe_time?: any | number;
  remark?: any | string;
  groupid?: any | string;
  tagid_list?: any[] | string[];
  subscribe_scene?: WX_SUBSCRIBE_SCENE;
  qr_scene?: any | string;
  qr_scene_str?: any | string;
}

/**
 * 粉丝列表数据
 */
export interface IFuns {
  total: number;
  count: number;
  data: object;
  next_openid: string;
}

export interface ISetFunsName {
  openid: string;
  remark: string;
}

export interface ITags<T> {
  tag: T;
}

