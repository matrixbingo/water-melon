import API_BASE_URL from './base/api-base-url';
import { ComUtil } from '@/utils';

export const StockViewApi = {
  list: `${API_BASE_URL.BAO_STOCK}/stock/data/view/list`,
};

const mock = false;

const StockViewController = {

  list: (params, sort = {}, filter = {}) => ComUtil.run.commonPageList(StockViewApi.list, params, sort, filter, { mock }),

};

export default StockViewController;
