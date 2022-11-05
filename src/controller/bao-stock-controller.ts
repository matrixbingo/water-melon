import API_BASE_URL from './base/api-base-url';
import { ComUtil, FrwkUtil } from '@/utils';
import type { BaseResult } from '@ahooksjs/use-request/lib/types';
import { message } from 'antd';
import { stockSelectListTransform } from '@/utils/common-util';

export const BaoStocApi = {
  boardList: `${API_BASE_URL.BAO_STOCK}/stock/data/concept/board/list`,                           // 1、板块列表
  update: `${API_BASE_URL.BAO_STOCK}/stock/data/concept/board/update`,                            // 2、板块状态更新
  findStockBoardList: `${API_BASE_URL.BAO_STOCK}/stock/data/findStockBoardList`,                  // 3、根据板块查每日涨停个股
  findStockBoardStockList: `${API_BASE_URL.BAO_STOCK}/stock/data/findStockBoardStockList`,        // 4、查询板块个股涨停
  findAllStockList: `${API_BASE_URL.BAO_STOCK}/stock/data/findAllStockList`,                      // 5、根据股票代码查询详情
  updateStockSort: `${API_BASE_URL.BAO_STOCK}/stock/data/updateStockSort`,                        // 6、更新排序
  stockSelectList: `${API_BASE_URL.BAO_STOCK}/stock/data/select/list`,                            // 7、全部代码
};

const mock = false;

const BaoStockController = {

  boardList: (params, sort = {}, filter = {}) => ComUtil.run.commonPageList(BaoStocApi.boardList, { ...params, sort: 'insert_time', sortType: false }, sort, filter, { mock }),

  update: (): BaseResult<any, any> => FrwkUtil.service.run.post(BaoStocApi.update, { mock }),

  findStockBoardList: (): BaseResult<any, any> => FrwkUtil.service.run.post(BaoStocApi.findStockBoardList, { mock }),

  findStockBoardStockList: (): BaseResult<any, any> => FrwkUtil.service.run.post(BaoStocApi.findStockBoardStockList, { mock }),

  findAllStockList: (): BaseResult<any, any> => FrwkUtil.service.run.post(BaoStocApi.findAllStockList, { mock }),

  updateStockSort: (): BaseResult<any, any> => FrwkUtil.service.run.post(BaoStocApi.updateStockSort, { mock }),

  stockSelectList: (): BaseResult<any, any> => FrwkUtil.service.run.post(BaoStocApi.stockSelectList, {
    config: { useCache: true, ttl: 600000 },
    options: { formatResult: (res: any) => (res.code === 200 ? stockSelectListTransform(res.data) : message.error(res)) },
  }),

};

export default BaoStockController;
