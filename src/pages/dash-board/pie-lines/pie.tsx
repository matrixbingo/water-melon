import type { PropsWithChildren } from 'react';
import React from 'react';
import ReactECharts from 'echarts-for-react';
import { createPieOption } from '@/utils/echarts/pie-util';

const data = createPieOption();

export interface PieProps {
  value?: string;
  onChange?: (value: string) => void;
}

const Pie: React.FC<PropsWithChildren<PieProps>> = ({value, onChange, ...rest}) => {

  const onClick = ({ name }) => {
    //  handle.merge('view', { visible: true, item: { date: paramRef.current.time, name }})
    window.console.log('---------------->', name);
  }

  return <>
    <ReactECharts option={data} style={{ height: 400 }} onEvents={ { click: onClick }}/>
  </>
};

export default Pie;
