/* eslint-disable @typescript-eslint/no-shadow */
import React, { useState } from 'react';
import type { FC, PropsWithChildren } from 'react';
import ReactECharts from 'echarts-for-react';
import { createOption } from './opiton';
import ConcepBoardController from '@/controller/concep-board-controller';
import { ComUtil } from '@/utils';
import { useMount } from 'ahooks';
import { Spin } from 'antd';
import { ArrayUtil, DateUtil, Period } from 'common-toolkits';
import { get, set } from 'lodash';

export interface LineStackProps {
  value?: string;
  onChange?: (value: string) => void;
}

const createSeries = (map, name, count) => {
  const data = get(map, name);
  if(!!data){
    data.push(count);
  } else {
    set(map, name, [count]);
  }
}

const BrokenLine: FC<PropsWithChildren<LineStackProps>> = ({value, onChange, ...rest}) => {
  const { loading: findConceptBoardStockRaisingLimitListLoading, run: findConceptBoardStockRaisingLimitListRun } = ConcepBoardController.findConceptBoardStockRaisingLimitList();
  const [option, setOption] = useState<any>({});

  const onSuccess = (list: any[]) => {
    const legend = [] as string[];
    const data = [] as string[];
    const series = [] as any[];
    const map = {} as any;
    list.forEach(({ board_code, count, date, name}) => {
      ArrayUtil.push(legend, name);
      ArrayUtil.push(data, date);
      createSeries(map, name, count);
    });
    Object.entries(map).forEach(([k, v]) => {
      series.push({smooth: true, type: 'line', name: k, data: v});
    })
    const option = createOption(legend, data, series);
    window.console.log('option -------->', option);
    setOption(option);
  }

  useMount(() => {
    const [bin, end] = DateUtil.rangeSub(Period.month, {rang: 1} )
    const param = { bin, end, stock_count: 10, date_count: 0}
    ComUtil.run.common(findConceptBoardStockRaisingLimitListRun, { param, onSuccess });
  })

  return <Spin spinning={findConceptBoardStockRaisingLimitListLoading}>
    <ReactECharts option={option} style={{ height: 800, width: '100%' }} />
    </Spin>
};

export default BrokenLine;
