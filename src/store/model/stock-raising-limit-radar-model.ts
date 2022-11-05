import { EditorType } from '@/utils/frwk-util';

  const defaultStore = {
    editor: {
      visible: false,
      loading: false,
      type: EditorType.add,
      item: { id: '' },
    },
  };
  
  export default defaultStore;
  