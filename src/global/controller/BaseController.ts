import { Provide } from '@midwayjs/decorator';
import { RESCODE, RESMESSAGE } from '../enum/message';
import { BaseController as Controller } from '@cool-midway/core';

@Provide()
export class BaseController extends Controller {
  /**
   * 新增
   * @returns
   */
  async add(): Promise<{ code: RESCODE; message: RESMESSAGE }> {
    const { body } = this.baseCtx.request;
    return this.ok(await this.service.add(body));
  }
  /**
   * 删除
   * @returns
   */
  async delete(): Promise<{ code: RESCODE; message: RESMESSAGE }> {
    const { ids }: any = this.baseCtx.request.body;
    return this.ok(await this.service.delete(ids));
  }
  /**
   * 更新
   * @returns
   */
  async update(): Promise<{ code: RESCODE; message: RESMESSAGE }> {
    const { body } = this.baseCtx.request;
    return this.ok(await this.service.update(body));
  }
  /**
   * 分页查询
   * @returns
   */
  async page(): Promise<{ code: RESCODE; message: RESMESSAGE }> {
    const { body }: any = this.baseCtx.request;
    const setBody = Object.assign({}, body, {
      page: body.pageNum,
      size: body.pageSize,
    });
    const res = await this.service.page(
      setBody,
      this.curdOption.pageQueryOp,
      this.connectionName
    );
    const { page, size, total } = res.pagination;
    const data = Object.assign({}, res, {
      pagination: { pageNum: page, pageSize: size, total },
    });
    return this.ok(data);
  }
  /**
   * 列表查询
   * @returns
   */
  async list(): Promise<{ code: RESCODE; message: RESMESSAGE }> {
    const { body } = this.baseCtx.request;
    return this.ok(
      await this.service.list(
        body,
        this.curdOption.listQueryOp,
        this.connectionName
      )
    );
  }
  /**
   * 根据ID查询信息
   * @returns
   */
  async info(): Promise<{ code: RESCODE; message: RESMESSAGE }> {
    const { id } = this.baseCtx.query;
    return this.ok(
      await this.service.info(id, this.curdOption.infoIgnoreProperty)
    );
  }
  /**
   * 成功返回
   * @param data 返回数据
   */
  ok(data: any) {
    const res = {
      code: RESCODE.SUCCESS,
      message: RESMESSAGE.SUCCESS,
    };
    if (data || data == 0) {
      res['data'] = data;
    }
    return res;
  }
  /**
   * 失败返回
   * @param message
   */
  fail1(message?: string, code?: RESCODE) {
    return {
      code: code ? code : RESCODE.COMMFAIL,
      message: message
        ? message
        : code == RESCODE.VALIDATEFAIL
        ? RESMESSAGE.VALIDATEFAIL
        : RESMESSAGE.COMMFAIL,
    };
  }
}
