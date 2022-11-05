import { TransformUtil } from 'common-toolkits';

export const DashBoardEnum = {
  name: '姓名',
};

export const DashBoardSelectOptions = TransformUtil.objectToArray(DashBoardEnum, { key: 'value', value: 'label' });
export const DashBoardSelectEnum = TransformUtil.objectToValueEnum(DashBoardEnum);
