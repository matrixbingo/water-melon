import React from 'react';
import type { ReactNode } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import type { CreateButtonsProps } from 'aem-ui';
import { createBaseButtons } from 'aem-ui';
import { EditorType } from '@/utils/frwk-util';
import { ArrayUtil } from 'common-toolkits';

export interface createButtonProp {
  path: string;
  children: string | ReactNode;
}

/**
 * @param buttons = [ { path: 'editor1', name: '新增1', data: { visible: true, type: EditorType.add } }, { path: 'editor2', name: '新增2': data: { visible: true, type: EditorType.add } } ];
 * @returns
 */
export const createHeaderTitleButtons = (handle, buttons: createButtonProp[], loading = false): ReactNode[] => {
  const list = ArrayUtil.addProps(buttons, { type: 'primary', icon: <PlusOutlined />, onClick: (i) => handle.update(i.path, { visible: true, type: EditorType.add }) }) as CreateButtonsProps[];
  return createBaseButtons(list);
};

export const createEditorLink = () => {

};


