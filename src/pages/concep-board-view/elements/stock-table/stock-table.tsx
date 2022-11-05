/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
import type { FC} from 'react';
import { useEffect} from 'react';
import { useState } from 'react';
import React from 'react';
import type { ProColumns } from '@ant-design/pro-components';
import { DragSortTable } from '@ant-design/pro-components';
import BaoStockController from '@/controller/bao-stock-controller';
import { ComUtil, FrwkUtil } from '@/utils';
import { Tooltip } from 'antd';
import './stock-table.less';
import { useCreation } from 'ahooks';
import TraitEditor from './editor/trait-editor';
import DefectsEditor from './editor/defects-editor';
import ContinuousEditor from './editor/continuous-editor';
import { VerticalAlignBottomOutlined } from '@ant-design/icons';
import { exportCSV } from 'export.js/csv';
import StockNameEditor from './editor/stock-name-editor';
import { sortBy } from 'lodash';
import StockSelect from '../stock-k-line/stock-select';
import { TransformUtil } from 'common-toolkits';

export interface StockTableProps {
  date: string,
  board_code: number;
}

const stockListColumns: ProColumns[] = [
  {
    title: '排序',
    dataIndex: 'sort',
    width: '10px',
  },
  {
    title: '名称',
    dataIndex: 'stock_name',
    width: '20px',
    align:  "center"
  },
  {
    title: '板数',
    dataIndex: 'continuous',
    width: '10px',
    align:  "center"
  },
  {
    title: '瑕',
    dataIndex: 'defects',
    width: '5px',
    align:  "center"
  },
  {
    title: '特点',
    dataIndex: 'trait',
    width: '34px',
    align:  "center"
  },
  // {
  //   title: '操作',
  //   width: 3,
  //   key: 'option',
  // },
];

const createStockListColumns = (options: ProColumns[]): ProColumns[] => {
  return FrwkUtil.antd.proTable.extendColumns<ProColumns>(stockListColumns, options);
};

const createOptions = (props) => {
  const { load } = props;
  return [
    { key: 'stock_name', render: (text: any, record: any) => <StockNameEditor key={record.date + record.code} record={record} load={load} /> },
    { key: 'continuous', render: (text: any, record: any) => <ContinuousEditor key={record.date + record.code} record={record} load={load} /> },
    { key: 'defects', render: (text: any, record: any) => <DefectsEditor key={record.date + record.code} record={record} load={load} /> },
    { key: 'trait', render: (text: any, record: any) => <TraitEditor key={record.date + record.code} record={record} load={load} /> },
    // {
    //   key: 'option',
    //   render: (text: any, record: any) => [
    //     <Button key={record.id} type="link" onClick={() => { handle.update('editor', { visible: true, type: EditorType.update, item: record }); }}>编辑</Button>,
    //   ],
    // },
  ];
};

const exportFile = (dataSource, date) => {
  const data = [{
    th: ['代码', '名称'],
    td: [] as any[]
  }]
  dataSource.forEach((i: any) => data[0].td.push([i.code, i.stock_name]));
  exportCSV(date, data)
}

const StockTable: FC<StockTableProps> = ({date, board_code}) => {
  const { loading: findAllStockListLoading,  run: findAllStockListRun  } = BaoStockController.findAllStockList();
  const { loading: updateStockSortLoading,  run: updateStockSortRun  } = BaoStockController.updateStockSort();
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [size, setSize] = useState<number>(0);
  const [options, setOptions] = useState<{ value: string, label: string }[]>([]);

  const onSuccess = (data) => {
    setDataSource(sortBy(data, ['continuous']).reverse());
    setSize(data?.length);
    setOptions(TransformUtil.select.formatArray(data, { value: 'code', label: 'stock_name' }));
  }

  const load = () => ComUtil.run.common(findAllStockListRun, { param: { date, board_code }, onSuccess });

  useEffect(() => {
    load();
  }, [board_code]);

  const handleDragSortEnd2 = (newDataSource: any) => {
    ComUtil.run.common(updateStockSortRun, { param: { board_code, list: newDataSource}, onSuccess: () => setDataSource(newDataSource)});
  };

  const reload = () => {
    load();
  }

  const columns = useCreation(() => createStockListColumns(createOptions({ load })), [load]);

  return (
    <div className="stock-table">
      <DragSortTable
        headerTitle={<StockSelect value={options} title={<span style={{ marginLeft: 25, color: 'red' }}>{size}</span>} />}
        rowKey="stock_name"
        dragSortKey="sort"
        loading={findAllStockListLoading || updateStockSortLoading}
        bordered={false}
        columns={columns}
        search={false}
        dataSource={dataSource}
        pagination={false}
        defaultSize="small"
        onDragSortEnd={handleDragSortEnd2}
        columnsState={{defaultValue: {sort:{show:false}, option:{show:false}}}}
        options={{reload}}
        toolBarRender={() => [<Tooltip title="导出"><VerticalAlignBottomOutlined style={{ cursor: 'pointer' }} onClick={() => exportFile(dataSource, date)} /></Tooltip>]}
      />
    </div>
    );
};

export default StockTable;
