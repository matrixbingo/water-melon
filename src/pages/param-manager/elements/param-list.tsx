/* eslint-disable no-return-assign */
import type { FC} from 'react';
import React, { useRef } from 'react';
import { createHeaderTitleButtons } from '@/components/util/components-util';
import { useParamContext } from '@/store';
import type { ActionType } from '@ant-design/pro-table';
import { Button, Space } from 'antd';
import { EditorType } from '@/utils/frwk-util';
import StatusEnable from '../common/status-enable';
import { createParamListColumns } from '@/config/page-config/param-config';
import ParamController from '@/controller/param-controller';
import ParamEditor from './editor/param-editor';
import { TableList } from 'aem-ui-pro';

const buttons = [{ path: 'editor', children: '新增' }];

const createOptions = (props) => {
  const { handle } = props;
  return [
    { key: 'status', render: (text: any, record: any) => <StatusEnable key={record.code} record={record} disabled={false} /> },
    {
      key: 'option',
      render: (text: any, record: any) => [
        <Button key={record.id} type="link" onClick={() => { handle.update('editor', { visible: true, type: EditorType.update, item: record }); }}>编辑</Button>,
      ],
    },
  ];
};

const ParamList: FC = () => {
  const actionRef = useRef<ActionType>();
  const { handle } = useParamContext();

  const columns = createParamListColumns(createOptions({ handle }))

  return (
    <>
      <ParamEditor actionRef={actionRef} />
      <TableList
          rowKey="code"
          columns={columns}
          actionRef={actionRef}
          headerTitle={<Space>{createHeaderTitleButtons(handle, buttons)}</Space>}
          request={(params) => ParamController.paramList(params)}
        />
    </>

  );
};

export default ParamList;
