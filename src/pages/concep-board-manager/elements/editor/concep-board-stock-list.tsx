/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-return-assign */
import React, { useRef } from 'react';
import type { ProColumns } from '@ant-design/pro-components';
import ConcepBoardController from '@/controller/concep-board-controller';
import { Button, Input } from 'antd';
import { commonConfig } from '@/config/page-config/common-config';
import { ComUtil } from '@/utils';
import { SelectSearchSingle } from 'aem-ui';
import { TableList } from 'aem-ui-pro';

const columns: ProColumns[] = [
  {
    title: '名称',
    dataIndex: 'code_name',
  },
  {
    title: '代码',
    dataIndex: 'stock_code',
  },
];

const HeaderTitle = ({run, code}) => {
  const stock_code = useRef(null);

  const onChange = (v) => {
    stock_code.current = v;
  }

  const onClick = () => {
    const param = { code, stock: stock_code.current};
    ComUtil.run.common(run, { param } )
  }

  return (
    <Input.Group compact style={{ width: 400 }}>
      <SelectSearchSingle options={commonConfig.stockSelectList} onChange={onChange} style={{ width: '80%' }}/>
      <Button type="primary" onClick={onClick}>添加</Button>
    </Input.Group>
  );
}

const ConcepBoardStockList = ({ board_code: code }) => {
  const { run, loading } = ConcepBoardController.addStock();
  window.console.log('-code--------------->', code);
  return (
      <TableList
          loading={loading}
          rowKey="code"
          params={{code}}
          columns={columns}
          pagination={false}
          search={false}
          scroll={{ x: 800, y: 800}}
          request={(params) => ConcepBoardController.boardStockList(params)}
          headerTitle={<HeaderTitle run={run} code={code} />}
        />
  );
};

export default ConcepBoardStockList;
