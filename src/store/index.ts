import { createContainer } from 'aem-store';
import concepBoardModel from './model/concep-board-model';
import paramModel from './model/param-model';
import stockViewModel from './model/stock-view-model';
import StockRaisingLimitRadarModel from './model/stock-raising-limit-radar-model';
import welcomeModel from './model/welcome-model';
import dashBoardModel from './model/dash-board-model';

// 概念板块
export const [[ContainerConcepBoard], useConcepBoardContext, useConcepBoardStore] = createContainer(concepBoardModel);

// 参数管理
export const [[ContainerParam], useParamContext, useParamStore] = createContainer(paramModel);

// 个股查看
export const [[ContainerStockView], useStockViewContext, useStockViewStore] = createContainer(stockViewModel);

// 涨停雷达
export const [[ContainerStockRaisingLimitRadar], useStockRaisingLimitRadarContext, useStockRaisingLimitRadarStore] = createContainer(StockRaisingLimitRadarModel);

// 首页
export const [[ContainerWelcome], useWelcomeContext, useWelcomeStore] = createContainer(welcomeModel);

// 大盘
export const [[ContainerDashBoard], useDashBoardContext, useDashBoardStore] = createContainer(dashBoardModel);
