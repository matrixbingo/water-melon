import API_BASE_URL from './base/api-base-url';
import { ComUtil, FrwkUtil } from '@/utils';
import type { BaseResult } from '@ahooksjs/use-request/lib/types';

const ConcepBoardApi = {
  boardList: `${API_BASE_URL.BAO_STOCK}/stock/data/concept/board/list`,                                                               // 1、板块列表
  update: `${API_BASE_URL.BAO_STOCK}/stock/data/concept/board/update`,                                                                // 2、板块状态更新
  boardStockList: `${API_BASE_URL.BAO_STOCK}/stock/data/concept/board/stock/list`,                                                    // 3、板块个股列表
  addStock: `${API_BASE_URL.BAO_STOCK}/stock/data/concept/board/stock/add`,                                                           // 4、板块添加个股
  updateRaisingLimitByBoardCode: `${API_BASE_URL.BAO_STOCK}/stock/data/concept/board/updateRaisingLimitByBoardCode`,                  // 8、刷新板块
  findConceptBoardStockRaisingLimitList: `${API_BASE_URL.BAO_STOCK}/stock/data/concept/board/findConceptBoardStockRaisingLimitList`,  // 9、板块折线图
};

const mock = false;

const ConcepBoardController = {

  boardList: (params, sort = {}, filter = {}) => ComUtil.run.commonPageList(ConcepBoardApi.boardList, { ...params, sort: 'insert_time', sortType: false }, sort, filter, { mock }),

  update: (): BaseResult<any, any> => FrwkUtil.service.run.post(ConcepBoardApi.update, { mock }),

  boardStockList:(params, sort = {}, filter = {}) => ComUtil.run.commonPageList(ConcepBoardApi.boardStockList, params, sort, filter, { mock }),

  addStock: (): BaseResult<any, any> => FrwkUtil.service.run.post(ConcepBoardApi.addStock, { mock }),

  updateBoardRaisingLimitByBoardCode: (): BaseResult<any, any> => FrwkUtil.service.run.post(ConcepBoardApi.updateRaisingLimitByBoardCode),

  findConceptBoardStockRaisingLimitList: (): BaseResult<any, any> => FrwkUtil.service.run.post(ConcepBoardApi.findConceptBoardStockRaisingLimitList),
};

export default ConcepBoardController;
