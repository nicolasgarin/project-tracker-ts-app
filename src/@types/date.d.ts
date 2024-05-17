export interface IDate {
  dateObj: string;
}

export type DateContextType = {
  actualDate: IDate["dateObj"];
  selectedDate: IDate["dateObj"];
  updateActualDate: (date: string) => void;
  updateSelectedDate: (date: string) => void;
  prevSelectedDate: () => void;
  nextSelectedDate: () => void;
  selectedDateIsToday: () => boolean;
};
