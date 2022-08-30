// eslint-disable-next-line prettier/prettier
/**
 * 微信公众号消息类型
 */
export enum WX_MESSAGE_TYPE {
  /**
   * 链接
   */
  LINK = 'link',
  /**
   * 地理位置
   */
  LOCATION = 'location',
  /**
   * 小视频
   */
  SHORTVIDEO = 'shortvideo',
  /**
   * 视频
   */
  VIDEO = 'video',
  /**
   * 语音
   */
  VOICE = 'voice',
  /**
   * 图片
   */
  IMAGE = 'image',
  /**
   * 文本
   */
  TEXT = 'text',

  /**
   * 事件类型
   */
  EVENT = 'event',
}

export enum WX_MESSAGE_EVENT {
  CLICK = 'CLICK',
  LOCATION = 'LOCATION',
  SUBSCRIBE = 'subscribe',
  UNSUBSCRIBE = 'unsubscribe',
  SCAN = 'SCAN',
}

export enum WX_MESSAGE_TYPE_NAME {
  /**
   * 链接
   */
  link = '链接',
  /**
   * 地理位置
   */
  location = '地理位置',
  /**
   * 小视频
   */
  shortvideo = '小视频',
  /**
   * 视频
   */
  video = '视频',
  /**
   * 语音
   */
  voice = '语音',
  /**
   * 图片
   */
  image = '图片',
  /**
   * 文本
   */
  text = '文本',

  /**
   * 事件类型
   */
  event = '事件',
}

/**
 * 返回用户关注的渠道来源
 */
export enum WX_SUBSCRIBE_SCENE {
  /**
   * @ADD_SCENE_SEARCH
   * 公众号搜索
   */
  ADD_SCENE_SEARCH = '公众号搜索',

  /**
   * @ADD_SCENE_ACCOUNT_MIGRATION
   * 公众号迁移
   */
  ADD_SCENE_ACCOUNT_MIGRATION = '公众号迁移',

  /**
   * @ADD_SCENE_PROFILE_CARD
   * 名片分享
   */
  ADD_SCENE_PROFILE_CARD = '名片分享',

  /**
   * @ADD_SCENE_QR_CODE
   * 扫描二维码
   */
  ADD_SCENE_QR_CODE = '扫描二维码',

  /**
   * @ADD_SCENE_PROFILE_LINK
   * 图文页内名称点击
   */
  ADD_SCENE_PROFILE_LINK = '图文页内名称点击',

  /**
   * @ADD_SCENE_PROFILE_ITEM
   * 图文页右上角菜单
   */
  ADD_SCENE_PROFILE_ITEM = '图文页右上角菜单',

  /**
   * @ADD_SCENE_PAID
   * 支付后关注
   */
  ADD_SCENE_PAID = '支付后关注',

  /**
   * @ADD_SCENE_WECHAT_ADVERTISEMENT
   * 微信广告
   */
  ADD_SCENE_WECHAT_ADVERTISEMENT = '微信广告',

  /**
   * @ADD_SCENE_REPRINT
   * 他人转载
   */
  ADD_SCENE_REPRINT = '他人转载',

  /**
   * @ADD_SCENE_LIVESTREAM
   * 视频号直播
   */
  ADD_SCENE_LIVESTREAM = '视频号直播',

  /**
   * @ADD_SCENE_CHANNELS
   * 视频号
   */
  ADD_SCENE_CHANNELS = '视频号',

  /**
   * @ADD_SCENE_OTHERS
   * 其他
   */
  ADD_SCENE_OTHERS = '其他',

  /**
   * @CANCEL_SCENE
   * 取消关注
   */
  CANCEL_SCENE = '取消关注',
}

/**
 * 菜单
 */
export enum WX_MENU {
  /**
   * 点击推事件
   */
  'click',

  /**
   * 跳转 URL
   */
  'view',

  /**
   * 扫码推事件
   */
  'scancode_push',

  /**
   * 扫码推事件且弹出“消息接收中”提示框用户点击按钮后
   */
  'scancode_waitmsg',

  /**
   * 弹出系统拍照发图
   */
  'pic_sysphoto',

  /**
   * 弹出拍照或者相册发图
   */
  'pic_photo_or_album',

  /**
   * 弹出微信相册发图器
   */
  'pic_weixin',

  /**
   * 弹出地理位置选择器
   */
  'location_select',

  /**
   * 下发消息（除文本消息）
   */
  'media_id',

  /**
   * 跳转图文消息 URL
   */
  'view_limited',

  /**
   * 用户点击 article_id 类型按钮后，微信客户端将会以卡片形式
   */
  'article_id',

  /**
   * 类似 view_limited，但不使用 media_id 而使用 article_id
   */
  'article_view_limited',
}
