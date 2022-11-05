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

const options = [{value:1, label:1}, {value:2, label:2}, {value:3, label:3}]

const createBackgroundColor = (defects) =>{
  if(defects === 1){
    return '#d9f7be';
  }
  if(defects === 2){
    return '#389e0d';
  }
  return '#ffffff';
}

const DefectsEditor: FC<PropsWithChildren<TraitEditorProps>> = ({record, load}) => {
  const { run } = StockStatusController.updateStatus();

  const onChange = (defects) => {
    const param = { date: record.date, stock_code: record.code, defects};
    ComUtil.run.common(run, { param, onSuccess: () => load()});
  }

  return  <Popover content={<Select onChange={onChange} options={options} style={{ width: 150 }} />} title="瑕疵">
      <div style={{ cursor: 'pointer', height: 36, margin: '-8px 0px', paddingTop: 8, backgroundColor: createBackgroundColor(record.defects)}}>{isNumber(record.defects) ? record.defects: '-'}</div>
    </Popover>

};

export default DefectsEditor;
