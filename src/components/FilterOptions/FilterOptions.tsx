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
    lang,
    theme,
    showFinished,
    toggleShowFinished,
    showMain,
    toggleShowMain,
    showArchiv,
    toggleShowArchiv,
  } = useUserOptions();

  return (
    <div id="filter-options" className="filter-options d-flex align-items-center">
      {!project ? (
        <div className="op d-flex align-items-center">
          <GiNightSleep />
          <div
            id="showArchivCheckbox"
            className="d-flex align-items-center justify-content-center celda celda-md"
            onClick={toggleShowArchiv}
            role="checkbox"
            aria-label={lang == "es" ? showArchiv == "false" ? "Mostrar proyectos archivados" : "Ocultar proyectos archivados" :  showArchiv == "false" ? "Show filed projects" : "Hide filed projects"}
            title={lang == "es" ? showArchiv == "false" ? "Mostrar proyectos archivados" : "Ocultar proyectos archivados" :  showArchiv == "false" ? "Show filed projects" : "Hide filed projects"}
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
              role="checkbox"
              aria-label={lang == "es" ? showFinished == "false" ? "Mostrar subproyectos finalizados" : "Ocultar subproyectos finalizados" :  showFinished == "false" ? "Show finished subprojects" : "Hide finished subprojects"}
              aria-checked={showFinished == "true" ? true : false}
              title={lang == "es" ? showFinished == "false" ? "Mostrar subproyectos finalizados" : "Ocultar subproyectos finalizados" :  showFinished == "false" ? "Show finished subprojects" : "Hide finished subprojects"}
            >
              {showFinished == "false" ? null : <FaCheck />}
            </div>
          </div>
          <div className="op d-flex align-items-center">
            <img src={theme == "light" ? rocket : rocketdark} />
            <div
              className="d-flex align-items-center justify-content-center celda celda-md"
              onClick={toggleShowMain}
              role="checkbox"
              aria-label={lang == "es" ? showMain == "false" ? "Mostrar proyecto principal" : "Ocultar proyecto principal" :  showMain == "false" ? "Show main project" : "Hide main project"}

            >
              {showMain == "false" ? null : <FaCheck />}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
