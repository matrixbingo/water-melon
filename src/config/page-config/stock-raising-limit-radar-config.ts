/* eslint-disable multiline-ternary */
/* eslint-disable no-nested-ternary */
import type { ProColumns } from '@ant-design/pro-table';
import { FrwkUtil } from '@/utils';
import { createStockRaisingLimitRadarSchemaXReactions } from './core/stock-raising-limit-radar-x-reactions';
import moment from 'moment';
import { DateUtil, FormatDate } from 'common-toolkits';

const currTime = DateUtil.workday() as string;

export const StockRaisingLimitRadarConfig = {
    StockRaisingLimitRadarType: [] as any[],
  };

export const statusEnumIcon = { enable: { text: '启用', status: 'Processing' }, disable: { text: '停用', status: 'Default' } };


  export const baseStockRaisingLimitRadarColumns: ProColumns[] = [
    {
      title: '日期',
      dataIndex: 'date',
      width: 100,
      hideInSearch: true,
      fixed: 'left',
    },
    {
      title: '股票代码',
      dataIndex: 'stock_code',
      width: 120,
      fixed: 'left',
    },
    {
      title: '股票名称',
      dataIndex: 'stock_name',
      width: 120,
    },
    {
      title: '标题',
      dataIndex: 'title',
      hideInSearch: true,
      ellipsis: true,
      width: 300,
    },
    {
      title: '内容',
      dataIndex: 'text',
      hideInSearch: true,
    },
    {
      title: '日期范围',
      dataIndex: 'rang',
      valueType: 'dateRange',
      hideInTable: true,
      initialValue: [moment(currTime, FormatDate.DAY_FORMAT), moment(currTime, FormatDate.DAY_FORMAT)],
    },
  ];

export const createStockRaisingLimitRadarColumns = (options: ProColumns[]): ProColumns[] => {
    return FrwkUtil.antd.proTable.extendColumns<ProColumns>(baseStockRaisingLimitRadarColumns, options);
  };

export const createStockRaisingLimitRadarSchema = () => {
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
              'x-reactions': createStockRaisingLimitRadarSchemaXReactions.type,
            },
            name: {
              type: 'string',
              title: '姓名',
              required: true,
              'x-decorator': 'FormItem',
              'x-component': 'Select',
              'x-reactions': createStockRaisingLimitRadarSchemaXReactions.name,
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
