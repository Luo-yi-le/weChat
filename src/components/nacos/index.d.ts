export * from './src/index';
import { INacosConfig } from './src/interface';

declare module '@midwayjs/core/dist/interface' {
  interface MidwayConfig {
    nacos?: INacosConfig;
  }
}
