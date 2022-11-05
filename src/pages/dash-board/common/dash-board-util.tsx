import { get, isEmpty, set } from 'lodash';
import { dashBoardConfig } from '@/config/page-config/dash-board-config';

export const initDashBoardEnum = (list: {rule: string; name: string; type: string}[]) => {
  const dashBoardEnum = {} as any;
  // do something ....
  set(dashBoardConfig, 'dashBoardEnum', dashBoardEnum);
  return dashBoardEnum;
};
