import ThemeColor from '@/components/pro-components/theme-color/theme-color';
import StockStatusController from '@/controller/stock-status-controller';
import { ComUtil } from '@/utils';
import { Popover, Select } from 'antd';
import { isNumber } from 'lodash';
import type { FC, PropsWithChildren} from 'react';
import React from 'react';

export interface TraitEditorProps {
  record: any;
  load: () => void;
}

const DefectsEditor: FC<PropsWithChildren<TraitEditorProps>> = ({record, load}) => {
  // const { run } = StockStatusController.updateStatus();

  const onChange = (v) => {
    window.console.log('---------------->', v);
   // const param = { date: record.date, stock_code: record.code, defects};
   // ComUtil.run.common(run, { param, onSuccess: () => load()});
  }

  return  <Popover content={<ThemeColor onChange={onChange} value="" />} title="color">
      <span style={{ cursor: 'pointer' }}>{record.continuous}</span>
    </Popover>

};

export default DefectsEditor;
