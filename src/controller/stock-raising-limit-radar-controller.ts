import { ComUtil, FrwkUtil } from '@/utils';
import API_BASE_URL from './base/api-base-url';
import type { BaseResult } from '@ahooksjs/use-request/lib/types';

/**
  * 涨停雷达
  */
export const StockRaisingLimitRadarApi = { // bin
  list: `${API_BASE_URL.BAO_STOCK}/stock/TongHuaShun/raising/limit/list`,                    // 1、查询
  detail: `${API_BASE_URL.BAO_STOCK}/stock/TongHuaShun/raising/limit`,                       // 2、明细
}; // end

const mock = false;

const StockRaisingLimitRadarController = {

  list: (params, sort = {}, filter = {}) => ComUtil.run.commonPageList(StockRaisingLimitRadarApi.list, { ...params, sort: 'insert_time', sortType: false }, sort, filter, { mock }),

  detail: (): BaseResult<any, any> => FrwkUtil.service.run.post(StockRaisingLimitRadarApi.detail, { mock }),

};

export default StockRaisingLimitRadarController;
