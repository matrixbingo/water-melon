/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-return-assign */
import type { FC} from 'react';
import { useState} from 'react';
import React, { useRef } from 'react';
import { Calendar, Col, InputNumber, Row, Spin } from 'antd';
import type { Moment } from 'moment';
import { isMoment } from 'moment';
import BaoStockController from '@/controller/bao-stock-controller';
import { ComUtil } from '@/utils';
import { isArray, isEmpty, isString } from 'lodash';
import moment from 'moment';
import { useStockViewContext } from '@/store';
import ParamController from '@/controller/param-controller';
import { useMount } from 'ahooks';
import { DateUtil, FormatDate } from 'common-toolkits';

export interface StockBoardProps {
  "board_stocks": string,
  "code": number;
  "count": number;
  "date": string;
  "name": string;
  "stock_code": string;
}

const type = { time: 0, min: 1 };

const currTime = DateUtil.workday() as string;

const StockView: FC = () => {
  const { loading: findStockBoardListLoading, run: findStockBoardListRun } = BaoStockController.findStockBoardList();
  const { loading: paramSelectListLoading, run: paramSelectListRun } = ParamController.paramSelectList();
  const { store: { view }, handle } = useStockViewContext();
  const [data, setData] = useState<any>({ xAxis: [], seriesRaisingLimit: [], seriesAll: []});
  const paramRef = useRef<any>({time: moment(), min: 5});

  const onSuccess = (data: StockBoardProps[]) => {
    // const chartData = { xAxis: [] as any[], seriesRaisingLimit: [] as any[], seriesAll: [] as any[]};
    // if(!isEmpty(data) && isArray(data)){
    //   data.forEach(i => {
    //     chartData.xAxis.push(i.name);
    //     chartData.seriesRaisingLimit.push(i.count);
    //     chartData.seriesAll.push(Number(i.board_stocks) - Number(i.count));
    //   })
    // }
    // const option = createOptions(chartData);
    // setData(option);
  }

  const onChange = (value: Moment | string, min: number, _type: number) => {
    let _value = ''
    if(isMoment(value)){
      _value = value.format('YYYY-MM-DD');
    }else if(isString(value)){
      _value = value
    };

    if(_type === type.time){
      paramRef.current.time = _value;
    }else{
      paramRef.current.min = min;
    }
    const param = { date: _value, min };
    ComUtil.run.common(findStockBoardListRun, { param, onSuccess });
  };

  useMount(() => {
    ComUtil.run.common(paramSelectListRun);
    onChange(moment(currTime, FormatDate.DAY_FORMAT), paramRef.current.min, type.time);
  })

  return (
    <Spin spinning={findStockBoardListLoading || paramSelectListLoading}>
      <Row>
        <Col span={20}>
          {/* <ReactECharts option={data} style={{ height: 1500 }} onEvents={ { click: ({ name }) => handle.merge('view', { visible: true, item: { date: paramRef.current.time, name }}) }}/> */}
        </Col>
        <Col span={4}>
          <div className="site-calendar-demo-card">
            <Calendar defaultValue={moment(currTime, FormatDate.DAY_FORMAT)} fullscreen={false} onChange={(v) => onChange(v, paramRef.current.min, type.time)}/>
          </div>
          <InputNumber style={{ width: 300 }} onChange={(v) => onChange(paramRef.current.time, v, type.min)}
            addonBefore={<span style={{ width: 180 }} >最少涨停数</span>}
            defaultValue={2}
          />
        </Col>
      </Row>
    </Spin>
  );
};

export default StockView;
