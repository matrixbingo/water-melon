/* eslint-disable react/react-in-jsx-scope */
  /* eslint-disable react-hooks/exhaustive-deps */
  import { FC } from 'react';
  import { createSchemaField, observer } from '@formily/react';
  import { Form as FormProps } from '@formily/core/esm/models/Form';
  import { Form, FormItem, Input, Select, FormLayout, Cascader, FormGrid, ArrayItems, Editable, ArrayTable, Checkbox, ArrayCards, Radio, DatePicker, NumberPicker, Space, FormCollapse } from '@formily/antd';
  import { createStockRaisingLimitRadarSchema } from '@/config/page-config/stock-raising-limit-radar-config';
  import { StockRaisingLimitRadarScope } from '@/config/page-config/core/stock-raising-limit-radar-x-reactions';
  
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
  
  const EditorForm: FC<EditorFormProps> = observer((props) => {
    const { form } = props;
    const defaultSchema = createStockRaisingLimitRadarSchema();
  
    return (
      <Form form={form} layout="vertical">
        <SchemaField schema={defaultSchema as any} scope={StockRaisingLimitRadarScope} />
      </Form>
    );
  });
  
  export default EditorForm;
  