import React, { createContext, useContext, useEffect, useState } from "react";
import { IDate, DateContextType } from "../@types/date";
import { dateToStringFormat } from "../utils/dateFunctions";

const DatesContext = createContext<DateContextType | undefined>(
  undefined
);

export const DatesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [actualDate, setActualDate] = useState<IDate["dateStrObj"]>(dateToStringFormat(new Date()));
  const [selectedDate, setSelectedDate] = useState<IDate["dateStrObj"]>(dateToStringFormat(new Date()));
  const [selectedMonth, setSelectedMonth] = useState<IDate["dateNumObj"]>(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState<IDate["dateNumObj"]>(new Date().getFullYear());
  const [cantDiasSelectedMonth, setCantDiasSelectedMonth] = useState(new Date(selectedYear, selectedMonth, 0).getDate());

  useEffect(() => {
    setCantDiasSelectedMonth(new Date(selectedYear, selectedMonth, 0).getDate());
  }, [selectedMonth]);

  return (
    <DatesContext.Provider
      value={{
        actualDate,
        updateActualDate: (date: string) => setActualDate(date),
        selectedDate,
        updateSelectedDate: (date: string) => setSelectedDate(date),
        prevSelectedDate: () =>  {
          let dateObj = new Date(selectedDate);
          dateObj.setDate(dateObj.getDate() - 1);
          setSelectedDate(dateToStringFormat(dateObj));
        },
        nextSelectedDate: () => {
          let dateObj = new Date(selectedDate);
          dateObj.setDate(dateObj.getDate() + 1);
          setSelectedDate(dateToStringFormat(dateObj));
        },
        selectedDateIsToday: () => selectedDate == actualDate,
        selectedMonth,
        selectedYear,
        setSelectedMonth: (month: number) => setSelectedMonth(month),
        setSelectedYear: (year: number) => setSelectedYear(year),
        cantDiasSelectedMonth,
        setCantDiasSelectedMonth: (cant: number) => setCantDiasSelectedMonth(cant),
      }}
    >
      {children}
    </DatesContext.Provider>
  );
};

export default function useDates() {
  const context = useContext(DatesContext);
  if (!context)
    throw Error(
      "DatesContext can only be used inside an DatesProvider"
    );
  return context;
}
