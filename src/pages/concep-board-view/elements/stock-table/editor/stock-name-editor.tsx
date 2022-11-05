import type { PropsWithChildren} from 'react';
import React, { useState } from 'react';
import { Button, Popover } from 'antd';
import StockRaisingLimitRadarController from '@/controller/stock-raising-limit-radar-controller';
import { ComUtil } from '@/utils';
import WordWrap from '@/components/aem-ui/word-wrap/word-wrap';
import './stock-name-editor.less';

export interface StockNameEditorProps {
  record: any;
  load: () => void;
}

const StockNameEditor: React.FC<PropsWithChildren<StockNameEditorProps>> = ({record, ...rest}) => {
  const [content, setContent] = useState();
  const { run, loading } = StockRaisingLimitRadarController.detail();
  const { stock_name, date, code } = record;

  const onClick = () => {
    const param = { date, stock_code: code };
    ComUtil.run.common(run, { param, onSuccess: ({ text }) => {
      setContent(text);
    }});
  }

  return <Popover placement="topLeft" title={stock_name} content={<WordWrap>{content}</WordWrap>} trigger="click">
          <div className='stock-name-editor-popover'>
            <Button type="text" onClick={onClick} loading={loading}>{stock_name}</Button>
        </div>
      </Popover>
};

export default StockNameEditor;
