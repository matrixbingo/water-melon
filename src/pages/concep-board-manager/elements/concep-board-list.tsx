/* eslint-disable no-return-assign */
import type { FC} from 'react';
import React, { useRef } from 'react';
import { createHeaderTitleButtons } from '@/components/util/components-util';
import { useConcepBoardContext } from '@/store';
import type { ActionType } from '@ant-design/pro-table';
import { Button, Space } from 'antd';
import { createConcepBoardListColumns } from '@/config/page-config/concep-board-config';
import { EditorType } from '@/utils/frwk-util';
import StatusEnable from '../common/status-enable';
import ConcepBoardEditor from './editor/concep-board-editor';
import ConcepBoardController from '@/controller/concep-board-controller';
import BaoStockController from '@/controller/bao-stock-controller';
import { useMount } from 'ahooks';
import { ComUtil } from '@/utils';
import { View } from 'aem-ui';
import { useParallel } from 'common-toolkits-hooks';
import { TableList } from 'aem-ui-pro';

const buttons = [{ path: 'editor', children: '新增板块' }];

const createOptions = (props) => {
  const { handle, updateBoardRaisingLimitByBoardCode } = props;
  return [
    { key: 'isActive', render: (text: any, record: any) => <StatusEnable key={record.code} record={record} disabled={false} /> },
    {
      key: 'option',
      render: (text: any, record: any) => [
        <Button key={record.id} type="link" onClick={() => { handle.update('editor', { visible: true, type: EditorType.update, item: record }); }}>编辑</Button>,
        <Button key={record.id} type="link" onClick={() => { updateBoardRaisingLimitByBoardCode(record.code); }}>刷新</Button>,
      ],
    },
  ];
};

const ConcepBoardList: FC = () => {
  const actionRef = useRef<ActionType>();
  const { handle } = useConcepBoardContext();
  const {run, loading: stockSelectListLoading} = BaoStockController.stockSelectList();
  const { run: updateBoardRaisingLimitByBoardCodeRun, loading: updateBoardRaisingLimitByBoardCodeLoading } = ConcepBoardController.updateBoardRaisingLimitByBoardCode();

  const updateBoardRaisingLimitByBoardCode = (board_code) => {
    ComUtil.run.common(updateBoardRaisingLimitByBoardCodeRun, { param: { code: board_code}});
  }

  const { ready } = useParallel(stockSelectListLoading);

  useMount(()=>{
    ComUtil.run.common(run);
  })

  const columns = createConcepBoardListColumns(createOptions({ handle, updateBoardRaisingLimitByBoardCode }))

  return (
      <>
        <View destroy={!ready}>
          <ConcepBoardEditor actionRef={actionRef} />
        </View>
        <TableList
          loading={updateBoardRaisingLimitByBoardCodeLoading}
          rowKey="code"
          columns={columns}
          actionRef={actionRef}
          headerTitle={<Space>{createHeaderTitleButtons(handle, buttons)}</Space>}
          request={(params) => ConcepBoardController.boardList(params)}
        />
      </>
  );
};

export default ConcepBoardList;
