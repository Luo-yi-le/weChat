import * as Joi from 'joi';
import {
  getClassMetadata,
  getPropertyType,
  attachClassMetadata,
  saveClassMetadata,
} from '@midwayjs/decorator';
import { RuleOptions, ColumnOptions } from './rule';
import { RuleType } from '@midwayjs/validate';
const RULES_KEY = 'common:rules';

export function Rule(rule: any, options: RuleOptions = { required: true }) {
  return (...args: any[]) => {
    if (args[1]) {
      // 函数装饰器
      const [target, propertyKey] = args;
      if (!Joi.isSchema(rule)) {
        rule = Joi.object(getClassMetadata(RULES_KEY, rule)).meta({
          id: rule.name,
        });
        if (getPropertyType(target, propertyKey).name === 'Array') {
          rule = Joi.array().items(rule);
          if (options.min) {
            rule = rule.min(options.min);
          }
          if (options.max) {
            rule = rule.max(options.max);
          }
        }
        if (options.required) {
          rule = rule.required();
        }
      }
      attachClassMetadata(RULES_KEY, rule, target, propertyKey);
    } else {
      //类的装饰器
      const rules = getClassMetadata(RULES_KEY, rule);
      if (rules) {
        let currentRule = getClassMetadata(RULES_KEY, args[0]);
        currentRule =
          currentRule !== null && currentRule !== void 0 ? currentRule : {};
        Object.keys(rules).map(item => {
          if (!currentRule[item]) {
            currentRule[item] = rules[item];
          }
        });
        saveClassMetadata(RULES_KEY, currentRule, args[0]);
      }
    }
  };
}

export class Column {
  Required(type: Types, required?: false, message?: any): Joi.AnySchema<any> {
    if (required) {
      return this[type]()
        .required()
        .error((err: any) => new Error(message || err));
    } else {
      return this[type]();
    }
  }

  string(): Joi.StringSchema {
    return RuleType.string();
  }

  number(): Joi.NumberSchema {
    return RuleType.number();
  }

  object(): Joi.ObjectSchema {
    return RuleType.object();
  }

  boolean(): Joi.BooleanSchema {
    return RuleType.boolean();
  }

  any(): Joi.AnySchema {
    return RuleType.any();
  }

  alternatives(): Joi.AlternativesSchema {
    return RuleType.alternatives();
  }

  symbol(): Joi.SymbolSchema {
    return RuleType.symbol();
  }

  binary(): Joi.BinarySchema {
    return RuleType.binary();
  }

  array(): Joi.ArraySchema {
    return RuleType.array();
  }
  date(): Joi.DateSchema {
    return RuleType.date();
  }
  function(): Joi.FunctionSchema {
    return RuleType.function();
  }
  link(): Joi.LinkSchema {
    return RuleType.link();
  }
}

type Types =
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


export const ColumnRule: ColumnOptions = new Column();
