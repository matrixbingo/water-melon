/* eslint-disable no-nested-ternary */

import { FrwkUtil } from '@/utils';
import type { ProColumns } from '@ant-design/pro-table';
import { commonConfig } from './common-config';
export const AbTestData = { abProductList: [] };

export const statusEnumIcon = {
  1: { text: '使用', status: 'Processing' },
  0: { text: '停用', status: 'Error' },
};

const concepBoardListColumns: ProColumns[] = [
  {
    title: 'code',
    dataIndex: 'code',
    hideInSearch: true,
  },
  {
    title: '概念板块名',
    dataIndex: 'name',
  },
  {
    title: '状态',
    dataIndex: 'isActive',
    valueEnum: statusEnumIcon,
  },
  {
    title: '添加时间',
    dataIndex: 'insert_time',
    hideInSearch: true,
  },
  {
    title: '操作',
    width: 120,
    key: 'option',
    valueType: 'option',
    fixed: 'right',
  },
];

export const createConcepBoardListColumns = (options: ProColumns[]): ProColumns[] => {
  return FrwkUtil.antd.proTable.extendColumns<ProColumns>(concepBoardListColumns, options);
};


export const createConcepBoardEditorSchema = () => {
  return {
    type: 'object',
    properties: {
      layout: {
        type: 'void',
        'x-component': 'FormLayout',
        'x-component-props': {
          labelCol: 4,
          wrapperCol: 20,
        },
        properties: {
          name: {
            type: 'string',
            title: '名称',
            'x-decorator': 'FormItem',
            'x-component': 'SelectSearchSingle',
            'x-component-props': {
              options: commonConfig.stockSelectList,
            }
          },
        },
      },
    },
  };
};
