import { Card } from "antd";
import type { ReactNode } from "react";
import React from "react";
//import { VisibilityContext } from "react-horizontal-scrolling-menu";

const CardPanle = ({ title, itemId, children }: { title: string; itemId: string; children: ReactNode }) =>  {
  // const visibility = React.useContext(VisibilityContext);

  // const visible = visibility.isItemVisible(itemId);

  return (
    <Card title={title} bordered={true} style={{ width: 300, padding: 0 }} bodyStyle={{ padding: 0 }}>
    {children}
    </Card>
  );
}

export default CardPanle;
