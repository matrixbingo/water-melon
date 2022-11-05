/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { createSchemaField, observer } from '@formily/react';
import type { Form as FormProps } from '@formily/core/esm/models/Form';
import { Form, FormItem, Input, Select, FormLayout, FormGrid } from '@formily/antd';
import { createConcepBoardEditorSchema } from '@/config/page-config/concep-board-config';
import { SelectSearchSingle } from 'aem-ui';

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
    SelectSearchSingle,
  },
});

const ConcepBoardForm: React.FC<LabelSortFormProps> = observer((props) => {
  const { form } = props;
  const schema = createConcepBoardEditorSchema();

  return (
    <Form form={form} layout="vertical">
      <SchemaField schema={schema as any} />
      {/* <Button onClick={() => { window.console.log('---------------->', toJS(form.values)); }}>查看数据</Button> */}
    </Form>
  );
});

export default ConcepBoardForm;
