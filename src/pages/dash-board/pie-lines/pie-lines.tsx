import type { PropsWithChildren } from 'react';
import React from 'react';
import { Col, Row } from 'antd';
import StatisticTotal from '../statistic-card/statistic-total';

export interface PieLinesProps{
  value?: string;
  onChange?: (value: string) => void;
}

const PieLines: React.FC<PropsWithChildren<PieLinesProps>> = ({value, onChange, ...rest}) => {
  return <>
  <Row gutter={[16, 16]}>
    <Col span={6}>
      <StatisticTotal />
    </Col>
    <Col span={6}>
      <StatisticTotal />
    </Col>
    <Col span={6} >
      <StatisticTotal />
    </Col>
    <Col span={6}>
      <StatisticTotal />
    </Col>
  </Row>
  </>
};

export default PieLines;
