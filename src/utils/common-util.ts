/* eslint-disable no-unused-expressions */

import { commonConfig } from "@/config/page-config/common-config";
import { TransformUtil } from "common-toolkits";
import { set } from "lodash";
import FrwkUtil from "./frwk-util";

const commonFormatResult = (rs: any) => {
  if (rs.data) {
    return rs.data;
  }
  return rs;
};

export interface RunParamsProps {
  msg?: { show: boolean; success?: string; error?: string };
  onSuccess?: (rs: any) => void;
  onError?: (rs: any) => void;
  callback?: (rs: any) => void;
  isRequestSuccess?: (rs: any) => boolean;
  path?: { message: string };
  param?: object;
}

export const run = {

  common: (_run: (...args: any) => Promise<any>, params: RunParamsProps = {}) => FrwkUtil.exe.rs(_run, { msg: { show: false }, path: { message: 'msg' }, formatResult: commonFormatResult, ...params }),

  commonPageList: (url, params, sort, filter, resp = {}) => FrwkUtil.service.run.pageList(url, {
    formatParam: () => {
      const { pageSize, current, ...rest } = params;
      return { ...rest, page: current, pageSize};
    },
    path: { dataPath: 'data.list', totalPath: 'data.totalCount' },
    ...resp,
  }),

  commonAllList: (url, params, sort, filter, resp = {}) => FrwkUtil.service.run.pageList(url, {
    formatParam: () => {
      const { pageSize, current, ...rest } = params;
      return { ...rest, page: current, pageSize};
    },
    path: { dataPath: 'data', totalPath: (rs) => rs.data.length },
    ...resp,
  }),

};

export const paramSelectListTransform = ({ list }) => {
  const paramSelectList = TransformUtil.select.formatArray(list, { value: 'code', label: 'name'});
  set(commonConfig, 'paramSelectList', paramSelectList);
};

export const stockSelectListTransform = (list) => {
  const stockSelectList = TransformUtil.select.formatArray(list, { value: 'stock_code', label: 'code_name'});
  set(commonConfig, 'stockSelectList', stockSelectList);
};
