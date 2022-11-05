import API_BASE_URL from './base/api-base-url';
import { ComUtil, FrwkUtil } from '@/utils';
import type { BaseResult } from '@ahooksjs/use-request/lib/types';
import { message } from 'antd';
import { paramSelectListTransform } from '@/utils/common-util';

export const ParamApi = {
  paramList: `${API_BASE_URL.BAO_STOCK}/param/manager/list`,
  update: `${API_BASE_URL.BAO_STOCK}/param/manager/add`,
  add: `${API_BASE_URL.BAO_STOCK}/param/manager/update`,
};

const mock = false;

const ParamController = {

  paramList: (params, sort = {}, filter = {}) => ComUtil.run.commonPageList(ParamApi.paramList, params, sort, filter, { mock }),

  update: (): BaseResult<any, any> => FrwkUtil.service.run.post(ParamApi.update, { mock }),

  add: (): BaseResult<any, any> => FrwkUtil.service.run.post(ParamApi.update, { mock }),

  paramSelectList: (): BaseResult<any, any> => FrwkUtil.service.run.post(ParamApi.paramList, {
    config: { useCache: true, ttl: 600000 },
    options: { formatResult: (res: any) => (res.code === 200 ? paramSelectListTransform(res.data) : message.error(res)) },
  }),

};

export default ParamController;
