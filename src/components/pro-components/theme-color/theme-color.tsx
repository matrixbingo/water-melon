import { CheckOutlined } from '@ant-design/icons';
import { Tag, Tooltip } from 'antd';
import React from 'react';

export type TagProps = {
  color: string;
  check: boolean;
  className?: string;
  onClick?: () => void;
};

// const Tag: React.FC<TagProps> = React.forwardRef(({ color, check, ...rest }, ref) => (
//   <div {...rest} style={{ backgroundColor: color }} ref={ref as any}>
//     {check ? <CheckOutlined /> : <CheckOutlined />}
//   </div>
// ));

export type ThemeColorProps = {
  colorList?: {
    key: string;
    color: string;
  }[];
  value?: string;
  onChange: (color: string) => void;
};

const defaultColorList = [
  { color: '#1890ff', key: '拂晓蓝' },
  { color: '#F5222D', key:'薄暮' },
  { color: '#FA541C', key:'火山' },
  { color: '#FAAD14', key:'日暮' },
  { color: '#13C2C2', key:'明青' },
  { color: '#52C41A', key:'极光绿' },
  { color: '#2F54EB', key:'极客蓝' },
  { color: '#722ED1', key:'酱紫' },
]

const ThemeColor: React.ForwardRefRenderFunction<HTMLDivElement, ThemeColorProps> = ({ value='#1890ff', colorList=defaultColorList, onChange }) => {
  if (!colorList || colorList?.length < 1) {
    return null;
  }
  return (
    <div>
        {colorList?.map(({ key, color }) => {
          return (
            <Tooltip
              key={key}
              title={key}
            >
              <Tag
                style={{width:10, height:15, cursor: 'pointer'}}
                color={color}
                onClick={() => onChange && onChange(color)}
              />
            </Tooltip>
          );
        })}
    </div>
  );
};

export default React.forwardRef(ThemeColor);
