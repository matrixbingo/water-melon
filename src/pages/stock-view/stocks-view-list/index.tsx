import React, { } from 'react';
import { ContainerStockView } from '@/store';
import type { ActionType } from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import StockViewList from './elements/stock-view-list';

export interface IndexEditorProps {
  actionRef: React.MutableRefObject<ActionType | undefined>;
}

const Index: React.FC = () => {
  return (
    <PageContainer>
      <ContainerStockView>
        <StockViewList />
      </ContainerStockView>
    </PageContainer>
  );
};

export default Index;
