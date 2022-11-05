import React from 'react';
import { ContainerDashBoard } from '@/store';
import { PageContainer } from '@ant-design/pro-layout';
import DashBoardList from './elements/dash-board-list';

/**
 *  大盘
 */
const DashBoard: React.FC = () => {
  return (
    <PageContainer>
      <ContainerDashBoard>
        <DashBoardList />
      </ContainerDashBoard>
    </PageContainer>
  );
};

export default DashBoard;
