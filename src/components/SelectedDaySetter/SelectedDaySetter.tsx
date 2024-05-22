import "./SelectedDaySetter.scss";
import useDates from "../../context/DatesContext";
import useUserOptions from "../../context/UserOptionsContext";
import { dayStringFormat } from "../../utils/dateFunctions";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";

export default function SelectedDaySetter() {
  const {
    selectedDate,
    prevSelectedDate,
    nextSelectedDate,
    selectedDateIsToday,
  } = useDates();
  const { lang } = useUserOptions();

  return (
    <>
      <div className="day-setter d-flex align-items-center">
        <button
          aria-label={lang == "es" ? "Mes previo" : "Previous month"}
          className="btn btn-celeste flecha"
          onClick={prevSelectedDate}
        >
          <FaAngleLeft />
        </button>
        <div className="bold day-name">
          {selectedDateIsToday()
            ? lang == "es"
              ? "Hoy"
              : "Today"
            : dayStringFormat(selectedDate, lang)}
        </div>
        <button
          aria-label={lang == "es" ? "Mes siguiente" : "Next month"}
          className="btn btn-celeste flecha"
          onClick={nextSelectedDate}
          disabled={selectedDateIsToday()}
        >
          <FaAngleRight />
        </button>
      </div>
    </>
  );
}
