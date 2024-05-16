export interface Date {
  dateObj: Date;
}

export type DateContextType = {
  actualDate: Date["dateObj"];
  selectedDate: Date["dateObj"];
  setActualDate: () => void;
  setSelectedDate: () => void;
};
