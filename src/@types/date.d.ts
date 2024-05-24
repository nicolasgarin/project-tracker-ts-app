export interface IDate {
  dateStrObj: string;
  dateNumObj: number;
}

export type DateContextType = {
  actualDate: IDate["dateStrObj"];
  selectedDate: IDate["dateStrObj"];
  selectedMonth: IDate["dateNumObj"];
  selectedYear: IDate["dateNumObj"];
  updateActualDate: (date: string) => void;
  updateSelectedDate: (date: string) => void;
  prevSelectedDate: () => void;
  nextSelectedDate: () => void;
  selectedDateIsToday: () => boolean;
  setSelectedMonth: (month: number) => void;
  setSelectedYear: (year: number) => void;
};
