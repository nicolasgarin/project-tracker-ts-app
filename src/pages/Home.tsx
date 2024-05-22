import useData from "../context/DataContext";
import useUserOptions from "../context/UserOptionsContext";
import NewProjectForm from "../components/NewProjectForm/NewProjectForm";
import SelectedDaySetter from "../components/SelectedDaySetter/SelectedDaySetter";
import ProjectCard from "../components/ProjectCard";
import EmptyInfo from "../components/EmptyInfo/EmptyInfo";
import { CardList } from "../layouts/CardList/CardList";

export default function Home() {
  const { data } = useData();
  const { theme, lang } = useUserOptions();

  return (
    <>
      <div className={`home ${theme}`}>
        <NewProjectForm />
        <div className="main">
          <div className="main-container">
            <section className="container-lg">
              <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start mb-3">
                <h2 className="titulo">
                  {lang == "es" ? "Proyectos" : "Projects"}
                </h2>
                <SelectedDaySetter />
              </div>
              {data.length > 0 ? (
                <CardList>
                  {data.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </CardList>
              ) : (
                <EmptyInfo
                  mssg={
                    lang == "es"
                      ? "Ingrese nuevos proyectos"
                      : "Enter new projects"
                  }
                  img="telescopio"
                />
              )}
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
