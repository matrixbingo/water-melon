/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { createSchemaField, observer } from '@formily/react';
import { Form as FormProps } from '@formily/core/esm/models/Form';
import { Form, FormItem, Input, Select, FormLayout, Cascader, FormGrid, ArrayItems, Editable, ArrayTable, Checkbox, ArrayCards, Radio, DatePicker, NumberPicker, Space, FormCollapse } from '@formily/antd';
import { createDashBoardSchema } from '@/config/page-config/dash-board-config';
import { dashBoardScope } from '@/config/page-config/core/dash-board-x-reactions';

export interface EditorFormProps {
  form: FormProps<any>;
}

const formCollapse = FormCollapse.createFormCollapse?.();

const SchemaField = createSchemaField({
  components: {
    Input,
    FormItem,
    Select,
    FormGrid,
    FormLayout,
    Cascader,
    ArrayItems,
    ArrayCards,
    Editable,
    ArrayTable,
    Checkbox,
    Radio,
    DatePicker,
    NumberPicker,
    FormCollapse,
    Space,
  },
});

const EditorForm: React.FC<EditorFormProps> = observer((props) => {
  const { form } = props;
  const defaultSchema = createDashBoardSchema();

  return (
    <Form form={form} layout="vertical">
      <SchemaField schema={defaultSchema as any} scope={dashBoardScope} />
    </Form>
  );
});

export default EditorForm;
