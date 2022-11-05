import { getAreaStock } from '@/utils/stock-utill';
import { PropsWithChildren, useState } from 'react';
import React from 'react';
import { useDeepCompareEffect } from '@ant-design/pro-components';

export interface StockKLineProps {
  stocks?: string[];
}

const StockKLine: React.FC<PropsWithChildren<StockKLineProps>> = ({ stocks, ...rest }) => {
  const [list, setList] = useState(stocks);

  useDeepCompareEffect(() => {
    setList(stocks)
  }, [stocks])

  return <>
    {
      list && list.map(stock => <iframe src={`http://quote.eastmoney.com/concept/${getAreaStock(stock)}.html?from=classic#fschart-r`} width="100%" height="800px" scrolling="no" />)
    }
  </>
};

export default StockKLine;
