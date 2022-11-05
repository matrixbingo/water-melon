import React, { } from 'react';
import { ContainerDashBoard } from '@/store';
import type { ActionType } from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import PieLines from './pie-lines/pie-lines';

export interface IndexEditorProps {
  actionRef: React.MutableRefObject<ActionType | undefined>;
}

const Index: React.FC = () => {
  return (
    <PageContainer header={{ title: null }}>
      <ContainerDashBoard>
        <PieLines />
      </ContainerDashBoard>
    </PageContainer>
  );
};

export default Index;
