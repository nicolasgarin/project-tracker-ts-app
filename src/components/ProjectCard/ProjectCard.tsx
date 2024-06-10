import { IProject } from "../../@types/data";
import { Link } from "react-router-dom";
import { BsHeartPulseFill } from "react-icons/bs";
import { FaBrain, FaPaintBrush, FaEye, FaStar } from "react-icons/fa";
import { GiNightSleep } from "react-icons/gi";
import { CiStar } from "react-icons/ci";
import { TbEyeClosed } from "react-icons/tb";
import { ImCross } from "react-icons/im";
import { capFirstLetter } from "../../utils/reusableFunctions";
import useData from "../../context/DataContext";
import useDates from "../../context/DatesContext";
import useUserOptions from "../../context/UserOptionsContext";
import "./ProjectCard.scss";

export default function ProjectCard({ project }: { project: IProject }) {
  const { dispatch } = useData();
  const { selectedDate } = useDates();
  const { lang } = useUserOptions();

  return (
    <>
      <div
        className={`card ${project.archivado ? "disabled" : ""}`}
        id={project.id}
        key={project.id}
        aria-disabled={{project.archivado ? true : false}
      >
        <div className="card-header">
          <h3 className="title d-flex justify-content-between align-items-center">
            {!project.archivado ? (
              <Link
                className="link-titulo"
                to={`/project-tracker-ts-app/projects/${project.id}`}
              >
                {capFirstLetter(project.nombre)}
              </Link>
            ) : (
              <div>{project.nombre}</div>
            )}
            {project.tipo == "Salud" ? (
              <BsHeartPulseFill />
            ) : project.tipo == "Crecimiento" ? (
              <FaBrain />
            ) : (
              <FaPaintBrush />
            )}
          </h3>
        </div>
        <div className="card-body d-flex flex-column justify-content-between">
          <div className="d-flex justify-content-between">
            <div className="subcats d-flex flex-column w-100">
              {project.subproyectos.length > 0 &&
              project.subproyectos.filter((subP) => subP.cerrada == false)
                .length > 0 ? (
                project.subproyectos.map((subP) => {
                  if (!subP.cerrada) {
                    return (
                      <div
                        className="fila-card d-flex align-items-center"
                        id={subP.idSubp}
                        key={subP.idSubp}
                        onClick={() =>
                          dispatch({
                            type: "ACTUALIZAR_SUBPROYECTO",
                            payload: {
                              id: project.id,
                              idSubp: subP.idSubp,
                              diaActual: selectedDate,
                            },
                          })
                        }
                      >
                        <div className="subcat-name">
                          {capFirstLetter(subP.nombreSubp)}
                        </div>
                        {!project.archivado ? (
                          <div
                            className={`celda celda-sm celda-check ${
                              subP.diasChecklist.filter(
                                (dia) => dia.date == selectedDate
                              ).length > 0
                                ? subP.diasChecklist.filter(
                                    (dia) =>
                                      dia.date == selectedDate &&
                                      dia.status == 0
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
                            }`}
                          ></div>
                        ) : (
                          <div className="celda celda-sm celda-disabled"></div>
                        )}
                      </div>
                    );
                  }
                })
              ) : (
                <div className="message texto-violeta">
                  {lang == "es" ? "Crea un subproyecto" : "Create a subproject"}
                </div>
              )}
            </div>
            <div className="vertical-btn d-flex flex-column">
              {!project.archivado ? (
                <div
                  role="button"
                  title={
                    lang == "es" ? "Marcar como favorito" : "Mark as favorite"
                  }
                  onClick={() =>
                    dispatch({
                      type: "FAV_PROYECTO",
                      payload: { id: project.id },
                    })
                  }
                  className={`star ${project.favorito ? "filled" : "outline"}`}
                >
                  <CiStar className="star-outline" />
                  <FaStar className="star-fill" />
                </div>
              ) : (
                <div className={`star outline disabled`}>
                  <CiStar className="star-outline" />
                </div>
              )}
              <div
                role="button"
                title={lang == "es" ? "Archivar proyecto" : "File project"}
                onClick={() =>
                  dispatch({
                    type: "ARCHIVAR_PROYECTO",
                    payload: { id: project.id },
                  })
                }
                className={`moon ${project.archivado ? "deactive" : "active"}`}
              >
                <GiNightSleep />
              </div>
            </div>
          </div>

          <div className="buttons d-flex justify-content-between align-items-center">
            {!project.archivado ? (
              <Link to={`/project-tracker-ts-app/projects/${project.id}`}>
                <button
                  aria-label={
                    lang == "es" ? "Expandir proyecto" : "Expand project"
                  }
                  className="btn btn-celeste-4 btn-ojo square"
                >
                  <TbEyeClosed className="closed" />
                  <FaEye className="open" />
                </button>
              </Link>
            ) : (
              <button
                disabled={true}
                aria-disabled={true}
                className="btn btn-celeste-4 btn-ojo square"
                aria-label={
                  lang == "es" ? "Expandir proyecto" : "Expand project"
                }
            >
                <TbEyeClosed className="closed" />
              </button>
            )}
            {!project.archivado ? (
              <button
                aria-label={
                  lang == "es" ? "Eliminar proyecto" : "Delete project"
                }
                
                onClick={() =>
                  dispatch({
                    type: "ELIMINAR_PROYECTO",
                    payload: { id: project.id },
                  })
                }
                className="btn btn-rojo square"
              >
                <ImCross className="x" />
              </button>
            ) : (
              <button disabled={true} className="btn btn-rojo square"
              aria-label={
                lang == "es" ? "Expandir proyecto" : "Expand project"
              }
              aria-disabled={true}
>
                <ImCross className="x" />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
