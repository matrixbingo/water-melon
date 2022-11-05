/* eslint-disable @typescript-eslint/no-unused-expressions */

import type { FC, PropsWithChildren} from 'react';
import React, { useCallback, useMemo } from 'react';
import { useStockRaisingLimitRadarContext } from '@/store';
import type { ActionType } from '@ant-design/pro-table';
import { useEditor } from '@/utils/hooks';
import { message } from 'antd';
import { createForm, onFieldInputValueChange } from '@formily/core';
import { toJS } from '@formily/reactive';
import StockRaisingLimitRadarController from '@/controller/stock-raising-limit-radar-controller';
import { useMount } from 'ahooks';
import EditorForm from '../form/stock-raising-limit-radar-editor-form';
import { useParallel } from 'common-toolkits-hooks';
import { ObjectUtil } from 'common-toolkits';
import { MaskCloseModal } from 'aem-ui';
import FrwkUtil from '@/utils/frwk-util';
import { ComUtil } from '@/utils';

  export interface StockRaisingLimitRadarEditorProps {
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

  const StockRaisingLimitRadarEditor: FC<PropsWithChildren<StockRaisingLimitRadarEditorProps>> = ({ actionRef }) => {
    const form = useMemo(() => createForm(customerEffects), []);
    const { store: { editor }, handle } = useStockRaisingLimitRadarContext();
    const { loading: saveOrUpdateLoading, run: saveOrUpdateRun } = StockRaisingLimitRadarController.add();
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
      const param = toJS(form.values);
      if (FrwkUtil.option.isAdd(editor)) {
        ComUtil.run.common(saveOrUpdateRun, { param: ObjectUtil.omit(param, ['id']), onSuccess });
      } else if (FrwkUtil.option.isUpdate(editor)) {
        ComUtil.run.common(saveOrUpdateRun, { param: { ...editor.item, ...param }, onSuccess });
      }
    };

    return (
      <MaskCloseModal title={FrwkUtil.option.isAdd(editor) ? '新增' : '编辑'} visible={editor.visible} onCancel={() => onCancel()} onSubmit={onSubmit} loading={loading}>
        <EditorForm form={form} />
      </MaskCloseModal>
    );
  };

  export default StockRaisingLimitRadarEditor;
