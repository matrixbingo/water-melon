import type { FC} from 'react';
import React, { useCallback } from 'react';
import { useBoolean } from 'ahooks';
import { message } from 'antd';
import { EditableStatus } from 'aem-ui';
import { ComUtil } from '@/utils';
import BaoStockController from '@/controller/bao-stock-controller';

export interface CustomerGroupEnableProps {
  record: any;
  disabled: boolean;
}

const isChecked = (isActive) => isActive === 1;

const checkedChildren = { checkedChildren: '启用', unCheckedChildren: '暂停' };

const StatusEnable: FC<CustomerGroupEnableProps> = ({ record: { isActive, code }, disabled }) => {
  const checked = isChecked(isActive);
  const { loading: updateLoading, run: updateRun } = BaoStockController.update();
  const [state, { toggle }] = useBoolean(checked);

  const title = (
    <>
      确定将状态修改为<span style={{padding: '0 2px', color: '#f5222d' }}>{state ? '停用' : '启用'}</span>吗？
    </>
  );

  const onSuccess = useCallback(() => toggle(), []);

  const onError = useCallback(() => message.error('修改状态失败！'), []);

  const onConfirm = () => {
    ComUtil.run.common(updateRun, {
      param: { code, isActive: state ? 0 : 1 },
      onSuccess,
      onError,
    });
  };

  return (
    <EditableStatus title={title} onConfirm={onConfirm} checked={state} switchProps={{ ...checkedChildren, loading: updateLoading, disabled }} popconfirmProps={{ disabled }} />
  );
};

export default StatusEnable;
