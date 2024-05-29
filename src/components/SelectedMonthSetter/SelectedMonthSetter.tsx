import React from "react";
import useDates from "../../context/DatesContext";
import useUserOptions from "../../context/UserOptionsContext";
import { getMonthName } from "../../utils/dateFunctions";
import { capFirstLetter } from "../../utils/reusableFunctions";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";

interface MonthSetterProps {
  availableYears: string[];
  btnDisabled?: boolean;
}

export default function SelectedMonthSetter({
  availableYears, btnDisabled
}: MonthSetterProps) {
  const {
    actualDate,
    selectedMonth,
    selectedYear,
    setSelectedMonth,
    setSelectedYear,
  } = useDates();
  const { lang } = useUserOptions();
  const actualDateObj = new Date(actualDate);

  function handleYear(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedYear(parseInt(event.target.value));
    setSelectedMonth(1);
  }

  function prevMonth() {
    if (selectedMonth == 1) {
      setSelectedYear(selectedYear - 1);
      setSelectedMonth(12);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  }

  function nextMonth() {
    if (selectedMonth == 12) {
      setSelectedYear(selectedYear + 1);
      setSelectedMonth(1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  }

  return (
    <div className="d-flex">
      <select
        aria-label={lang == "es" ? "Seleccionar año" : "Select year"}
        className="select-year"
        name="year"
        id="year"
        value={selectedYear}
        onChange={handleYear}
      >
        {availableYears.length > 0 ? (
          availableYears
            .sort()
            .reverse()
            .map((year) => {
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            })
        ) : (
          <option
            key={actualDateObj.getFullYear()}
            value={actualDateObj.getFullYear()}
          >
            {actualDateObj.getFullYear()}
          </option>
        )}
      </select>
      <div className="month-setter d-flex align-items-center justify-content-between">
        <button
          aria-label={lang == "es" ? "Mes previo" : "Previous month"}
          className="btn btn-celeste flecha"
          onClick={prevMonth}
          disabled={
            btnDisabled ? btnDisabled
            :
            selectedMonth == 1 &&
            !availableYears.includes((selectedYear - 1).toString())
          }
        >
          <FaAngleLeft />
        </button>
        <div className="bold month-name">
          {capFirstLetter(getMonthName(selectedMonth, lang))}
        </div>
        <button
          aria-label={lang == "es" ? "Mes siguiente" : "Next month"}
          className="btn btn-celeste flecha"
          onClick={nextMonth}
          disabled={
            selectedMonth == actualDateObj.getMonth() + 1 &&
            selectedYear == actualDateObj.getFullYear()
          }
        >
          <FaAngleRight />
        </button>
      </div>
    </div>
  );
}
