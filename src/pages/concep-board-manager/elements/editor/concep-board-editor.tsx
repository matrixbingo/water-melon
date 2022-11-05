/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-return-assign */
/* eslint-disable react-hooks/exhaustive-deps */
import type { FC, PropsWithChildren} from 'react';
import React, { useCallback, useMemo, useRef } from 'react';
import { useConcepBoardContext } from '@/store';
import { ComUtil, FrwkUtil } from '@/utils';
import { createForm } from '@formily/core';
import { MaskCloseModal } from 'aem-ui';
import type { ActionType } from '@ant-design/pro-table';
import { toJS } from '@formily/reactive';
import { useEditor } from '@/utils/hooks';
import { message } from 'antd';
import { ObjectUtil } from 'common-toolkits';
import ConcepBoardController from '@/controller/concep-board-controller';
import ConcepBoardStockList from './concep-board-stock-list';

export interface RealTimeTagEditorProps {
  actionRef: React.MutableRefObject<ActionType | undefined>;
}

const ConcepBoardEditor: FC<PropsWithChildren<RealTimeTagEditorProps>> = ({ actionRef }) => {
  const form = useMemo(() => createForm(), []);
  const { store: { editor }, handle } = useConcepBoardContext();
  // const { loading: addLoading, run: addRun } = ConcepBoardController.add();
  const { loading: updateLoading, run: updateRun } = ConcepBoardController.update();
  const item = useRef<Object>({});

  const onCancel = useCallback((reload = false) => {
    handle.merge('editor', { visible: false, item: {} });
    form.reset();
    item.current = {};
    reload && actionRef?.current !== undefined && actionRef?.current.reload();
  }, []);

  const onSuccess = useCallback(() => {
    message.success(FrwkUtil.option.isAdd(editor) ? '添加成功！' : '修改成功！');
    onCancel(true);
  }, []);


  useEditor(editor, {
    close: () => onCancel(),
  });

  const onSubmit = async (setLoading) => {
    await form.validate();
    setLoading(true);
    const param = toJS(form.values);
    if (FrwkUtil.option.isAdd(editor) || FrwkUtil.option.isEidtor(editor)) {
      // ComUtil.run.common(addRun, { param, onSuccess });
    } else if (FrwkUtil.option.isUpdate(editor)) {
      ComUtil.run.common(updateRun, { param: ObjectUtil.omit({ ...item, ...param }, ['children', 'subTypes']), onSuccess });
    }
  };

  return (
    <MaskCloseModal title={FrwkUtil.option.isAdd(editor) ? '新增板块' : '编辑板块'} visible={editor.visible} onCancel={() => onCancel()} loading={updateLoading} size="large">
      <ConcepBoardStockList board_code={editor.item.code} />
    </MaskCloseModal>
  );
};

export default ConcepBoardEditor;
