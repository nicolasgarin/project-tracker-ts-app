export interface Util {
  numArray: number[];
  num: number;
}

export type UtilContextType = {
  cardHeight: Util["num"];
  updateCardHeights: (num: number) => void;
};
