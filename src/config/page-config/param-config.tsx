/* eslint-disable no-nested-ternary */

import { FrwkUtil } from '@/utils';
import type { ProColumns } from '@ant-design/pro-table';
import { raisingLimitSelectEnum, raisingLimitSelectOptions } from '../enum/param-enum';
export const AbTestData = { abProductList: [] };

// export const statusEnumIcon = {
//   1: { text: '涨势类型', status: 'Processing' },
//   // 0: { text: '停用', status: 'Error' },
// };

const paramListColumns: ProColumns[] = [
  {
    title: '类型',
    dataIndex: 'type',
    valueEnum: raisingLimitSelectEnum,
  },
  {
    title: '编号',
    dataIndex: 'code',
  },
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: '添加时间',
    dataIndex: 'insert_time',
    hideInSearch: true,
  },
  // {
  //   title: '操作',
  //   width: 120,
  //   key: 'option',
  //   valueType: 'option',
  //   fixed: 'right',
  // },
];

export const createParamListColumns = (options: ProColumns[]): ProColumns[] => {
  return FrwkUtil.antd.proTable.extendColumns<ProColumns>(paramListColumns, options);
};

export const createParamEditorSchema = () => {
  return {
    type: 'object',
    properties: {
      layout: {
        type: 'void',
        'x-component': 'FormLayout',
        'x-component-props': {
          labelCol: 3,
          wrapperCol: 21,
        },
        properties: {
          type: {
            type: 'string',
            title: '类型',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'Select',
            enum: raisingLimitSelectOptions,
          },
          code: {
            type: 'string',
            title: '编号',
            'x-decorator': 'FormItem',
            'x-component': 'NumberPicker',
            'x-component-props': {
              max:20
            },
          },
          name: {
            type: 'string',
            title: '名称',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
          },
        },
      },
    },
  };
};
