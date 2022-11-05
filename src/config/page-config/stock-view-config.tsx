/* eslint-disable no-nested-ternary */

import { FrwkUtil } from '@/utils';
import type { ProColumns } from '@ant-design/pro-table';
import { DateUtil, FormatDate } from 'common-toolkits';
import moment from 'moment';
export const AbTestData = { abProductList: [] };

const currTime = DateUtil.workday() as string;

const stockViewListColumns: ProColumns[] = [
  {
    title: '日期',
    dataIndex: 'date',
    width: 150,
    hideInSearch: true,
  },
  {
    title: '名称',
    width: 150,
    dataIndex: 'stock_name',
    hideInSearch: true,
  },
  {
    title: '续板',
    width: 150,
    dataIndex: 'continuous',
    valueType: 'digit',
    initialValue: 2,
  },
  {
    title: '所属板块',
    width: 288,
    dataIndex: 'board_name',
    hideInSearch: true,
  },
  {
    title: '涨停雷达',
    dataIndex: 'text',
    hideInSearch: true,
  },
  {
    title: '编号',
    width: 100,
    dataIndex: 'stock_code',
  },
  {
    title: '日期范围',
    dataIndex: 'rang',
    valueType: 'dateRange',
    hideInTable: true,
    initialValue: [moment(currTime, FormatDate.DAY_FORMAT), moment(currTime, FormatDate.DAY_FORMAT)],
  },
];

export const createStockViewListColumns = (options: ProColumns[]): ProColumns[] => {
  return FrwkUtil.antd.proTable.extendColumns<ProColumns>(stockViewListColumns, options);
};
