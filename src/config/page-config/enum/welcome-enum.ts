import { TransformUtil } from 'common-toolkits';

export const WelcomeEnum = {
  name: '姓名',
};

export const WelcomeSelectOptions = TransformUtil.objectToArray(WelcomeEnum, { key: 'value', value: 'label' });
export const WelcomeSelectEnum = TransformUtil.objectToValueEnum(WelcomeEnum);
