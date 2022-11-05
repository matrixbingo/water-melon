/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable no-return-assign */
import React, { PropsWithChildren, useCallback, useMemo } from 'react';
import { useDashBoardContext } from '@/store';
import { CdpUtil, ObjectUtil, FrwkUtil } from '@/utils';
import { MaskCloseModal } from 'aem-ui';
import { ActionType } from '@ant-design/pro-table';
import { useEditor } from '@/utils/hooks';
import { message } from 'antd';
import { createForm, onFieldInputValueChange } from '@formily/core';
import { setFieldState } from '@/utils/formily-util';
import { DashBoardEnum } from '@/config/page-config/enum/dash-board-enum';
import DashBoardController from '@/controller/dash-board-controller';
import { cloneDeep } from 'lodash';
import { useMount } from 'ahooks';
import { useParallel } from 'common-toolkits-hooks';
import EditorForm from '../form/dash-board-editor-form';

export interface DashBoardEditorProps {
  actionRef: React.MutableRefObject<ActionType | undefined>;
}

const initialValues = { type: ''};

const customerEffects = {
  effects() {
    onFieldInputValueChange('eventTempId', (field, form) => {
      // changeTemp(field.value, form);
    });
  },
};

const editorToggle = (form, disabled: boolean) => {
  // setFieldState(form, { eventSourceType: (field) => field.disabled = disabled, eventTempId: (field) => field.disabled = disabled });
};

const addCallBack = (form) => {
  // const eventTempId = eventData.tempSeletList?.[0]?.value;
  // form.setValuesIn('eventTempId', eventTempId);
  // form.setValuesIn('status', 'enable');
  // changeTemp(eventTempId, form);
  editorToggle(form, false);
};

const updateCallBack = (form, editor) => {
  editorToggle(form, true);
  form.setValues(editor.item);
};

const DashBoardEditor: React.FC<PropsWithChildren<DashBoardEditorProps>> = ({ actionRef }) => {
  const form = useMemo(() => createForm(customerEffects), []);
  const { store: { editor }, handle } = useDashBoardContext();
  const { loading: saveOrUpdateLoading, run: saveOrUpdateRun } = DashBoardController.add();
  const { loading } = useParallel(saveOrUpdateLoading);

  useMount(() => {
    form.setInitialValues(initialValues);
  });

  const onCancel = useCallback((reload = false) => {
    handle.merge('editor', { visible: false, item: {} });
    form.reset();
    // form.setValuesIn('tempEventInfo', {});
    reload && actionRef?.current !== undefined && actionRef?.current.reload();
  }, []);

  useEditor(editor, {
    close: () => onCancel(true),
    add: () => addCallBack(form),
    update: () => updateCallBack(form, editor),
  });

  const onSuccess = () => {
    message.success(FrwkUtil.option.isAdd(editor) ? '添加成功！' : '修改成功！');
    onCancel(true);
  };

  const onSubmit = async () => {
    await form.validate();
    const param = ObjectUtil.proxyToObject(form.values);
    if (FrwkUtil.option.isAdd(editor)) {
      CdpUtil.run.common(saveOrUpdateRun, { param: ObjectUtil.omit(param, ['id']), onSuccess });
    } else if (FrwkUtil.option.isUpdate(editor)) {
      CdpUtil.run.common(saveOrUpdateRun, { param: { ...editor.item, ...param }, onSuccess });
    }
  };

  return (
    <MaskCloseModal title={FrwkUtil.option.isAdd(editor) ? '新增' : '编辑'} visible={editor.visible} onCancel={() => onCancel()} onSubmit={onSubmit} loading={loading}>
      <EditorForm form={form} />
    </MaskCloseModal>
  );
};

export default DashBoardEditor;
