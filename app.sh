#!/bin/dash

node -v

yarn -v
pm2 -v

pm2 stop wechat
yarn install
yarn run build
yarn prune --productio

NODE_ENV=production pm2 start ./bootstrap.js --name wechat -i 4