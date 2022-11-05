import React from 'react';
  import { ContainerStockRaisingLimitRadar } from '@/store';
  import { PageContainer } from '@ant-design/pro-layout';
  import StockRaisingLimitRadarList from './elements/stock-raising-limit-radar-list';
  
  /**
   *  涨停雷达
   */
  const StockRaisingLimitRadar: React.FC = () => {
    return (
      <PageContainer>
        <ContainerStockRaisingLimitRadar>
          <StockRaisingLimitRadarList />
        </ContainerStockRaisingLimitRadar>
      </PageContainer>
    );
  };
  
  export default StockRaisingLimitRadar;