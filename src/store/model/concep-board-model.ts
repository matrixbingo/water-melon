import { EditorType } from "@/utils/frwk-util";

const defaultStore = {
  editor: {
    visible: false,
    type: EditorType.add,
    item: { code: 0 },
  },
  view: {
    visible: false,
    type: EditorType.add,
    item: { name: '', date: ''},
  },
  stocks: [] as string[],
};

export default defaultStore;
