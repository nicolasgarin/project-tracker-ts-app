import React from "react";
import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import ProjectInfo from "../../src/components/ProjectInfo/ProjectInfo";
import "@testing-library/jest-dom/vitest";
import { ContextWrapper } from "../setup";

const mockProject = {
  id: "1",
  nombre: "test",
  tipo: "test",
  fechaCreacion: "10/11/2022",
  favorito: false,
  archivado: false,
  logros: [],
  subproyectos: [
    {
      nombreSubp: "test",
      idSubp: "1",
      cerrada: false,
      diasChecklist: [
        {
          date: "10/11/2022",
          status: 0,
        },
        {
          date: "13/11/2022",
          status: 1,
        },
        {
          date: "14/12/2022",
          status: 2,
        },
        {
          date: "20/12/2022",
          status: 3,
        },
        {
          date: "21/12/2022",
          status: 3,
        },
        {
          date: "22/12/2022",
          status: 3,
        },
      ],
    },
  ],
};

describe("ProjectInfo", () => {
  it("should render elements", () => {
    const { container } = render(<ProjectInfo project={mockProject} />, {
      wrapper: ContextWrapper,
    });

    const infoTab = container.getElementsByClassName("stats-tab");
    expect(infoTab.length).toBe(1);

    const subSections = container.getElementsByClassName("subsect");
    expect(subSections.length).toBe(5);

    const projectImg = container.getElementsByClassName("type-icon");
    expect(projectImg.length).toBe(1);

    const fechaCreacion = container.querySelector("#fechaCreacion");
    expect(fechaCreacion).toBeInTheDocument();
    const fecha =
      fechaCreacion?.textContent?.split(" ")[
        fechaCreacion?.textContent?.split(" ").length - 1
      ];
    //expect(fecha).toBe(mockProject.fechaCreacion);

    const tipo = container.querySelector("#tipo");
    expect(tipo).toBeInTheDocument();
    const type =
      tipo?.textContent?.split(" ")[tipo?.textContent?.split(" ").length - 1];
    expect(type).toBe(mockProject.tipo);

    const cantSubproyectos = container.querySelector("#totalSubproyectos");
    expect(cantSubproyectos).toBeInTheDocument();
    const cant =
      cantSubproyectos?.textContent?.split(" ")[
        cantSubproyectos?.textContent?.split(" ").length - 1
      ];
    expect(cant).toBe(mockProject.subproyectos.length.toString());

    const cantActivos = container.querySelector("#subproyectosActivos");
    expect(cantActivos).toBeInTheDocument();
    const cantAct =
      cantActivos?.textContent?.split(" ")[
        cantActivos?.textContent?.split(" ").length - 1
      ];
    expect(cantAct).toBe(
      mockProject.subproyectos.filter((sub) => !sub.cerrada).length.toString()
    );

    const cantCerradas = container.querySelector("#subproyectosCerrados");
    expect(cantCerradas).toBeInTheDocument();
    const cantCerr =
      cantCerradas?.textContent?.split(" ")[
        cantCerradas?.textContent?.split(" ").length - 1
      ];
    expect(cantCerr).toBe(
      mockProject.subproyectos.filter((sub) => sub.cerrada).length.toString()
    );

    const logros = container.querySelector("#totalLogros");
    expect(logros).toBeInTheDocument();
    const cantLogros =
      logros?.textContent?.split(" ")[
        logros?.textContent?.split(" ").length - 1
      ];
    expect(cantLogros).toBe(mockProject.logros.length.toString());

    const cantDiasCheckeados = container.querySelector("#totalDias");
    expect(cantDiasCheckeados).toBeInTheDocument();
    const cantDias =
      cantDiasCheckeados?.textContent?.split(" ")[
        cantDiasCheckeados?.textContent?.split(" ").length - 1
      ];
    expect(cantDias).toBe(
      mockProject.subproyectos[0].diasChecklist.length.toString()
    );

    const cantDiasStatus0 = container.querySelector("#cantDiasStatus0");
    expect(cantDiasStatus0).toBeInTheDocument();
    const cantDias0 = cantDiasStatus0?.textContent;
    expect(cantDias0).toBe(
      mockProject.subproyectos[0].diasChecklist
        .filter((dia) => dia.status == 0)
        .length.toString()
    );

    const cantDiasStatus1 = container.querySelector("#cantDiasStatus1");
    expect(cantDiasStatus1).toBeInTheDocument();
    const cantDias1 = cantDiasStatus1?.textContent;
    expect(cantDias1).toBe(
      mockProject.subproyectos[0].diasChecklist
        .filter((dia) => dia.status == 1)
        .length.toString()
    );

    const cantDiasStatus2 = container.querySelector("#cantDiasStatus2");
    expect(cantDiasStatus2).toBeInTheDocument();
    const cantDias2 = cantDiasStatus2?.textContent;
    expect(cantDias2).toBe(
      mockProject.subproyectos[0].diasChecklist
        .filter((dia) => dia.status == 2)
        .length.toString()
    );

    const cantDiasStatus3 = container.querySelector("#cantDiasStatus3");
    expect(cantDiasStatus3).toBeInTheDocument();
    const cantDias3 = cantDiasStatus3?.textContent;
    expect(cantDias3).toBe(
      mockProject.subproyectos[0].diasChecklist
        .filter((dia) => dia.status == 3)
        .length.toString()
    );

    expect(
      parseInt(cantDias0 || "0") +
        parseInt(cantDias1 || "0") +
        parseInt(cantDias2 || "0") +
        parseInt(cantDias3 || "0")
    ).toBe(parseInt(cantDias || "0"));
  });
});
