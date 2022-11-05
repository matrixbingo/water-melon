import { useConcepBoardContext } from '@/store';
import type { PopoverProps} from 'antd';
import { Select } from 'antd';
import { Popover } from 'antd';
import { ArrayUtil } from 'common-toolkits';
import { cloneDeep, isEmpty } from 'lodash';
import type { PropsWithChildren } from 'react';
import React from 'react';

export interface StockSelectProps extends Omit<PopoverProps, 'value' | 'onChange'> {
  value?: { value: string, label: string }[];
}

const StockSelect: React.FC<PropsWithChildren<StockSelectProps>> = ({value, title, ...rest}) => {

  const { store: { stocks }, handle } = useConcepBoardContext();

  const onChange = (values: string[]) => {
    if(isEmpty(values)){
      handle.save('stocks', []);
      return;
    }
    const list = cloneDeep(stocks);
    ArrayUtil.pushArray(list, values, (i) => !list.includes(i));
    handle.save('stocks', list);
  }

  return <Popover placement="top" title="查看" content={<Select mode="multiple" style={{ width: '100%' }} options={value} onChange={onChange} />}>
    <span style={{ cursor: 'pointer' }}>{title}</span>
</Popover>
};

export default StockSelect;
