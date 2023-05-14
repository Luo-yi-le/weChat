export default {
    port: 9903,
    path: '/smarthome/',

    // //跨域
    cors: {
        origin: "http://localhost:9903",
        methods: ["GET", "POST"]
    },
    //粘性会话
    // transports: ["polling", "websocket"],
};
