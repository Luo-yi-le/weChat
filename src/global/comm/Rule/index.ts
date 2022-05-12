import { RuleType } from '@midwayjs/validate';

class ColumnRule {
  Required() {
    return RuleType.string()
      .required()
      .error((err: any) => new Error(err));
  }

  String() {
    return RuleType.string();
  }

  RequiredMessage(message: any) {
    return RuleType.string()
      .required()
      .error(err => new Error(message));
  }
}

export const columnRule: ColumnRule = new ColumnRule();
