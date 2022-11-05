import { EditorType } from "@/utils/frwk-util";

const defaultStore = {
  editor: {
    visible: false,
    type: EditorType.add,
    item: {},
  },
  view: {
    visible: false,
    type: EditorType.add,
    item: { name: '', date: ''},
  }
};

export default defaultStore;
