import useUserOptions from "../../context/UserOptionsContext";
import "./FilterOptions.scss";
import { FaFlagCheckered } from "react-icons/fa6";
import { GiNightSleep } from "react-icons/gi";
import { FaCheck } from "react-icons/fa";
import rocket from "../../assets/logo-violeta.svg";
import rocketdark from "../../assets/logo-celeste.svg";

interface FilterOptionsProps {
  project: boolean;
}

export default function FilterOptions({ project }: FilterOptionsProps) {
  const {
    theme,
    showFinished,
    toggleShowFinished,
    showMain,
    toggleShowMain,
    showArchiv,
    toggleShowArchiv,
  } = useUserOptions();

  return (
    <div className="filter-options d-flex align-items-center">
      {!project ? (
        <div className="op d-flex align-items-center">
          <GiNightSleep />
          <div
            className="d-flex align-items-center justify-content-center celda celda-md"
            onClick={toggleShowArchiv}
          >
            {showArchiv == "false" ? null : <FaCheck />}
          </div>
        </div>
      ) : (
        <>
          <div className="op d-flex align-items-center">
            <FaFlagCheckered />
            <div
              className="d-flex align-items-center justify-content-center celda celda-md"
              onClick={toggleShowFinished}
            >
              {showFinished == "false" ? null : <FaCheck />}
            </div>
          </div>
          <div className="op d-flex align-items-center">
            <img src={theme == "light" ? rocket : rocketdark} />
            <div
              className="d-flex align-items-center justify-content-center celda celda-md"
              onClick={toggleShowMain}
            >
              {showMain == "false" ? null : <FaCheck />}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
