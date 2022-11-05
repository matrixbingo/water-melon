import React from 'react';
import { ContainerConcepBoard } from '@/store';
import type { ActionType } from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import ConcepBoardList from './elements/concep-board-list';

export interface IndexEditorProps {
  actionRef: React.MutableRefObject<ActionType | undefined>;
}

const Index: React.FC = () => {
  return (
    <PageContainer>
      <ContainerConcepBoard>
        <ConcepBoardList />
      </ContainerConcepBoard>
    </PageContainer>
  );
};

export default Index;
