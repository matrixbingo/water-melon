import API_BASE_URL from './base/api-base-url';
import { FrwkUtil } from '@/utils';
import type { BaseResult } from '@ahooksjs/use-request/lib/types';

const StatusApi = {
  updateStatus: `${API_BASE_URL.BAO_STOCK}/stock/data/status/update`,
};

const mock = false;

const StockStatusController = {

  updateStatus: (): BaseResult<any, any> => FrwkUtil.service.run.post(StatusApi.updateStatus, { mock }),

};

export default StockStatusController;
