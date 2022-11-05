/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';
import { BaseResult } from '@ahooksjs/use-request/lib/types';
import { TransformUtil } from 'common-toolkits';
import { useParallel } from 'common-toolkits-hooks';

import FrwkUtil from './frwk-util';

export interface EditorOptions { open?: () => void; close?: () => void; add?: () => void; update?: () => void; editor?: () => void; copy?: () => void; view?: () => void; unmount?: () => void }

export const useEditor = (item: {visible: boolean; type: number}, options: EditorOptions) => {
  const { open, close, add, update, editor, copy, view, unmount } = options;
  const isMounted = useRef(false);
  useEffect(() => {
    if (item.visible) {
      open?.();
    } else if (!item.visible) {
      if (!isMounted.current) {
        isMounted.current = true;
      } else {
        close?.();
      }
    }
    if (item.visible) {
      if (FrwkUtil.option.isAdd(item)) {
        add?.();
      } else if (FrwkUtil.option.isEidtor(item)) {
        editor?.();
      } else if (FrwkUtil.option.isUpdate(item)) {
        update?.();
      } else if (FrwkUtil.option.isCopy(item)) {
        copy?.();
      } else if (FrwkUtil.option.isView(item)) {
        view?.();
      }
    }
    return () => unmount?.();
  }, [item.visible]);
};

export const useResultParallel = (BaseResults: BaseResult<any, any>[]) => {
  const loadings = TransformUtil.toArrByPath(BaseResults, 'loading') as boolean[];
  return useParallel(...loadings);
};

export interface ReadyOptions { ready?: () => void }

export const useReady = (isReady: boolean, options: ReadyOptions) => {
  const { ready } = options;
  useEffect(() => {
    if (isReady) {
      ready?.();
    }
  }, [isReady]);
};
