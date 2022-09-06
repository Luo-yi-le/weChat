export type IAPI = keyof typeof openApi;

/**
 * 整合微信接口
 */
export enum openApi {
  wxAppID = 'wx14d4e0686278afb6',
  wxAppSecret = 'e7c20c8348c91d1b160d983a31bde0e8',
  wxToken = 'wulingshan',

  /**
   * 批量获取用户基本信息
   */
  userInfoList = 'https://api.weixin.qq.com/cgi-bin/user/info/batchget?access_token={0}',

  /**
   * 获取单个用户基本信息
   */
  userInfo = 'https://api.weixin.qq.com/cgi-bin/user/info?access_token={0}&openid={1}&lang=zh_CN',

  /**
   * 获取token
   */
  accToken = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid={0}&secret={1}',

  /**
   * 创建菜单
   */
  createMenu = 'https://api.weixin.qq.com/cgi-bin/menu/create?access_token={0}',
  selfMenu = 'https://api.weixin.qq.com/cgi-bin/get_current_selfmenu_info?access_token={0}',
  deleteMenu = 'https://api.weixin.qq.com/cgi-bin/menu/delete?access_token={0}',
  addconditional = 'https://api.weixin.qq.com/cgi-bin/menu/addconditional?access_token={0}',
  getMenu = 'https://api.weixin.qq.com/cgi-bin/menu/get?access_token={0}',

  qrcode = 'https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token={0}',
  showqrcode = 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket={0}',

  ip = 'https://api.weixin.qq.com/cgi-bin/get_api_domain_ip?access_token={0}',

  clearQuota = 'https://api.weixin.qq.com/cgi-bin/clear_quota?access_token={0}',
  getQuota = 'https://api.weixin.qq.com/cgi-bin/openapi/quota/get?access_token={0}',

  getFun = 'https://api.weixin.qq.com/cgi-bin/user/get?access_token={0}&next_openid={1}',

  setFunName = 'https://api.weixin.qq.com/cgi-bin/user/info/updateremark?access_token={0}',
  createTags = 'https://api.weixin.qq.com/cgi-bin/tags/create?access_token={0}',
  getTags = 'https://api.weixin.qq.com/cgi-bin/tags/get?access_token={0}',
  updateTags = 'https://api.weixin.qq.com/cgi-bin/tags/update?access_token={0}',
  deleteTags = 'https://api.weixin.qq.com/cgi-bin/tags/delete?access_token={0}',
  
  /**
   * 获取标签下粉丝列表
   */
  getTagsFunList = 'https://api.weixin.qq.com/cgi-bin/user/tag/get?access_token={0}',

  /**
   * 批量为用户打标签.
   * 标签功能目前支持公众号为用户打上最多20个标签。
   */
   setBatchtagging = 'https://api.weixin.qq.com/cgi-bin/tags/members/batchtagging?access_token={0}',

   /**
   * 批量为用户取消标签.
   * 标签功能目前支持公众号为用户打上最多20个标签。
   */
   setBatchuntagging = 'https://api.weixin.qq.com/cgi-bin/tags/members/batchuntagging?access_token={0}',

   /**
   * 批量为用户取消标签.
   * 标签功能目前支持公众号为用户打上最多20个标签。
   */
    getidlist = 'https://api.weixin.qq.com/cgi-bin/tags/getidlist?access_token={0}',

}
