import React from "react";
import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import NewSubprojectForm from "../../src/components/NewSubprojectForm/NewSubprojectForm";
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
  subproyectos: [],
};

describe("NewSubprojectProjectForm", () => {
  it("should render form", () => {
    render(<NewSubprojectForm proyecto={mockProject} />, {
      wrapper: ContextWrapper,
    });

    const form = screen.getByRole("form");
    expect(form).toBeInTheDocument();
  });

  it("should render form elements", () => {
    const { container } = render(<NewSubprojectForm proyecto={mockProject} />, {
      wrapper: ContextWrapper,
    });

    const textInput = container.querySelector("#nombreSubproyecto");
    expect(textInput).toBeInTheDocument();

    const inputLabels = container.getElementsByTagName("label");
    expect(inputLabels.length).toBe(1);
    expect(inputLabels[0].textContent).toBe(
      "Nuevo subproyecto" || "New subproject"
    );

    const submitButton = container.querySelector("button");
    expect(submitButton).toBeInTheDocument();
    expect(submitButton?.textContent).toBe("Crear" || "Create");
  });
});
