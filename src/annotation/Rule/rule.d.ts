import * as joi from 'joi';
export interface RuleOptions {
  required?: boolean;
  min?: number;
  max?: number;
}
export declare function Rule(
  rule: any,
  options?: RuleOptions
): (...args: any[]) => void;
export { joi as RuleType };

export declare type Types =
  | 'any'
  | 'alternatives'
  | 'array'
  | 'boolean'
  | 'binary'
  | 'date'
  | 'function'
  | 'link'
  | 'number'
  | 'object'
  | 'string'
  | 'symbol';

export declare class ColumnOptions {
  array: () => joi.ArraySchema;
  boolean: () => joi.BooleanSchema;
  string: () => joi.StringSchema;
  number: () => joi.NumberSchema;
  object: () => joi.ObjectSchema;
  any: () => joi.AnySchema;
  alternatives: () => joi.AlternativesSchema;
  symbol: () => joi.SymbolSchema;
  binary: () => joi.BinarySchema;
  date: () => joi.DateSchema;
  function: () => joi.FunctionSchema;
  link: () => joi.LinkSchema;

  /**
   * 非空校验
   * @param type 类型
   * @param required 是否必填
   * @param message 错误信息
   * @returns Error
   */
  Required(type: Types, required?: boolean, message?: any) {
    return (
      (required &&
        this[type]()
          .required()
          .error(err => new Error(message || err))) ||
      this[type]()
    );
  }
}

// export declare const ColumnRule: Column = new Column();
