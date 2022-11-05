/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef } from 'react';
import { createHeaderTitleButtons } from '@/components/util/components-util';
import { useDashBoardContext } from '@/store';
import { EditorType } from '@/utils/frwk-util';
import { ActionType } from '@ant-design/pro-table';
import { Button, Space, Spin } from 'antd';
import { TableList } from 'aem-ui-pro';
import { useCreation, useMount } from 'ahooks';
import DashBoardController from '@/controller/dash-board-controller';
import { baseDashBoardColumns, createDashBoardColumns } from '@/config/page-config/dash-board-config';
import CdpCommonController from '@/controller/cdp-common-controller';
import { CdpUtil } from '@/utils';
import { ButtonConfirm } from 'aem-ui';
// import DashBoardStatusEnable from '../../common/dash-board-status-enable';
import DashBoardEditor from './editor/dash-board-editor';

const buttons = [{ path: 'editor', children: '新增' }];

const createOptions = (props) => {
  const { handle, actionRef, deleteDashBoard } = props;
  return [
    // { key: 'status', render: (text: any, record: any) => <DashBoardStatusEnable key={record.id} record={record} disabled={false} actionRef={actionRef} /> },
    {
      key: 'option',
      render: (text: any, record: any) => [
        <Button key={record.id} type="link" onClick={() => { handle.update('editor', { visible: true, type: EditorType.update, item: record }); }}>编辑</Button>,
      ],
    },
    {
      key: 'option',
      render: (text: any, record: any) => (
        <Space size={2}>
          <Button key={`Button${record.id}`} type="link" style={{ display: record.type === 0 ? 'none' : 'block' }} onClick={() => { handle.update('editor', { visible: true, type: EditorType.update, item: record }); }}>编辑</Button>
          <ButtonConfirm key={`ButtonConfirm${record.id}`} title={`是否确认删除权限组 ${record.name} ?`} buttonProps={{ type: 'link', children: '删除', style: { display: record.type === 0 || (num(record, permmissonTagType.realTime) > 0 || num(record, permmissonTagType.offlineTag) > 0) ? 'none' : 'block' } }} onConfirm={deleteDashBoard} />
        </Space>
      ),
    },
  ];
};

const DashBoardList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const { handle } = useDashBoardContext();
  const { loading: deleteLoading, run: deleteRun } = DashBoardController.delete();

  const loading = deleteLoading;
  
  const deleteDashBoard = (id) => {
    CdpUtil.run.flowAbt(deleteRun, { param: { id }, onSuccess: () => reload() });
  };

  // const [columns, setColumns] = useState(cloneDeep(baseDashBoardColumns));
  // const { loading: realTimeTagSelectListLoading, run: realTimeTagSelectListRun } = CommonController.realTimeTagSelectList();
  // useMount(() => {
  //   CdpUtil.run.userInsight(realTimeTagSelectListRun, { param: { status: 1 } });
  // });
  // const { ready, loading } = useParallel(abProductListLoading, systemToolsConfigLoading, labelAndTypesLoading);
  // seReady(ready, { ready: () => setColumns(createDashBoardColumns(createOptions({ handle, actionRef }))) });

  
  const columns = useCreation(() => createDashBoardColumns(createOptions({ handle, actionRef })), [handle, actionRef]);

  return (
    <Spin spinning={false}>
      <DashBoardEditor actionRef={actionRef} />
      <TableList
        columns={columns}
        actionRef={actionRef}
        headerTitle={<Space>{createHeaderTitleButtons(handle, buttons)}</Space>}
        request={(params) => DashBoardController.list(params)}
      />
    </Spin>
  );
};

export default DashBoardList;
