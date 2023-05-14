# WeChat 整合微信公众号、微信小商店等接口

## 运行
```node
yarn install
yarn run dev
```
### 访问地址
http://127.0.0.1:8091/

## Swagger
http://127.0.0.1:8091/swagger-ui/index.html

### Swagger 启动之后
http://127.0.0.1:8091/swagger-ui/index.json

#### 修改数据库配置，配置文件位于`src/config/config.local.ts`
数据库为mysql(`>=5.7版本`)，node版本(`>=12.x`)，首次启动会自动初始化并导入数据

```js
config.orm = {
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: '',
    database: 'cool-admin',
    synchronize: true,
    logging: true,
}
```

### 部署

```bash
$ yarn start
$ yarn stop
```

### 内置指令
- 使用 `yarn run lint:fix` 用来格式代码。
- 使用 `yarn run lint` 来做代码风格检查。
- 使用 `yarn test` 来执行单元测试。


### 启动redis
- redis-server.exe
- redis-cli.exe -h 127.0.0.1 -p 6379
