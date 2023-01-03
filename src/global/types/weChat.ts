/* eslint-disable @typescript-eslint/no-namespace */
import { WX_SUBSCRIBE_SCENE } from './../enum/wxEnum';

export namespace IWeChat {
  class WeChat {}
  export interface ICommon<T = any> {
    [key: string]: T;
  }

  export type FormatObject<U extends number | string> = { [key: string]: U };

  export interface GetAccessTokenInfo extends ICommon {
    access_token?: string;
    expires_in?: number;
  }

  export interface ITagsDefault extends ICommon {
    id?: number;
    name?: string;
    count?: number;
  }
  export interface HttpServiceResponse<API = any> extends ICommon {
    message: string;
    params?: any;
    data?: any;
    method?: Method;
    IAPI: API;
  }
  export interface AxiosRequestConfig<D = any> extends ICommon {
    url?: string;
    method?: Method;
    baseURL?: string;
    data?: D;
  }
  export type Method =
    | 'get'
    | 'GET'
    | 'delete'
    | 'DELETE'
    | 'head'
    | 'HEAD'
    | 'options'
    | 'OPTIONS'
    | 'post'
    | 'POST'
    | 'put'
    | 'PUT'
    | 'patch'
    | 'PATCH'
    | 'purge'
    | 'PURGE'
    | 'link'
    | 'LINK'
    | 'unlink'
    | 'UNLINK';

  export interface AxiosResponse<T = any, D = any> {
    data: T;
    status: number;
    statusText: string;
    headers: any;
    config: AxiosRequestConfig<D>;
    request?: any;
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
    tags?: T;
    tag?: T;
  }

  export interface IBatchTag {
    openid_list: any[];
    tagid: number | number[];
  }
}
