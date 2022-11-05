/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef } from 'react';
import { useStockRaisingLimitRadarContext } from '@/store';
import type { ActionType } from '@ant-design/pro-table';
import { Spin } from 'antd';
import { useCreation } from 'ahooks';
import StockRaisingLimitRadarController from '@/controller/stock-raising-limit-radar-controller';
import { createStockRaisingLimitRadarColumns } from '@/config/page-config/stock-raising-limit-radar-config';
import WordWrap from '@/components/aem-ui/word-wrap/word-wrap';
import { TableList } from 'aem-ui-pro';
import { isEmpty, set } from 'lodash';

  const buttons = [{ path: 'editor', children: '新增' }];

  const createOptions = (props) => {
    // const { handle, actionRef } = props;
    return [
      { key: 'text', renderText: (text: any, record: any) => <WordWrap  key={record.id} >{text}</WordWrap> },
    ];
  };


  const transformParams = (params: any) => {
    const { rang } = params;
    if(!isEmpty(rang)){
      const [ bin, end ] = rang;
      set(params, 'bin', bin);
      set(params, 'end', end);
    }
    window.console.log('---------------->', params);
    return params;
  };

  const StockRaisingLimitRadarList: React.FC = () => {
    const actionRef = useRef<ActionType>();
    const { handle } = useStockRaisingLimitRadarContext();

    const columns = useCreation(() => createStockRaisingLimitRadarColumns(createOptions({ handle, actionRef })), [handle, actionRef]);

    return (
      <Spin spinning={false}>
        {/* <StockRaisingLimitRadarEditor actionRef={actionRef} /> */}
        <TableList
          columns={columns}
          actionRef={actionRef}
          headerTitle={null}
          request={(params) => StockRaisingLimitRadarController.list(transformParams(params))}
        />
      </Spin>
    );
  };

  export default StockRaisingLimitRadarList;
