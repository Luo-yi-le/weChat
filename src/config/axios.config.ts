export default {
  default: {
    timeout: 6000,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json; charset=utf-8',
    },
    withCredentials: false,
    responseType: 'json',
    responseEncoding: 'utf8',
    maxContentLength: 20000,
    maxBodyLength: 20000,
    transitional: {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false,
    },
    socketPath: null,
  },
  clients: {
    default: {},
    wechatAxios: {
      baseURL: 'https://api.weixin.qq.com',
    },
  },
};
