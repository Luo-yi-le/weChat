import * as DefaultConfig from './config/config.default';
import * as nacos from './index';
import { INacosRegistry, INacosConfigClient } from './interface';
import * as koa from '@midwayjs/koa';

import { Configuration, App } from '@midwayjs/decorator';

@Configuration({
  namespace: 'nacos',
  importConfigs: [
    {
      default: DefaultConfig,
    },
  ],
})
export class NacosConfiguration {
  @App()
  app: koa.Application;
  async onReady(container) {
    const NacosNamingFactoryService = await container.getAsync(
      nacos.NacosNamingFactoryService
    );
    const NacosConfigFactoryService = await container.getAsync(
      nacos.NacosConfigFactoryService
    );
    const setNacosRegistry = NacosNamingFactoryService.get();
    const setNacosConfig = NacosConfigFactoryService.get();
    const nacosRegistry: INacosRegistry = this.app.getConfig(
      'nacos.registry.client'
    );
    const nacosConfig: INacosConfigClient = this.app.getConfig(
      'nacos.config.client'
    );
    // console.log(nacosRegistry)
    if (nacosRegistry && nacosRegistry.server && nacosRegistry.server.length) {
      nacosRegistry.server.forEach(item => {
        setNacosRegistry.registerInstance(
          item.serviceName,
          item.instance,
          item.groupName
        );
      });
    }

    if (nacosConfig && nacosConfig.server && nacosConfig.server.length) {
      nacosConfig.server.forEach(item => {
        setNacosConfig.publishSingle(
          item.dataId,
          item.group,
          item.content,
          item.options
        );
      });
    }
  }
}
