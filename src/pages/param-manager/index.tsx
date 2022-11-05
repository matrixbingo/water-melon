import React, { } from 'react';
import { ContainerParam } from '@/store';
import type { ActionType } from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import ParamList from './elements/param-list';

export interface IndexEditorProps {
  actionRef: React.MutableRefObject<ActionType | undefined>;
}

const Index: React.FC = () => {
  return (
    <PageContainer>
      <ContainerParam>
        <ParamList />
      </ContainerParam>
    </PageContainer>
  );
};

export default Index;
