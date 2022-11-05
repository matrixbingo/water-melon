import { startsWith } from "lodash";

const SZ = ['002', '000', '3'];
const SH = ['6'];

export const getArea = (stock: string) => {
  return startsWith(stock, '6') ? 'sh' : 'sz';
}

export const getAreaStock = (stock: string) => {
  return getArea(stock) + stock;
}
