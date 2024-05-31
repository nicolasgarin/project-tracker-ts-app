import React from "react";
import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import NewProjectForm from "../../src/components/NewProjectForm/NewProjectForm";
import "@testing-library/jest-dom/vitest";
import { DataProvider } from "../../src/context/DataContext";
import { DatesProvider } from "../../src/context/DatesContext";
import { UserOptionsProvider } from "../../src/context/UserOptionsContext";

const ContextWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserOptionsProvider>
      <DatesProvider>
        <DataProvider>{children}</DataProvider>
      </DatesProvider>
    </UserOptionsProvider>
  );
};

describe("NewProjectForm", () => {
  it("should render form", () => {
    render(<NewProjectForm />, { wrapper: ContextWrapper });

    const form = screen.getByRole("form");
    expect(form).toBeInTheDocument();
  });

  it("should render form elements", () => {
    const { container } = render(<NewProjectForm />, {
      wrapper: ContextWrapper,
    });

    const textInput = container.querySelector("#projectName");
    expect(textInput).toBeInTheDocument();

    const selectInput = container.querySelector("#categoria");
    expect(selectInput).toBeInTheDocument();

    const inputLabels = container.getElementsByTagName("label");
    expect(inputLabels.length).toBe(2);
    expect(inputLabels[0].textContent).toBe("Nuevo proyecto" || "New project");
    expect(inputLabels[1].textContent).toBe("Categoría" || "Category");

    const submitButton = container.querySelector("button");
    expect(submitButton).toBeInTheDocument();
    expect(submitButton?.textContent).toBe("Crear" || "Create");
  });
});
