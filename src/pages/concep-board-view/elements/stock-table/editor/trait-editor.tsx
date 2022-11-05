import React from 'react';
import { commonConfig } from '@/config/page-config/common-config';
import StockStatusController from '@/controller/stock-status-controller';
import { ComUtil } from '@/utils';
import { Popover, Select } from 'antd';
import { ArrayUtil } from 'common-toolkits';
import { isNumber } from 'lodash';
import type { FC, PropsWithChildren} from 'react';


export interface TraitEditorProps {
  record: any;
  load: () => void;
}

const getDefects = (trait) => {
  let label = '-';

  if (isNumber(trait)){
    label = (ArrayUtil.filterItemByPath(commonConfig.paramSelectList, 'value', trait)[0] as any)?.label;
  }
  return label;
}

const TraitEditor: FC<PropsWithChildren<TraitEditorProps>> = ({record, load}) => {
  const { run } = StockStatusController.updateStatus();

  const label = getDefects(record.trait);

  const onChange = (trait) => {
    const param = { date: record.date, stock_code: record.code, trait};
    ComUtil.run.common(run, { param, onSuccess: () => load()});
  }

  return  <Popover content={<Select onChange={onChange} options={commonConfig.paramSelectList} style={{ width: 150 }} />} title="特点">
      <div style={{ cursor: 'pointer', height: 36, margin: '-8px 0px', paddingTop: 8 }}>{label}</div>
    </Popover>

};

export default TraitEditor;
