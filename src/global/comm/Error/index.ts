class BaseError extends Error {
  ColumnError(msg = '') {
    return new Error(msg + '\n不能为空');
  }
}

export const baseError = new BaseError();
