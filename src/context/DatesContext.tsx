import React, { createContext, useContext, useState } from "react";
import { IDate, DateContextType } from "../@types/date";
import { dateToStringFormat } from "../utils/dateFunctions";

const DatesContext = createContext<DateContextType | undefined>(
  undefined
);

export const DatesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [actualDate, setActualDate] = useState<IDate["dateObj"]>(dateToStringFormat(new Date()));
  const [selectedDate, setSelectedDate] = useState<IDate["dateObj"]>(dateToStringFormat(new Date()));

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
