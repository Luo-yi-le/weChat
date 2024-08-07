export default {
  port: 9903,
  path: '/smarthome',
  // transports: ['websocket'],

  //跨域
  cors: {
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST'],
  },
  // 粘性会话
  transports: ['polling', 'websocket'],
};
