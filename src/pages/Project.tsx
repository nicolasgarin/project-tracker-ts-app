import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import useData from "../context/DataContext";
import useUserOptions from "../context/UserOptionsContext";
import ProgressList from "../components/ProgressList/ProgressList";
import ProjectCompleted from "../components/ProjectCompleted/ProjectCompleted";
import ProjectLogros from "../components/ProjectLogros/ProjectLogros";
import ProjectInfo from "../components/ProjectInfo/ProjectInfo";
import NewSubprojectForm from "../components/NewSubprojectForm/NewSubprojectForm";
import SelectedDaySetter from "../components/SelectedDaySetter/SelectedDaySetter";
import EmptyInfo from "../components/EmptyInfo/EmptyInfo";
import Tabs from "../components/TabsComponent/TabsComponent";
import { ThemedContainer } from "../layouts/ThemedContainer";
import { MainContainer } from "../layouts/MainContainer";
import { capFirstLetter } from "../utils/reusableFunctions";
import { FaAngleLeft } from "react-icons/fa6";
import SubprojectCard from "../components/SubprojectCard/SubprojectCard";

export default function Project() {
  const { data } = useData();
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
                    <SubprojectCard
                      key={subP.idSubp}
                      proyecto={proyecto}
                      subP={subP}
                    />
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
                  content: <div>{content}</div>,
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
