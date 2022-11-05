/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useMemo } from 'react';
import { createSchemaField, observer } from '@formily/react';
import { toJS } from '@formily/reactive';
import { Form as FormProps } from '@formily/core/esm/models/Form';
import { Form, FormItem, Input, Select, FormLayout, Cascader, FormGrid, ArrayItems, Editable, NumberPicker } from '@formily/antd';
import { InputRenderCustomer } from 'aem-ui';
import { Button } from 'antd';
import { createParamEditorSchema } from '@/config/page-config/param-config';

export type OptionType = { value: number | string; label: string }[];

export interface LabelSortFormProps {
  form: FormProps<any>;
}

const SchemaField = createSchemaField({
  components: {
    Input,
    FormItem,
    Select,
    FormGrid,
    FormLayout,
    ArrayItems,
    NumberPicker
  },
});

const schema = createParamEditorSchema();

const ParamForm: FC<LabelSortFormProps> = observer((props) => {
  const { form } = props;

  return (
    <Form form={form} layout="vertical">
      <SchemaField schema={schema as any} />
      {/* <Button onClick={() => { window.console.log('---------------->', toJS(form.values)); }}>查看数据</Button> */}
    </Form>
  );
});

export default ParamForm;
