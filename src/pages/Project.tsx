import { useParams } from "react-router";
import ProjectCompleted from "../components/ProjectCompleted";
import Tabs from "../components/TabsComponent";
import { useEffect, useState } from "react";
import useData from "../context/DataContext";
import ProjectLogros from "../components/ProjectLogros";
import useUserOptions from "../context/UserOptionsContext";
import ProjectInfo from "../components/ProjectInfo";

export default function Project() {
  const { data } = useData();
  const { id } = useParams();
  const { theme, lang } = useUserOptions();
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
    { id: "project_info", title: "Info", content: <ProjectInfo project={proyecto} /> },
  ];

  useEffect(() => {
    setProyecto(data.filter((proyecto) => proyecto.id == id)[0]);
  }, [data]);

  return (
    <>
      <div className={`main project ${theme}`}>
        <div className="container-lg"></div>
        <div className="tabs-wrapper">
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
    </>
  );
}
