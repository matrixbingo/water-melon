import type { FC } from 'react';
import React from 'react';
import { Drawer } from 'antd';
import { useConcepBoardContext } from '@/store';
import { ViewContainer } from 'aem-ui';
import BoardStockView from '../board-stock-view';

const BoardStockDrawer: FC = () => {
  const { store: { view }, handle } = useConcepBoardContext();

  const onClose = () => {
    handle.save('view.visible', false);
    handle.save('stocks', []);
  };

  return (
    <Drawer
      width="100%"
      placement="right"
      bodyStyle={{ backgroundColor: '#fafafa' }}
      title={view.item.name}
      onClose={onClose}
      visible={view.visible}
    >
      <ViewContainer>
        <BoardStockView />
      </ViewContainer>
    </Drawer>
  );
};

export default BoardStockDrawer;
