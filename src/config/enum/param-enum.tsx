
import { TransformUtil } from "common-toolkits";

/**
 * 来源
 */
export const raisingLimitEnum = {
  1: '涨停类型',
};

export const raisingLimitSelectOptions = TransformUtil.objectToArray(raisingLimitEnum, { key: 'value', value: 'label' });

export const raisingLimitSelectEnum = TransformUtil.objectToValueEnum(raisingLimitEnum);

