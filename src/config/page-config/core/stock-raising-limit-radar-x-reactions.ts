/* eslint-disable import/prefer-default-export */
import type { Field, Form } from '@formily/core';

export const createStockRaisingLimitRadarSchemaXReactions = {
    type: [{
      effects: ['onFieldInputValueChange'],
      fulfill: {
        run: '{{ typeOnChange($self,$form,$props) }}',
      },
    }],
    name: [
      {
        dependencies: ['type'],
        when: '{{ $deps[0] !== undefined }}',
        fulfill: {
          run: '{{ nameDepTypeOnChange($deps[0],$self,$form) }}',
        },
      },
    ],
  };

export const typeOnChange = (field: Field, form: Form) => {
    field.setComponent('Input');
    field.setComponentProps({ placeholder: '请输入！' });
    field.required = false;
    field.display = 'visible';
    field.title = '参数';
  };

export const StockRaisingLimitRadarScope = { typeOnChange };
