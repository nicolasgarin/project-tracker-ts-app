import useData from "../context/DataContext";
import useUserOptions from "../context/UserOptionsContext";
import { CardList } from "../layouts/CardList";
import NewProjectForm from "../components/NewProjectForm";
import SelectedDaySetter from "../components/SelectedDaySetter";
import ProjectCard from "../components/ProjectCard";
import EmptyInfo from "../components/EmptyInfo";

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
