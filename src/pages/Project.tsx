import { useParams } from "react-router";
import ProjectCompleted from "../components/ProjectCompleted/ProjectCompleted";
import Tabs from "../components/TabsComponent/TabsComponent";
import { useEffect, useState } from "react";
import useData from "../context/DataContext";
import ProjectLogros from "../components/ProjectLogros/ProjectLogros";
import useUserOptions from "../context/UserOptionsContext";
import ProjectInfo from "../components/ProjectInfo/ProjectInfo";
import { capFirstLetter } from "../utils/reusableFunctions";
import useDates from "../context/DatesContext";
import { ImCross } from "react-icons/im";
import { FaCheck } from "react-icons/fa";
import EmptyInfo from "../components/EmptyInfo/EmptyInfo";
import SelectedDaySetter from "../components/SelectedDaySetter/SelectedDaySetter";
import { Link } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa6";
import NewSubprojectForm from "../components/NewSubprojectForm/NewSubprojectForm";
import { ThemedContainer } from "../layouts/ThemedContainer";
import { MainContainer } from "../layouts/MainContainer";
import ProgressList from "../components/ProgressList/ProgressList";

export default function Project() {
  const { data } = useData();
  const { dispatch } = useData();
  const { selectedDate } = useDates();
  const { id } = useParams();
  const { lang } = useUserOptions();
  const [proyecto, setProyecto] = useState(
    data.filter((proyecto) => proyecto.id == id)[0]
  );
  const tabData = [
    {
      id: "project_completed",
      title: `${lang == "es" ? "Completados" : "Completed"}`,
      content: <ProjectCompleted project={proyecto} />,
    },
    {
      id: "projet_logros",
      title: `${lang == "es" ? "Logros" : "Achievements"}`,
      content: <ProjectLogros project={proyecto} />,
    },
    {
      id: "project_info",
      title: "Info",
      content: <ProjectInfo project={proyecto} />,
    },
  ];

  useEffect(() => {
    setProyecto(data.filter((proyecto) => proyecto.id == id)[0]);
  }, [data]);

  return (
    <ThemedContainer className="project">
      <MainContainer>
        <div className="d-flex flex-column flex-md-row align-items-between justify-content-between">
          <div className="project-header d-flex align-items-center">
            <Link
              to={"/project-tracker-ts-app/"}
              aria-label={lang == "es" ? "Volver al inicio" : "Return to home"}
            >
              <button className="btn btn-celeste flecha">
                <FaAngleLeft />
              </button>
            </Link>
            <h2 className="bold project-title">
              {capFirstLetter(proyecto.nombre)}
            </h2>
          </div>
          <SelectedDaySetter />
          <NewSubprojectForm proyecto={proyecto} />
        </div>
        <div className="subcat-list d-flex flex-column flex-md-row">
          <div className="subcats row d-flex">
            {proyecto.subproyectos.length > 0 &&
            proyecto.subproyectos.filter((subP) => subP.cerrada == false)
              .length > 0 ? (
              proyecto.subproyectos.map((subP) => {
                if (!subP.cerrada) {
                  return (
                    <div
                      className="subcat bold d-flex flex-column justify-content-between"
                      key={subP.idSubp}
                    >
                      <div className="fila-1 d-flex align-items-center justify-content-between">
                        <div className="subcat-name">
                          {capFirstLetter(subP.nombreSubp)}
                        </div>
                        <button
                          aria-label={
                            lang == "es"
                              ? "Eliminar subproyecto"
                              : "Delete subproject"
                          }
                          onClick={() =>
                            dispatch({
                              type: "ELIMINAR_SUBPROYECTO",
                              payload: { id: proyecto.id, idSubp: subP.idSubp },
                            })
                          }
                          className="btn btn-rojo square sq-sm"
                        >
                          <ImCross className="x" />
                        </button>
                      </div>
                      <div className="fila-2 d-flex align-items-center judfy-content-between">
                        <div>
                          {lang == "es" ? "Progreso del día" : "Day progress"}
                        </div>
                        <div
                          className={`celda celda-project ${
                            subP.diasChecklist.filter(
                              (dia) => dia.date == selectedDate
                            ).length > 0
                              ? subP.diasChecklist.filter(
                                  (dia) =>
                                    dia.date == selectedDate && dia.status == 0
                                ).length > 0
                                ? "check-1"
                                : subP.diasChecklist.filter(
                                    (dia) =>
                                      dia.date == selectedDate &&
                                      dia.status == 1
                                  ).length > 0
                                ? "check-2"
                                : subP.diasChecklist.filter(
                                    (dia) =>
                                      dia.date == selectedDate &&
                                      dia.status == 2
                                  ).length > 0
                                ? "check-3"
                                : "check-4"
                              : ""
                          } d-flex align-items-center justify-content-center`}
                          onClick={() =>
                            dispatch({
                              type: "ACTUALIZAR_SUBPROYECTO",
                              payload: {
                                id: proyecto.id,
                                idSubp: subP.idSubp,
                                diaActual: selectedDate,
                              },
                            })
                          }
                        >
                          <FaCheck className="check-ic" />
                        </div>
                      </div>

                      <div className="subcat-info d-flex flex-column g-10">
                        <div className="">
                          Total : {subP.diasChecklist.length}
                        </div>
                        <div className="row rg-10">
                          <div className="d-flex col-6 align-items-center g-15">
                            <div className="celda check-1"></div>
                            {
                              subP.diasChecklist.filter(
                                (dia) => dia.status == 0
                              ).length
                            }
                          </div>
                          <div className="d-flex col-6 align-items-center g-15">
                            <div className="celda check-2"></div>
                            {
                              subP.diasChecklist.filter(
                                (dia) => dia.status == 1
                              ).length
                            }
                          </div>
                          <div className="d-flex col-6 align-items-center g-15">
                            <div className="celda check-3"></div>
                            {
                              subP.diasChecklist.filter(
                                (dia) => dia.status == 2
                              ).length
                            }
                          </div>
                          <div className="d-flex col-6 align-items-center g-15">
                            <div className="celda check-4"></div>
                            {
                              subP.diasChecklist.filter(
                                (dia) => dia.status == 3
                              ).length
                            }
                          </div>
                        </div>
                      </div>
                      <button
                        aria-label={
                          lang == "es"
                            ? "Finalizar subproyecto"
                            : "Finish subproject"
                        }
                        onClick={() =>
                          dispatch({
                            type: "FINALIZAR_SUBPROYECTO",
                            payload: {
                              id: proyecto.id,
                              idSubp: subP.idSubp,
                            },
                          })
                        }
                        className="btn btn-celeste"
                      >
                        {lang == "es" ? "Finalizar" : "Finish"}
                      </button>
                    </div>
                  );
                }
              })
            ) : (
              <EmptyInfo
                mssg={
                  lang == "es" ? "Crea un subproyecto" : "Create a subproject"
                }
                img="cohete"
              />
            )}
          </div>
          <div className="tab-section">
            <Tabs>
              <Tabs.Titles
                items={tabData.map(({ id, title }) => ({ id, title }))}
              />
              <Tabs.Contents
                items={tabData.map(({ id, content }) => ({
                  id,
                  content: <p>{content}</p>,
                }))}
              />
            </Tabs>
          </div>
        </div>
        <ProgressList fullProjects={data} project={proyecto} />
      </MainContainer>
    </ThemedContainer>
  );
}
