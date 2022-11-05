/* eslint-disable @typescript-eslint/consistent-type-imports */
import { ComUtil, FrwkUtil } from '@/utils';
import { BaseResult } from '@ahooksjs/use-request/lib/types';
import { initDashBoardEnum } from '@/pages/dash-board/common/dash-board-util';
import { message } from 'antd';
import API_BASE_URL from './base/api-base-url';

/**
  * 大盘
  */
export const DashBoardApi = { // bin
  list: `${API_BASE_URL.BAO_STOCK}/web/query`,                  // 1、查询
  add: `${API_BASE_URL.BAO_STOCK}/web/add`,                     // 2、添加
  enum: `${API_BASE_URL.BAO_STOCK}/web/enum`,                   // 3、枚举
}; // end

const mock = false;

const DashBoardController = {

  list: (params, sort = {}, filter = {}) => ComUtil.run.commonPageList(DashBoardApi.list, params, sort, filter, { mock }),

  add: (): BaseResult<any, any> => FrwkUtil.service.run.post(DashBoardApi.add, { mock }),

  enum: (): BaseResult<any, any> => FrwkUtil.service.run.post(DashBoardApi.enum, {
    params: { pageInfo: { currentPage: 1, pageSize: 1000 } },
    config: { useCache: true, ttl: 600000 },
    options: { manual: false, formatResult: (res: any) => (res.code === '0000' ? initDashBoardEnum(res.data) : message.error(res.msg)) },
  }),

};

export default DashBoardController;
