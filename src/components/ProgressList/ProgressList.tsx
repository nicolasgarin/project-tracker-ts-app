import "./ProgressList.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useUserOptions from "../../context/UserOptionsContext";
import useDates from "../../context/DatesContext";
import SelectedMonthSetter from "../SelectedMonthSetter/SelectedMonthSetter";
import { capFirstLetter } from "../../utils/reusableFunctions";
import { getMonthFromString } from "../../utils/dateFunctions";
import { IProject } from "../../@types/data";
import { FaFlagCheckered } from "react-icons/fa6";
import { GiNightSleep } from "react-icons/gi";
import { FaCheck } from "react-icons/fa";
import rocket from "../../assets/logo-violeta.svg";
import rocketdark from "../../assets/logo-celeste.svg";

interface ProgressListProps {
  fullProjects: IProject[];
  project?: IProject;
}

interface IDia {
  date: string;
  status: number;
}

export default function ProgressList({
  fullProjects,
  project,
}: ProgressListProps) {
  const {
    lang,
    theme,
    showFinished,
    toggleShowFinished,
    showMain,
    toggleShowMain,
  } = useUserOptions();
  const { selectedYear, selectedMonth, actualDate, setSelectedYear, setSelectedMonth } = useDates();
  const [showArchiv, setShowArchiv] = useState<string>(
    localStorage.getItem("showArchiv") || "false"
  );
  const [filteredData, setFilteredData] = useState(fullProjects);
  const [cantDias, setCantDias] = useState(
    new Date(selectedYear, selectedMonth, 0).getDate()
  );
  const [availableYears, setAvailableYears] = useState<string[]>([]);
  var totalDiasSubp:string[] = [];
  //var totalDiasP = [];

  useEffect(() => {
    !project
      ? (filterFullTable(fullProjects),
        localStorage.setItem("showArchiv", showArchiv))
      : null;
  }, [project, fullProjects, showArchiv]);

  useEffect(() => {
    setCantDias(new Date(selectedYear, selectedMonth, 0).getDate());
  }, [selectedMonth]);

  useEffect(() => {
    setSelectedYear(parseInt(availableYears[0]));
    setSelectedMonth(getMonthFromString(actualDate));
  }, []);

  project
    ? project.subproyectos.map((subP) => {
        subP.diasChecklist.map((dia) => {
          if (!availableYears.includes(dia.date.split("-")[0])) {
            setAvailableYears([...availableYears, dia.date.split("-")[0]]);
          }
        });
      })
    : filteredData.map((project) => {
        project.subproyectos.map((subP) => {
          subP.diasChecklist.map((dia) => {
            if (!availableYears.includes(dia.date.split("-")[0])) {
              setAvailableYears([...availableYears, dia.date.split("-")[0]]);
            }
          });
        });
      });

  function filterFullTable(data: IProject[]) {
    showArchiv == "false"
      ? setFilteredData(data.filter((d) => d.archivado == false))
      : setFilteredData(data);
  }

  const CeldasMes = () => {
    var celdas: JSX.Element[] = [];
    for (let i = 1; i <= cantDias; i++) {
      celdas.push(
        <div
          key={i}
          className={
            "celda num d-flex justify-content-center align-items-center"
          }
        >
          {i}
        </div>
      );
    }
    return celdas;
  };

  const CeldasMesLetras = () => {
    var celdas: JSX.Element[] = [];
    for (let i = 1; i <= cantDias; i++) {
      let letter = new Date(selectedYear, selectedMonth - 1, i)
        .toLocaleDateString(lang, {
          weekday: "long",
        })[0]
        .toUpperCase();
      celdas.push(
        <div
          key={i}
          className={
            "celda letra d-flex align-items-center justify-content-center"
          }
        >
          {letter}
        </div>
      );
    }
    return celdas;
  };

  return (
    <>
      <div className="progress-list card-container">
        <div className="date-setter d-flex flex-column flex-sm-row justify-content-between">
          <SelectedMonthSetter availableYears={availableYears} />
          <div className="filter-options d-flex align-items-center">
            {!project ? (
              <div className="op d-flex align-items-center">
                <GiNightSleep />
                <div
                  className="d-flex align-items-center justify-content-center celda celda-md"
                  onClick={() =>
                    setShowArchiv(showArchiv == "false" ? "true" : "false")
                  }
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
        </div>
        <div className="cont-derecho">
          <div className="prog-table-item d-flex">
            <div className="left-sec">
              {project
                ? project.subproyectos.map((subcat) => {
                  if (showFinished == "false" && subcat.cerrada == true) { 
                    null
                  } else {
                    return (
                      <div className="nombre-fila bold">
                        {subcat.nombreSubp}
                      </div>
                    );
                  }
                  })
                : filteredData.map((proyecto) => {
                    return (
                      <Link
                        key={proyecto.id}
                        className="link-fila"
                        to={`/project-tracker-ts-app/projects/${proyecto.id}`}
                      >
                        <div
                          key={proyecto.id}
                          className="nombre-fila plm bold texto-celeste"
                        >
                          {capFirstLetter(proyecto.nombre)}
                        </div>
                      </Link>
                    );
                  })}
            </div>
            <div className="right-sec">
              <div className="tabla-dias d-flex">
                <CeldasMes />
              </div>
              <div className="tabla-dias d-flex mb-3">
                <CeldasMesLetras />
              </div>
              {project
                ? project.subproyectos.map((subP) => {
                    let diasArray: IDia[] = [];
                    subP.diasChecklist.map((dia) => {
                      if (subP.cerrada && !showFinished) {
                      null
                      } else {
                          totalDiasSubp.push(dia.date);
                      }

                      if (dia.date.split("-")[0] == selectedYear.toString()) {
                        if (
                          dia.date.split("-")[1] == selectedMonth.toString()
                        ) {
                          diasArray.push(dia);
                        }
                      }
                    });
                    console.log(totalDiasSubp.sort());
                    var celdasP = [];
                    for (let i = 1; i <= cantDias; i++) {
                      diasArray.filter(
                        (dia) => dia.date.split("-")[2] == i.toString()
                      ).length > 0
                        ? celdasP.push(
                            <div
                              key={i}
                              className={`celda ${
                                diasArray.filter(
                                  (dia) =>
                                    dia.date.split("-")[2] == i.toString() &&
                                    dia.status == 0
                                ).length > 0
                                  ? "check-1 animation"
                                  : diasArray.filter(
                                      (dia) =>
                                        dia.date.split("-")[2] ==
                                          i.toString() && dia.status == 1
                                    ).length > 0
                                  ? "check-2 animation-2"
                                  : diasArray.filter(
                                      (dia) =>
                                        dia.date.split("-")[2] ==
                                          i.toString() && dia.status == 2
                                    ).length > 0
                                  ? "check-3 animation"
                                  : "check-4 animation-2"
                              }`}
                            ></div>
                          )
                        : celdasP.push(
                            <div
                              key={i}
                              className={`celda ${
                                (subP.diasChecklist.length > 0 &&
                                  new Date(
                                    subP.diasChecklist[
                                      subP.diasChecklist.length - 1
                                    ].date
                                  ) <
                                    new Date(
                                      `${selectedYear}-${selectedMonth}-${i}`
                                    ) &&
                                  subP.cerrada) ||
                                (subP.diasChecklist.length > 0 &&
                                  new Date(subP.diasChecklist[0].date) >
                                    new Date(
                                      `${selectedYear}-${selectedMonth}-${i}`
                                    )) ||
                                new Date(
                                  `${selectedYear}-${selectedMonth}-${i}`
                                ) > new Date(actualDate)
                                  ? "celda-disabled-2"
                                  : ""
                              }`}
                            ></div>
                          );
                    }

                    return (
                      <div className="prog-table-item d-flex align-items-center">
                        <div className="tabla-dias d-flex">{celdasP}</div>
                      </div>
                    );
                  })
                : filteredData.map((proyecto) => {
                    let diasArray: IDia[] = [];
                    let totalDiasProj: IDia[] = [];
                    proyecto.subproyectos.map((subP) => {
                      subP.diasChecklist.map((dia) => {
                        totalDiasProj.push(dia);
                        if (dia.date.split("-")[0] == selectedYear.toString()) {
                          if (
                            dia.date.split("-")[1] == selectedMonth.toString()
                          ) {
                            diasArray.push(dia);
                          }
                        }
                      });
                    });
                    totalDiasProj.sort(function (a, b) {
                      return new Date(a.date) < new Date(b.date)
                        ? 1
                        : new Date(a.date) > new Date(b.date)
                        ? -1
                        : 0;
                    });

                    let celdasP = [];
                    for (let i = 1; i <= cantDias; i++) {
                      diasArray.filter(
                        (dia) => dia.date.split("-")[2] == i.toString()
                      ).length > 0
                        ? celdasP.push(
                            <div
                              key={i}
                              className={`celda ${
                                diasArray.filter(
                                  (dia) =>
                                    dia.date.split("-")[2] == i.toString() &&
                                    dia.status == 0
                                ).length > 0 &&
                                diasArray.filter(
                                  (dia) =>
                                    dia.date.split("-")[2] == i.toString() &&
                                    (dia.status == 1 || dia.status == 2)
                                ).length == 0
                                  ? "check-1 animation-1"
                                  : diasArray.filter(
                                      (dia) =>
                                        dia.date.split("-")[2] ==
                                          i.toString() && dia.status == 1
                                    ).length > 0 &&
                                    diasArray.filter(
                                      (dia) =>
                                        dia.date.split("-")[2] ==
                                          i.toString() && dia.status == 2
                                    ).length == 0
                                  ? "check-2 animation-2"
                                  : diasArray.filter(
                                      (dia) =>
                                        dia.date.split("-")[2] ==
                                          i.toString() && dia.status == 2
                                    ).length > 0
                                  ? "check-3 animation"
                                  : "check-4 animation-2"
                              }`}
                            ></div>
                          )
                        : celdasP.push(
                            <div
                              key={i}
                              className={`celda ${
                                (totalDiasProj.length > 0 &&
                                  new Date(
                                    totalDiasProj[totalDiasProj.length - 1].date
                                  ) <
                                    new Date(
                                      `${selectedYear}-${selectedMonth}-${i}`
                                    ) &&
                                  proyecto.archivado) ||
                                (totalDiasProj.length > 0 &&
                                  new Date(totalDiasProj[0].date) >
                                    new Date(
                                      `${selectedYear}-${selectedMonth}-${i}`
                                    )) ||
                                new Date(
                                  `${selectedYear}-${selectedMonth}-${i}`
                                ) > new Date(actualDate)
                                  ? "celda-disabled-2"
                                  : ""
                              }`}
                            ></div>
                          );
                    }
                    return <div className="tabla-dias d-flex">{celdasP}</div>;
                  })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
