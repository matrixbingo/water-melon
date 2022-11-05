/* eslint-disable @typescript-eslint/no-for-in-array */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable camelcase */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-bitwise */
import { useRequest, request as umiRequest } from 'umi';
import type { RequestOptionsWithResponse } from 'umi-request';
import lodash, { isEmpty, isArray, replace, startsWith, isString } from 'lodash';
import { message } from 'antd';
import axios from 'axios';
import type { BaseResult } from '@ahooksjs/use-request/lib/types';
import qs from 'query-string';
import type { ProColumns } from '@ant-design/pro-table';
import { DataUtil, UrlUtil } from 'common-toolkits';
import type { SortOrder } from 'antd/lib/table/interface';
import API_BASE_URL from '@/controller/base/api-base-url';


export type UmiRequestOptions = RequestOptionsWithResponse & { skipErrorHandler?: boolean };

export interface RequestOptions {
  /**
   * 传参
   */
  params?: Record<string, any>;
  /**
    * umRequest
    */
  config?: Omit<UmiRequestOptions, 'params' | 'method'>;
  /**
   * useRequest
   */
  options?: Record<string, any>;
  /**
   * mock
   */
  mock?: boolean;

  resp?: { argUrl: boolean };
}

export interface requestParams {
  params: Record<string, any> & {
    pageSize?: number;
    current?: number;
    keyword?: string;
  };
  sort: Record<string, SortOrder>;
  filter: Record<string, React.ReactText[] | null>;
  rest?: any;
}

export interface PageListProps {
  /**
   * umRequest
   */
  config?: Omit<UmiRequestOptions, 'params'>;

  /**
   * ProTable
   */
  // formatParam: (params: requestParams['params'], sort: requestParams['sort'], filter: requestParams['filter']) => any;
  formatParam: (requestParams?: requestParams) => any;

  path: { dataPath: string; totalPath: string | ((rs: any) => number) };
  /**
   * mock
   */
  mock?: boolean;

  formatData?: (data: any) => any;

  callback?: (data: any) => any;
}

export const dataConfig = {
  sucCode: 200,
  errCode: 500,
};

export const EditorType = {
  eidtor: 0,  // 新建或编辑失败不清空数据
  add: 1,     // 新增
  update: 2,  // 编辑
  copy: 3,    // 编辑
  delete: 4,  // 编辑
  view: 5,    // 查看
  report: 6,  // 报表
};

export const mockUrl = (url: string) => {
  const pathname = Object.values(API_BASE_URL).find((_url: string) => startsWith(url, _url)) ?? '' as any;
  return replace(url, pathname, API_BASE_URL.MOCK_BASE_SERVER);
};

export const mockRequest = (url: string, options) => {
  const _mockUrl = mockUrl(url);
  return useRequest(_mockUrl, { ...options, formatResult: (rs) => rs });
};

const FrwkUtil = {
  store: {
    getJsonValeByKey: (item: Record<string, any>, valueLink: string) => {
      if (valueLink.includes('.')) {
        const keys: any[] = valueLink.split('.');
        let val: any = '';
        let rs: any[] = [];
        try {
          if (keys.length > 1) {
            // eslint-disable-next-line no-restricted-syntax
            for (const i in keys) {
              if (Number(i) === 0) {
                // TODO i === 0
                rs = item[keys[i]];
              } else if (Number(i) > 0) {
                rs = rs[keys[i]];
              }
            }
            val = rs;
          } else {
            val = item[keys[0]];
          }
        } catch (e) {
          window.console
            && window.console.warn('FrwkUtil.store.getJsonValeByKey', keys.join(), rs, e);
        }
        return val;
      }
      return item[valueLink];
    },
  },
  service: {
    params: {
      get: (url: string, rest: RequestOptions, param: any) => {
        const { params, config, resp } = rest;
        const { url: newUrl, params: newParams } = UrlUtil.pathVariable(url, param) as { url: string; params: object };
        const _config = lodash.assign({ method: 'get', params: lodash.assign(params || {}, newParams || {}) }, config || {});
        const _resp = lodash.assign({ argUrl: false }, resp || {});
        const _url = _resp.argUrl ? FrwkUtil.url.addParam(newUrl, _config.params) : newUrl;
        return umiRequest(_url, _config);
      },
      post: (url: string, rest: RequestOptions, param: any) => {
        const { params, config, resp } = rest;
        const { url: newUrl, params: newParams } = UrlUtil.pathVariable(url, param) as { url: string; params: object };
        const _config = lodash.assign({ method: 'post', data: lodash.assign(params || {}, newParams || {}) }, config || {});
        const _resp = lodash.assign({ argUrl: false }, resp || {});
        const _url = _resp.argUrl ? FrwkUtil.url.addParam(newUrl, _config.data) : newUrl;
        return umiRequest(_url, _config);
      },
    },
    /**
     * ahooks 2.x 版
     */
    run: {
      get: (url: string, rest: RequestOptions = {}): BaseResult<any, any> => {
        const _options = lodash.assign({ manual: true, formatResult: (rs: any) => rs }, rest.options || {});
        if (rest.mock) {
          return mockRequest(url, _options);
        }
        return useRequest((param) => FrwkUtil.service.params.get(url, rest, param), _options);
      },
      batchGet: (parmas: {url: string; rest: RequestOptions}[]): BaseResult<any, any>[] => {
        return parmas.map((param) => FrwkUtil.service.run.get(param.url, param.rest));
      },
      post: (url: string, rest: RequestOptions = {}): BaseResult<any, any> => {
        const _options = lodash.assign({ manual: true, formatResult: (rs: any) => rs }, rest.options || {});
        if (rest.mock) {
          return mockRequest(url, _options);
        }
        return useRequest((param) => FrwkUtil.service.params.post(url, rest, param), _options);
      },
      batchPost: (parmas: {url: string; rest: RequestOptions}[]): BaseResult<any, any>[] => {
        return parmas.map((param) => FrwkUtil.service.run.post(param.url, param.rest));
      },
      pageList: async (url: string, pageListProps: PageListProps) => {
        const { config, path, mock, formatParam = (param: any) => param, formatData = (res: any) => FrwkUtil.store.getJsonValeByKey(res, path.dataPath), callback = (data: any) => data } = pageListProps;
        // window.console.log('config, formatParam, path, mock, formatData ---------------->', config, formatParam, path, mock, formatData);
        let _config = lodash.assign({ method: 'post', data: formatParam() }, config || {});
        if (mock) {
          url = mockUrl(url);
          _config = lodash.assign({ method: 'get', data: formatParam() }, config || {});
        }
        const res = await umiRequest(url, _config);
        const data = formatData(res);
        const total = isString(path.totalPath) ? FrwkUtil.store.getJsonValeByKey(res, path.totalPath) : path.totalPath(res);
        return callback({ data, total, success: true });
      },
      // put: (
      //   request: typeof useRequest,
      //   url: string,
      //   rest: { params?: {}; customerService?: {}; options?: Record<string, any> },
      // ): BaseResult<any, any> => {
      //   const _rest = { params: {}, customerService: {}, options: { manual: true } };
      //   const { params, customerService, options } = { ..._rest, ...rest };
      //   return request(
      //     (param: {} | undefined) => FrwkUtil.service.params.put(url, { ...params, ...param }, customerService),
      //     { ...options },
      //   );
      // },
      promise: (
        request: typeof useRequest,
        service: any,
        options?: Record<string, any>,
      ): BaseResult<any, any> => {
        return request(service, options || {});
      },
    },
  },
  exe: {
    rs: (
      run: (...args: any) => Promise<any>,
      params: {
        msg?: { show: boolean; success?: string; error?: string };
        onSuccess?: (rs: any) => void;
        onError?: (rs: any) => void;
        callback?: (rs: any) => void;
        isRequestSuccess?: (rs: any) => boolean;
        formatResult?: (rs: any) => any;
        path?: { message: string };
        param?: object;
      },
    ) => {
      const { msg, onSuccess, onError, callback, param, isRequestSuccess, formatResult, path } = lodash.assign(
        {
          msg: { show: true, success: '提交成功！！', error: '提交失败！！' },
          onSuccess: (rs: any) => {},
          onError: (rs: any) => {},
          callback: (rs: any) => {},
          isRequestSuccess: (rs: any) => dataConfig.sucCode === rs?.code,
          formatResult: (rs: any) => rs,
          path: { message: 'msg' },
          param: {},
        },
        params,
      );
      run(param)
        .then((rs: any) => {
          if(!isEmpty(rs)){
            const msgText = FrwkUtil.store.getJsonValeByKey(rs, path.message);
            if (isRequestSuccess?.(rs)) {
              if (msg.show) {
                msg?.success ? message.success(`${msg.success}!`) : msgText && message.success(`${msgText}!`);
              }
              onSuccess(formatResult(rs));
            } else {
              if (msgText) {
                message.error(`${msgText}!`);
              } else if (msg.error) {
                message.error(`${msg.error}!`);
              }
              onError(rs);
            }
            callback(rs);
          }
        })
        .catch((e: any) => {
          message.error(`系统发生异常 ${e}`);
          window.console.error(`系统发生异常 ${e}`);
        });
    },
  },
  antd: {
    from: {
      validator: {
        required: (rule: { message: any }, value: any) => {
          if (DataUtil.unknown.isVoid(value) || value === 'null') {
            return Promise.reject(rule.message);
          }
          return Promise.resolve();
        },
        gender: (rule: { message: any }, value: any) => {
          if (!['M', 'F'].includes(value)) {
            return Promise.reject(rule.message);
          }
          return Promise.resolve();
        },
        json: (rule: { message: any }, value: any) => {
          if (!DataUtil.unknown.isJSON(value)) {
            return Promise.reject(rule.message);
          }
          return Promise.resolve();
        },
        nullOrJson: (rule: any, value: any) => {
          if (!isEmpty(value)) {
            return FrwkUtil.antd.from.validator.json(rule, value);
          }
          return Promise.resolve();
        },
        between: (rule: { message: any }, value: any) => {
          if (isArray(value) && value.length === 2 && value[0] >= value[1]) {
            return Promise.reject(rule.message);
          }
          return Promise.resolve();
        },
        absoluteBetween: (rule: { message: any }, value: any) => {
          if (isArray(value) && value.length === 2 && value[0] > value[1]) {
            return Promise.reject(rule.message);
          }
          return Promise.resolve();
        },
      },
    },
    upload: {
      single: (
        url: string,
        file: any,
        params: {
          msg?: { success?: string; error?: string };
          onSuccess?: (rs: any) => void;
          onError?: (rs: any) => void;
          isRequestSuccess?: (rs: any) => boolean;
          param?: object;
        },
      ) => {
        const { msg, onSuccess, onError, isRequestSuccess, param } = lodash.merge(
          {
            msg: { success: '提交成功！！', error: '提交失败！！' },
            onSuccess: (rs: any) => {},
            onError: (rs: any) => {},
            isRequestSuccess: (rs: any) => dataConfig.sucCode === rs?.code,
            param: {},
          },
          params,
        );
        const formData = new FormData();
        formData.append('file', file);
        if (!isEmpty(param)) {
          //formData.append('config_version', JSON.stringify(param));
        }
        fetch(url, {
          method: 'POST',
          body: formData, // 将formData 赋值给body即可
        })
          .then((response) => response.json())
          .then((rs) => {
            if (isRequestSuccess(rs)) {
              onSuccess && onSuccess(rs);
              msg?.success
                ? message.success(`${msg.success}!`)
                : rs.msg && message.success(`${rs.msg}!`);
            } else {
              onError && onError(rs);
              msg?.error ? message.error(`${msg.error}!`) : rs.msg && message.error(`${rs.msg}!`);
            }
          })
          .catch((e) => {
            message.error(`系统发生异常 ${e}`);
          });
      },
    },
    proTable: {
      extendColumns: <T = ProColumns>(baseConfig: T[], columnConfig: T[], key = ['key', 'dataIndex']): T[] => {
        baseConfig.forEach((i) => {
          const config = columnConfig.find((c) => c[key[0]] === (i[key[0]] || i[key[1]]));
          if (config) {
            i = lodash.assign(i, config);
          }
        });
        return baseConfig;
      },
    },
  },
  stream: {
    download: async (url: string, params: any) => {
      try {
        const response = await axios({
          url,
          method: 'post',
          responseType: 'blob', // 这句话很重要
          data: params,
        });
        if (response.status !== 200) {
          window.console.log('网络或服务器异常！');
          return;
        }
        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        const a = window.document.createElement('a');
        const downUrl = window.URL.createObjectURL(blob); // 获取 blob 本地文件连接 (blob 为纯二进制对象，不能够直接保存到磁盘上)
        let filename = 'download.xlsx';
        if (
          response.headers['content-disposition']
          && response.headers['content-disposition'].indexOf('filename=') !== -1
        ) {
          // eslint-disable-next-line prefer-destructuring
          filename = response.headers['content-disposition'].split('filename=')[1];
          a.href = downUrl;
          a.download = `${decodeURI(filename)}` || 'download.csv';
          a.click();
          window.URL.revokeObjectURL(downUrl);
        }
      } catch (err) {
        message.error('下载超时');
        window.console.error(err);
      }
    },
  },
  console: {
    showBadge: (
      leftText: string,
      rightText: string,
      leftBgColor: string,
      rightBgColor: string,
    ) => {
      console.log(
        '%c '.concat(leftText, ' %c ').concat(rightText, ' '),
        'padding: 1px; border-radius: 3px 0 0 3px; color: #fff; background: '.concat(
          leftBgColor,
          ';',
        ),
        'padding: 1px; border-radius: 0 3px 3px 0; color: #fff; background: '.concat(
          rightBgColor,
          ';',
        ),
      );
    },
  },
  option: {
    isAdd: (obj: any) => {
      return obj.type === EditorType.add;
    },
    isUpdate: (obj: any) => {
      return obj.type === EditorType.update;
    },
    isEidtor: (obj: any) => {
      return obj.type === EditorType.eidtor;
    },
    isCopy: (obj: any) => {
      return obj.type === EditorType.copy;
    },
    isView: (obj: any) => {
      return obj.type === EditorType.view;
    },
    isReport: (obj: any) => {
      return obj.type === EditorType.report;
    },
  },
  url: {
    addParam: (host: string, param: Record<string, string> = {}) => {
      const { url, query } = qs.parseUrl(host);
      // const params = ArrayUtil.unique<string>({ ...query, ...param } as Record<string, any>, (item) => Object.keys(item)[0]);
      const params = { ...query, ...param };
      return url + (isEmpty(params) ? '' : `?${qs.stringify(params)}`);
    },
  },

};

export default FrwkUtil;
