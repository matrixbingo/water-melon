/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-return-assign */
/* eslint-disable react-hooks/exhaustive-deps */
import type { FC, PropsWithChildren} from 'react';
import React, { useCallback, useMemo, useRef } from 'react';
import { useParamContext } from '@/store';
import { ComUtil, FrwkUtil } from '@/utils';
import { createForm } from '@formily/core';
import { MaskCloseModal } from 'aem-ui';
import type { ActionType } from '@ant-design/pro-table';
import { toJS } from '@formily/reactive';
import { useEditor } from '@/utils/hooks';
import { message } from 'antd';
import { ObjectUtil } from 'common-toolkits';
import ParamForm from '../form/param-form';
import ParamController from '@/controller/param-controller';

export interface RealTimeTagEditorProps {
  actionRef: React.MutableRefObject<ActionType | undefined>;
}

const ParamEditor: FC<PropsWithChildren<RealTimeTagEditorProps>> = ({ actionRef }) => {
  const form = useMemo(() => createForm(), []);
  const { store: { editor }, handle } = useParamContext();
  const { loading: addLoading, run: addRun } = ParamController.add();
  const { loading: updateLoading, run: updateRun } = ParamController.update();
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
      ComUtil.run.common(addRun, { param, onSuccess });
    } else if (FrwkUtil.option.isUpdate(editor)) {
      ComUtil.run.common(updateRun, { param: ObjectUtil.omit({ ...item, ...param }, ['children', 'subTypes']), onSuccess });
    }
  };

  return (
    <MaskCloseModal title={FrwkUtil.option.isAdd(editor) ? '新增分类' : '编辑分类'} visible={editor.visible} onCancel={() => onCancel()} onSubmit={onSubmit} loading={addLoading || updateLoading} size="normal">
      <ParamForm form={form} />
    </MaskCloseModal>
  );
};

export default ParamEditor;
