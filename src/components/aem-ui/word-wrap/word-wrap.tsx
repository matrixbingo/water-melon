import React from 'react';
import type { PropsWithChildren } from 'react';
import type { ParagraphProps } from 'antd/lib/typography/Paragraph';
import { Typography } from 'antd';
const { Paragraph } = Typography;

export interface WordWrapProps extends Omit<ParagraphProps, 'wordWrap' | 'children'> {
  wordWrap?: boolean;
  children?: string;
}

const WordWrap: React.FC<PropsWithChildren<WordWrapProps>> = ({children, wordWrap, ...rest}) => {
  const lines = children?.split('\n');
  return <>
    {
      lines?.map((text) => {
        return <Paragraph key={text} {...rest}>{text}</Paragraph>
      })
    }
  </>
};

export default WordWrap;
