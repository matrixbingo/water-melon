import { isNumber } from 'lodash';
import type { FC, PropsWithChildren} from 'react';
import React from 'react';

export interface TraitEditorProps {
  record: any;
  load: () => void;
}

export const createBackgroundColor = (continuous) => {
  if(continuous === 1){
    return '#ffe7ba';
  }
  if(continuous === 2){
    return '#ffccc7';
  }
  if(continuous === 3){
    return '#ff7875';
  }
  if(continuous === 4){
    return '#f5222d';
  }
  if(continuous === 5){
    return '#a8071a';
  }
  if(continuous > 5){
    return '#820014';
  }
  return '#ffffff';
}

const ContinuousEditor: FC<PropsWithChildren<TraitEditorProps>> = ({record, load}) => {

  return  <>
      <div style={{ cursor: 'pointer', height: 36, margin: '-8px 0px', paddingTop: 8, backgroundColor: createBackgroundColor(record.continuous), color: record.continuous > 4 ? 'white' : 'black'}}>{isNumber(record.continuous) ? record.continuous: '-'}</div>
    </>

};

export default ContinuousEditor;
