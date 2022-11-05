import React, { useEffect } from "react";
import type { VisibilityContext } from "react-horizontal-scrolling-menu";
import { ScrollMenu } from "react-horizontal-scrolling-menu";

import { LeftArrow, RightArrow } from "./arrows";
import CardPanle from "./card-panle";
import usePrevious from "./usePrevious";
// NOTE: embrace power of CSS flexbox!
// import "./hideScrollbar.css";
// import "./firstItemMargin.css";

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

const elemPrefix = "test";
const getId = (index: number | string) => `${elemPrefix}${index}`;

function onWheel(apiObj: scrollVisibilityApiType, ev: React.WheelEvent): void {
  const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

  if (isThouchpad) {
    ev.stopPropagation();
    return;
  }

  if (ev.deltaY < 0) {
    apiObj.scrollNext();
  } else if (ev.deltaY > 0) {
    apiObj.scrollPrev();
  }
}

const HorizontalScrolling = ({ items: iniAllItems, nextItem: nextItemInput, prevItem: prevItemInput }) => {
  const [items, setItems] = React.useState(iniAllItems);

  useEffect(()=> {
    setItems(iniAllItems);
    // window.console.log('----useEffect------------>', iniAllItems);
  }, [iniAllItems]);

  // NOTE: for add/remove item
  const nextItem = () => {
    nextItemInput(items, setItems);
  };

  const prevItem = () => {
    prevItemInput(items, setItems);
  };

  const itemsPrev = usePrevious(items) ?? { length: 0 };
  const apiRef = React.useRef({} as scrollVisibilityApiType);
  React.useEffect(() => {
    if (items.length > itemsPrev?.length) {
      apiRef.current?.scrollToItem?.(apiRef.current?.getItemElementById(items.slice(-1)?.[0]?.id)
        // same as
        // document.querySelector(`[data-key='${items.slice(-1)?.[0]?.id}']`)
      );
    }
  }, [items, itemsPrev]);

  // window.console.log('items---------------->', items);

  return (
    <>
      <div style={{ paddingTop: "10px" }}>
        <div>
          <ScrollMenu
            LeftArrow={LeftArrow}
            RightArrow={RightArrow}
            onWheel={onWheel}
            apiRef={apiRef}
          >
            {items.map(({ id, board_code, node }) => (
              <CardPanle
                title={id}
                itemId={id} // NOTE: itemId is required for track items
                key={id + '_' + board_code}
              >
                {node}
                </CardPanle>
            ))}
          </ScrollMenu>
          <div style={{ marginTop: "20px" }}>
            <button onClick={prevItem}>上一个</button>
            <button onClick={nextItem}>下一个</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default HorizontalScrolling;
