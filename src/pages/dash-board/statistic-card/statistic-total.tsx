import React from 'react';
import type { PropsWithChildren } from 'react';
import { EllipsisOutlined, RightOutlined } from '@ant-design/icons';
import { Space, Statistic } from 'antd';
import { StatisticCard } from '@ant-design/pro-components';


export interface StatisticCardProps {
  value?: string;
  onChange?: (value: string) => void;
}

const StatisticTotal: React.FC<PropsWithChildren<StatisticCardProps>> = ({value, onChange, ...rest}) => {
  return <StatisticCard title={
    <Space>
      <span>部门一</span>
      <RightOutlined style={{ color: 'rgba(0,0,0,0.65)' }} />
    </Space>
  }
  extra={<EllipsisOutlined />}
  chart={
    <>
      <img
        src="https://gw.alipayobjects.com/zos/alicdn/BA_R9SIAV/charts.svg"
        alt="chart"
        width="100%"
      />
    </>
  }
  statistic={{
    value: 1102893,
    prefix: '¥',
    description: (
      <Space>
        <Statistic title="实际完成度" value="82.3%" />
        <Statistic title="当前目标" value="¥6000" />
      </Space>
    ),
  }}
/>
};

export default StatisticTotal;
