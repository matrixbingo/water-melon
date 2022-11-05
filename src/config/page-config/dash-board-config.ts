/* eslint-disable multiline-ternary */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-nested-ternary */
import { ProColumns } from '@ant-design/pro-table';
import { FrwkUtil } from '@/utils';
import { createDashBoardSchemaXReactions } from './core/dash-board-x-reactions';
import { DashBoardSelectEnum } from './enum/dash-board-enum';

export const dashBoardConfig = {
  dashBoardType: [] as any[],
};

export const statusEnumIcon = { enable: { text: '启用', status: 'Processing' }, disable: { text: '停用', status: 'Default' } };

export const baseDashBoardColumns: ProColumns[] = [
  {
    title: '类型',
    dataIndex: 'type',
    width: 100,
    hideInSearch: true,
    fixed: 'left',
  },
  {
    title: '姓名',
    dataIndex: 'name',
    hideInSearch: true,
    width: 120,
    valueEnum: DashBoardSelectEnum,
    fixed: 'left',
  },
  {
    title: '是否显示',
    dataIndex: 'display',
    hideInSearch: true,
    width: 80,
  },
  {
    title: '默认值',
    dataIndex: 'defaultValue',
    hideInSearch: true,
    width: 100,
  },
  {
    title: '创建人',
    key: 'creator',
    dataIndex: 'creator',
    hideInSearch: true,
    width: 100,
  },
  {
    title: '创建时间',
    dataIndex: 'gmtCreated',
    width: 150,
    hideInSearch: true,
  },
  {
    title: '修改人',
    dataIndex: 'modifier',
    width: 100,
    hideInSearch: true,
  },
  {
    title: '修改时间',
    dataIndex: 'gmtModified',
    hideInSearch: true,
    width: 150,
  },
  {
    title: '操作',
    width: 90,
    key: 'option',
    valueType: 'option',
    fixed: 'right',
  },
];

export const createDashBoardColumns = (options: ProColumns[]): ProColumns[] => {
  return FrwkUtil.antd.proTable.extendColumns<ProColumns>(baseDashBoardColumns, options);
};

export const createDashBoardSchema = () => {
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
            'x-component': 'Input',
            'x-reactions': createDashBoardSchemaXReactions.type,
          },
          name: {
            type: 'string',
            title: '姓名',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'Select',
            'x-reactions': createDashBoardSchemaXReactions.name,
          },
          display: {
            type: 'string',
            title: '显示',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'Radio.Group',
            // enum: displaySelectOptions,
          },
          email: {
            type: 'string',
            title: '邮箱',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'Select',
            // enum: defaultTypeSelectOptions,
            default: 'boolean',
          },
        },
      },
    },
  };
};
