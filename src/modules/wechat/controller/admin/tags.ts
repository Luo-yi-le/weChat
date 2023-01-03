import { Inject, Post, Provide, Body, ALL } from '@midwayjs/decorator';
import { BaseController, CoolController } from '@cool-midway/core';
import { TagsService } from '../../service/TagsService';
import { WXTagsEntity } from '../../entities/tags';
import { Validate } from '@midwayjs/validate';
/**
 * 微信粉丝标签
 */
@Provide()
@CoolController({
  api: ['list', 'page'],
  entity: WXTagsEntity,
  service: TagsService,
})
export class TagsController extends BaseController {
  @Inject()
  tagsService: TagsService;

  @Post('/getWxTags', { summary: '获取粉丝标签' })
  async getWxTags() {
    return this.ok(await this.tagsService.getWxTags());
  }

  @Post('/createTags', { summary: '创建粉丝标签' })
  @Validate()
  async createTags(@Body(ALL) tags: WXTagsEntity) {
    const res = await this.tagsService.createWxTags(tags);
    if (res.status && res.status == 1001) {
      return this.fail(res.message);
    }
    return this.ok(res);
  }

  @Post('/updateTags', { summary: '更新粉丝标签' })
  @Validate()
  async updateTags(@Body(ALL) tags: WXTagsEntity) {
    const res = await this.tagsService.updateWxTags(tags);
    if (res.status && res.status == 1001) {
      return this.fail(res.message);
    }
    return this.ok(res);
  }

  @Post('/deleteTags', { summary: '删除粉丝标签' })
  async deleteTags(@Body(ALL) tags: WXTagsEntity) {
    const res = await this.tagsService.deleteWXTags(tags);
    if (res.status && res.status == 1001) {
      return this.fail(res.message);
    }
    return this.ok(res);
  }

  @Post('/batchtag', { summary: '批量给粉丝打上标签' })
  async batchtag(@Body(ALL) tags) {
    const res = await this.tagsService.BatchtagOfTagIdArray(tags);
    // if (res.status && res.status == 1001) {
    //   return this.fail(res.message);
    // }
    return this.ok(res);
  }
}
