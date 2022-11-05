/* eslint-disable import/prefer-default-export */
import { Field, Form } from '@formily/core';

export const createDashBoardSchemaXReactions = {
  type: [{
    effects: ['onFieldInputValueChange', 'onFieldValueChange'],
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

const typeOnChange = (field: Field, form: Form) => {
  field.setComponent('Input');
  field.setComponentProps({ placeholder: '请输入！' });
  field.required = false;
  field.display = 'visible';
  field.title = '参数';
};

const nameDepTypeOnChange = (field: Field, form: Form) => {

};

export const dashBoardScope = { typeOnChange, nameDepTypeOnChange };
