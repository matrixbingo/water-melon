/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-return-assign */
import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { useConcepBoardContext } from '@/store';
import BaoStockController from '@/controller/bao-stock-controller';
import { ComUtil } from '@/utils';
import StockTable from './stock-table/stock-table';
import HorizontalScrolling from '../common/horizontal-scrolling-stock/horizontal-scrolling-stock';
import StockKLine from './stock-k-line/stock-k-line';

const elemPrefix = "test";
const getId = (index: number | string) => `${elemPrefix}${index}`;

const nextItem = (items, setItems) => {
  setItems((items) => items.concat({ id: getId(String(Math.random()).slice(2, 5)) }));
};

const prevItem = (items, setItems) => {
  setItems((items) => {
    const newItems = [...items];
    newItems.splice(0, 1);
    return newItems;
  });
};

const BoardStockView: React.FC = () => {
  const { store: { view, stocks }, handle } = useConcepBoardContext();
  const { loading: findStockBoardStockListLoading, run: findStockBoardStockListRun } = BaoStockController.findStockBoardStockList();

  const [items, setItems] = React.useState([]);

  const onSuccess = (rs: any[]) => {
    const data = rs.reverse();
    const arr = [] as any;
    data && data.forEach((i) => arr.push({ id: i. date, board_code: i.board_code, node: <StockTable date={i.date} board_code={i.board_code} /> }));
    setItems(arr);
  }

  useEffect(() => {
    const param = { board_name: view.item.name, date: view.item.date }
    ComUtil.run.common(findStockBoardStockListRun, { param, onSuccess });
  }, [view.item.name, view.item.date]);

  return (
    <Spin spinning={findStockBoardStockListLoading}>
      <StockKLine stocks={stocks}/>
      <HorizontalScrolling items={items} nextItem={nextItem} prevItem={prevItem} />
    </Spin>
  );
};

export default BoardStockView;
