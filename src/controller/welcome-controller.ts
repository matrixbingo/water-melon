import { FrwkUtil } from '@/utils';
import type { BaseResult } from '@ahooksjs/use-request/lib/types';
import API_BASE_URL from './base/api-base-url';

/**
  * 首页
  */
export const WelcomeApi = { // bin
  statisticsList: `${API_BASE_URL.BAO_STOCK}/stock/statistics/findAStockStatisticsList`,                  // 1、成功率 最强 炸板率
}; // end

const mock = false;

const WelcomeController = {

  statisticsList: (): BaseResult<any, any> => FrwkUtil.service.run.post(WelcomeApi.statisticsList, { mock }),

};

export default WelcomeController;
