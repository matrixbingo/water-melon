/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useState } from 'react';
import { Select } from 'antd';
import { isArray, isEmpty } from 'lodash';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { TransformUtil } from 'common-toolkits';

type SelectProps = React.ComponentProps<typeof Select>;

export type dataType = 'string' | 'number';

export type Raw = string | number;

export interface SelectSingleProps extends Omit<SelectProps, 'value' | 'onChange'| 'options'> {
    value?: Raw;
    onChange?: (value: Raw) => void;
    selectOption?: (option: {id: Raw; name: string }) => void;
    dataType: dataType;
    defaultOption?: {id: Raw; name: string } | undefined;
    options: { id: Raw; name: string }[] | { value: Raw; label: string }[];
}

const toValueByDataType = (type: dataType, v: Raw): Raw => {
  if (v !== undefined) {
    return type === 'number' ? Number(v) : String(v);
  }
  return v;
};

const initOptions = (options) => {
  if(!isEmpty(options) && isEmpty(options[0].id) && isEmpty(options[0].name)){
    window.console.error('下一个版本将不支持 { id: Raw; name: string }[] 格式，仅支持 { value: Raw; label: string }[] 格式！');
  }
  if(!isEmpty(options) && isEmpty(options[0].value) && isEmpty(options[0].label)){
    return TransformUtil.select.formatArray(options, { id: 'value', name: 'label' })
  }
  return options;
}

/**
 * 单选，可搜索
 */
const SelectSingle = (props: SelectSingleProps) => {
  const { value, onChange, dataType, selectOption, defaultOption, options: inputOptions, style, placeholder, ...restProps } = props;
  const [options, setOptions] = useState<any[]>(initOptions(inputOptions));

  useDeepCompareEffect(() => {
    setOptions(inputOptions);
  }, [options, inputOptions]);

  const onChangeCallBack = (id) => {
    onChange && onChange(toValueByDataType(dataType, id));
    if (selectOption) {
      const option = options.filter((i) => i.id === id);
      if (isArray(option) && !isEmpty(option)) {
        selectOption && selectOption(option[0]);
      }
    }
  };

  return (
    <Select
      showSearch
      style={style}
      value={value === undefined ? undefined : String(value)}
      placeholder={placeholder}
      optionFilterProp="children"
      filterOption={(input, option) => option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
      onChange={onChangeCallBack}
      {...restProps}
    >
      {defaultOption
        ? <Select.Option value={defaultOption?.id}>{defaultOption?.name}</Select.Option>
        : null}
      {options?.map((option) => (
        <Select.Option key={option.id} value={String(option.id)} title={String(option.id)}>
          {option.name}
        </Select.Option>
      ))}
    </Select>
  );
};

SelectSingle.defaultProps = {
  style: { width: '100%' },
  placeholder: '',
  dataType: 'string',
  options: [],
  defaultOption: null,
};

export default SelectSingle;
