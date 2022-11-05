import React, { } from 'react';
import { ContainerConcepBoard } from '@/store';
import type { ActionType } from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import ConcepBoardView from './elements/concep-board-view';

export interface IndexEditorProps {
  actionRef: React.MutableRefObject<ActionType | undefined>;
}

const Index: React.FC = () => {
  return (
    <PageContainer>
      <ContainerConcepBoard>
        <ConcepBoardView />
      </ContainerConcepBoard>
    </PageContainer>
  );
};

export default Index;
