import "./ProgressList.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useUserOptions from "../../context/UserOptionsContext";
import useDates from "../../context/DatesContext";
import SelectedMonthSetter from "../SelectedMonthSetter/SelectedMonthSetter";
import { capFirstLetter } from "../../utils/reusableFunctions";
import { getMonthFromString } from "../../utils/dateFunctions";
import { IProject } from "../../@types/data";
import FilterOptions from "../FilterOptions/FilterOptions";

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
  const { lang, showFinished, showMain, showArchiv } = useUserOptions();
  const {
    selectedYear,
    selectedMonth,
    actualDate,
    setSelectedYear,
    setSelectedMonth,
    cantDiasSelectedMonth,
  } = useDates();
  const [filteredData, setFilteredData] = useState(fullProjects);
  const [filteredProject, setFilteredProject] = useState<IProject | undefined>(
    project ? project : undefined
  );
  const [availableYears, setAvailableYears] = useState<string[]>([]);
  var celdasMes = [];
  var celdasMesLetras = [];
  var totalDiasSubp: IDia[] = [];
  var listaTotalDiasSubp: IDia[] = [];
  var listaTotalDiasProj: IDia[] = [];

  useEffect(() => {
    !project
      ? (filterFullTable(fullProjects),
        localStorage.setItem("showArchiv", showArchiv))
      : setFilteredProject(project);
  }, [fullProjects, showArchiv]);

  useEffect(() => {
    setSelectedYear(parseInt(actualDate.split("-")[0]));
    setSelectedMonth(getMonthFromString(actualDate));
  }, []);

  for (let i = 1; i <= cantDiasSelectedMonth; i++) {
    let letter = new Date(selectedYear, selectedMonth - 1, i)
      .toLocaleDateString(lang, {
        weekday: "long",
      })[0]
      .toUpperCase();
    celdasMes.push(
      <div
        key={`${i}-celdasMes`}
        className={"celda num d-flex justify-content-center align-items-center"}
      >
        {i}
      </div>
    );
    celdasMesLetras.push(
      <div
        key={`${i}-celdasMesLetras`}
        className={
          "celda letra d-flex align-items-center justify-content-center"
        }
      >
        {letter}
      </div>
    );
  }

  project
    ? filteredProject?.subproyectos.map((subP) => {
        subP.diasChecklist.map((dia) => {
          listaTotalDiasSubp.push(dia);
          if (!availableYears.includes(dia.date.split("-")[0])) {
            setAvailableYears([...availableYears, dia.date.split("-")[0]]);
          }
          if (dia.date.split("-")[0] == selectedYear.toString()) {
            if (dia.date.split("-")[1] == selectedMonth.toString()) {
              totalDiasSubp.push(dia);
            }
          }
        });
      })
    : filteredData.map((project) => {
        project.subproyectos.map((subP) => {
          subP.diasChecklist.map((dia) => {
            listaTotalDiasProj.push(dia);
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

  return (
    <>
      {(project && project?.subproyectos.length > 0) ||
      (!project && fullProjects.length > 0) ? (
        (project &&
          project.subproyectos.filter((sub) => !sub.cerrada).length == 0 &&
          showMain == "false" &&
          showFinished == "false") ||
        (!project &&
          fullProjects.filter((p) => !p.archivado).length == 0 &&
          showArchiv == "false") ? (
          <div className={`d-flex align-items-center justify-content-between ${!project? 'mt-3' : ""}`}>
            <h3 className="titulo">
              {lang == "es" ? "Progresión" : "Progress"}
            </h3>
            <FilterOptions project={project ? true : false} />
          </div>
        ) : (
          <div className={`progress-list card-container ${!project? 'mt-3' : ""} `}>
            <h3 className="titulo">
              {lang == "es" ? "Progresión" : "Progress"}
            </h3>
            <div className="date-setter d-flex flex-column flex-sm-row justify-content-between">
              <SelectedMonthSetter
                availableYears={availableYears}
                btnDisabled={
                  project && listaTotalDiasSubp.length > 0
                    ? listaTotalDiasSubp.sort((a,b)=> a.date.localeCompare(b.date))[0].date.split("-")[0] ==
                        selectedYear.toString() &&
                      listaTotalDiasSubp.sort((a,b)=> a.date.localeCompare(b.date))[0].date.split("-")[1] ==
                        selectedMonth.toString()
                    : project && listaTotalDiasSubp.length == 0
                    ? true
                    : !project && listaTotalDiasProj.length > 0
                    ? listaTotalDiasProj.sort((a,b)=> a.date.localeCompare(b.date))[0].date.split("-")[0] ==
                        selectedYear.toString() &&
                      listaTotalDiasProj.sort((a,b)=> a.date.localeCompare(b.date))[0].date.split("-")[1] ==
                        selectedMonth.toString()
                    : !project && listaTotalDiasProj.length == 0
                    ? true
                    : false
                }
              />
              <FilterOptions project={project ? true : false} />
            </div>
            <div className="cont-derecho">
              <div className="prog-table-item d-flex">
                <div key="1" className="left-sec">
                  {project
                    ? project.subproyectos.map((subcat) => {
                        if (showFinished == "false" && subcat.cerrada == true) {
                          null;
                        } else {
                          return (
                            <div key={`${subcat.nombreSubp}`} className="nombre-fila bold">
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
                              key={`${proyecto.id}-nombre-fila`}
                              className="nombre-fila plm bold texto-celeste"
                            >
                              {capFirstLetter(proyecto.nombre)}
                            </div>
                          </Link>
                        );
                      })}
                  {project ? (
                    showMain == "true" ? (
                      <div className="nombre-fila bold mt-3">
                        {project.nombre}
                      </div>
                    ) : null
                  ) : null}
                </div>
                <div key="2" className="right-sec">
                  <div className="tabla-dias d-flex">{celdasMes}</div>
                  <div className="tabla-dias d-flex mb-3">
                    {celdasMesLetras}
                  </div>
                  {project
                    ? project.subproyectos.map((subP) => {
                        let diasArray: IDia[] = [];
                        let diasTotalSubpArray: IDia[] = [];
                        subP.diasChecklist.map((dia) => {
                          diasTotalSubpArray.push(dia);
                          if (
                            dia.date.split("-")[0] == selectedYear.toString()
                          ) {
                            if (
                              dia.date.split("-")[1] == selectedMonth.toString()
                            ) {
                              diasArray.push(dia);
                            }
                          }
                        });

                        var celdasP = [];
                        for (let i = 1; i <= cantDiasSelectedMonth; i++) {
                          diasArray.filter(
                            (dia) => dia.date.split("-")[2] == i.toString()
                          ).length > 0
                            ? celdasP.push(
                                <div
                                  key={`${i}-celdasP`}
                                  className={`celda ${
                                    diasArray.filter(
                                      (dia) =>
                                        dia.date.split("-")[2] ==
                                          i.toString() && dia.status == 0
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
                                  key={`${i}-celdasPe`}
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
                                    ) > new Date(actualDate) ||
                                    diasTotalSubpArray.length == 0
                                      ? "celda-disabled-2"
                                      : ""
                                  }`}
                                ></div>
                              );
                        }
                        if (subP.cerrada && showFinished == "false") {
                          null;
                        } else {
                          return (
                            <div key={`${subP.nombreSubp}-progTable`} className="prog-table-item d-flex align-items-center">
                              <div key={`${subP.nombreSubp}-tablaDias`} className="tabla-dias d-flex">{celdasP}</div>
                            </div>
                          );
                        }
                      })
                    : filteredData.map((proyecto) => {
                        let diasArray: IDia[] = [];
                        let totalDiasProj: IDia[] = [];
                        proyecto.subproyectos.map((subP) => {
                          subP.diasChecklist.map((dia) => {
                            totalDiasProj.push(dia);
                            if (
                              dia.date.split("-")[0] == selectedYear.toString()
                            ) {
                              if (
                                dia.date.split("-")[1] ==
                                selectedMonth.toString()
                              ) {
                                diasArray.push(dia);
                              }
                            }
                          });
                        });
                        totalDiasProj.sort(function (a, b) {
                          return new Date(a.date) > new Date(b.date)
                            ? 1
                            : new Date(a.date) < new Date(b.date)
                            ? -1
                            : 0;
                        });

                        let celdasP = [];
                        for (let i = 1; i <= cantDiasSelectedMonth; i++) {
                          diasArray.filter(
                            (dia) => dia.date.split("-")[2] == i.toString()
                          ).length > 0
                            ? celdasP.push(
                                <div
                                  key={`${i}-celdasPa`}
                                  className={`celda ${
                                    diasArray.filter(
                                      (dia) =>
                                        dia.date.split("-")[2] ==
                                          i.toString() && dia.status == 0
                                    ).length > 0 &&
                                    diasArray.filter(
                                      (dia) =>
                                        dia.date.split("-")[2] ==
                                          i.toString() &&
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
                                  key={`${i}-celdasPb`}
                                  className={`celda ${
                                    (totalDiasProj.length > 0 &&
                                      new Date(
                                        totalDiasProj[
                                          totalDiasProj.length - 1
                                        ].date
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
                        return (
                          <div key={proyecto.id} className="tabla-dias d-flex">{celdasP}</div>
                        );
                      })}
                  {project && showMain == "true" ? (
                    <div className="prog-table-item d-flex align-items-center mt-3">
                      <div className="tabla-dias d-flex">
                        {
                          project.subproyectos.map((subP) => {
                            totalDiasSubp = [];
                            listaTotalDiasSubp = [];
                            subP.diasChecklist.map((dia) => {
                              listaTotalDiasSubp.push(dia);
                              if (dia.date.split("-")[0] == selectedYear.toString()) {
                                if (dia.date.split("-")[1] == selectedMonth.toString()) {
                                  totalDiasSubp.push(dia);
                                }
                              }
                            });
                            let celdasListaTotalDiasSubp = [];
                            for (let i = 1; i <= cantDiasSelectedMonth; i++) {
                              totalDiasSubp.filter((dia) => dia.date.split("-")[2] == i.toString())
                                .length > 0
                                ? celdasListaTotalDiasSubp.push(
                                    <div
                                      key={`${i}-celdasListaTotalDiasSubp`}
                                      className={`celda ${
                                        totalDiasSubp.filter(
                                          (dia) =>
                                            dia.date.split("-")[2] == i.toString() && dia.status == 0
                                        ).length > 0 &&
                                        totalDiasSubp.filter(
                                          (dia) =>
                                            dia.date.split("-")[2] == i.toString() &&
                                            (dia.status == 1 || dia.status == 2)
                                        ).length == 0
                                          ? "check-1 animation-1"
                                          : totalDiasSubp.filter(
                                              (dia) =>
                                                dia.date.split("-")[2] == i.toString() && dia.status == 1
                                            ).length > 0 &&
                                            totalDiasSubp.filter(
                                              (dia) =>
                                                dia.date.split("-")[2] == i.toString() && dia.status == 2
                                            ).length == 0
                                          ? "check-2 animation-2"
                                          : totalDiasSubp.filter(
                                              (dia) =>
                                                dia.date.split("-")[2] == i.toString() && dia.status == 2
                                            ).length > 0
                                          ? "check-3 animation"
                                          : "check-4 animation-2"
                                      }`}
                                    ></div>
                                  )
                                : celdasListaTotalDiasSubp.push(
                                    <div
                                      key={`${i}-celdasListaTotalDiasSubp`}
                                      className={`celda ${
                                        (listaTotalDiasSubp.length > 0 &&
                                          new Date(
                                            listaTotalDiasSubp[listaTotalDiasSubp.length - 1].date
                                          ) < new Date(`${selectedYear}-${selectedMonth}-${i}`) &&
                                          project?.archivado) ||
                                        (listaTotalDiasSubp.length > 0 &&
                                          new Date(listaTotalDiasSubp[0].date) >
                                            new Date(`${selectedYear}-${selectedMonth}-${i}`)) ||
                                        new Date(`${selectedYear}-${selectedMonth}-${i}`) >
                                          new Date(actualDate)
                                          ? "celda-disabled-2"
                                          : ""
                                      }`}
                                    ></div>
                                  );
                            }
                            return (<>{celdasListaTotalDiasSubp}</>)
                          })
                        }
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        )
      ) : null}
    </>
  );
}
