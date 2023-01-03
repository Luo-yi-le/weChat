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
  userInfoList = '/cgi-bin/user/info/batchget?access_token={0}',

  /**
   * 获取单个用户基本信息
   */
  userInfo = '/cgi-bin/user/info?access_token={0}&lang=zh_CN',

  /**
   * 获取token
   */
  accToken = '/cgi-bin/token?grant_type=client_credential',

  /**
   * 创建菜单
   */
  createMenu = '/cgi-bin/menu/create?access_token={0}',
  selfMenu = '/cgi-bin/get_current_selfmenu_info?access_token={0}',
  deleteMenu = '/cgi-bin/menu/delete?access_token={0}',
  addconditional = '/cgi-bin/menu/addconditional?access_token={0}',
  getMenu = '/cgi-bin/menu/get?access_token={0}',

  qrcode = '/cgi-bin/qrcode/create?access_token={0}',
  showqrcode = 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket={0}',

  ip = '/cgi-bin/get_api_domain_ip?access_token={0}',

  clearQuota = '/cgi-bin/clear_quota?access_token={0}',
  getQuota = '/cgi-bin/openapi/quota/get?access_token={0}',

  getFun = '/cgi-bin/user/get?access_token={0}',

  setFunName = '/cgi-bin/user/info/updateremark?access_token={0}',
  createTags = '/cgi-bin/tags/create?access_token={0}',
  getTags = '/cgi-bin/tags/get?access_token={0}',
  updateTags = '/cgi-bin/tags/update?access_token={0}',
  deleteTags = '/cgi-bin/tags/delete?access_token={0}',

  /**
   * 获取标签下粉丝列表
   */
  getTagsFunList = '/cgi-bin/user/tag/get?access_token={0}',

  /**
   * 批量为用户打标签.
   * 标签功能目前支持公众号为用户打上最多20个标签。
   */
  setBatchtagging = '/cgi-bin/tags/members/batchtagging?access_token={0}',

  /**
   * 批量为用户取消标签.
   * 标签功能目前支持公众号为用户打上最多20个标签。
   */
  setBatchuntagging = '/cgi-bin/tags/members/batchuntagging?access_token={0}',

  /**
   * 批量为用户取消标签.
   * 标签功能目前支持公众号为用户打上最多20个标签。
   */
  getidlist = '/cgi-bin/tags/getidlist?access_token={0}',

  getTicketOfJsApi = '/cgi-bin/ticket/getticket?access_token={0}',
}
