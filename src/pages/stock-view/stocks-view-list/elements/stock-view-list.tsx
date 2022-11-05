/* eslint-disable no-return-assign */
import React, { useRef } from 'react';
import { useStockViewContext } from '@/store';
import type { ActionType } from '@ant-design/pro-table';
import { Button } from 'antd';
import { EditorType } from '@/utils/frwk-util';
import StockViewController from '@/controller/stock-view-controller';
import { createStockViewListColumns } from '@/config/page-config/stock-view-config';
import { createBackgroundColor } from '@/pages/concep-board-view/elements/stock-table/editor/continuous-editor';
import WordWrap from '@/components/aem-ui/word-wrap/word-wrap';
import { TableList } from 'aem-ui-pro';

const createOptions = (props) => {
  const { handle } = props;
  return [
    { key: 'text', renderText: (text: any, record: any) => <WordWrap  key={record.id} >{text}</WordWrap> },
    { key: 'continuous', render: (text: any, record: any) => <div style={{ cursor: 'pointer', height: 36, margin: '-8px 0px', paddingTop: 8, textAlign: 'center', color: record.continuous > 3 ? 'white': 'black', backgroundColor: createBackgroundColor(record.continuous)}}>{record.continuous}</div> },
    {
      key: 'option',
      render: (text: any, record: any) => [
        <Button key={record.id} type="link" onClick={() => { handle.update('editor', { visible: true, type: EditorType.update, item: record }); }}>编辑</Button>,
      ],
    },
  ];
};

const StockViewList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const { handle } = useStockViewContext();

  const columns = createStockViewListColumns(createOptions({ handle }))

  return (
    <>
      {/* <ParamEditor actionRef={actionRef} /> */}
      <TableList
          rowKey="code"
          columns={columns}
          actionRef={actionRef}
          request={(params) => StockViewController.list(params)}
        />
    </>

  );
};

export default StockViewList;
