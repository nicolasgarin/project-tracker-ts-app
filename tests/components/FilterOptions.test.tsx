import React, { Children } from "react";
import { it, expect, describe } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import FilterOptions from "../../src/components/FilterOptions/FilterOptions";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";
import { DataProvider } from "../../src/context/DataContext";
import { DatesProvider } from "../../src/context/DatesContext";
import { UserOptionsProvider } from "../../src/context/UserOptionsContext";
import { ContextWrapper } from "../setup";

describe("FilterOptions", () => {
  it("should render filter options elements if it is in main page", () => {
    const { container } = render(<FilterOptions project={false} />, {
      wrapper: ContextWrapper,
    });

    const filterOptions = container.querySelector("#filter-options");
    expect(filterOptions).toBeInTheDocument();

    const filterOptionsElements = container.getElementsByClassName("op");
    expect(filterOptionsElements.length).toBe(1);

    const filterOptionsInput = container.querySelector("#showArchivCheckbox");
    expect(filterOptionsInput).toBeInTheDocument();

    const filterOptionsIcon = container.querySelector(".op > svg");
    expect(filterOptionsIcon).toBeInTheDocument();
  });

  it("should render filter options elements if it is in a project page", () => {
    const { container } = render(<FilterOptions project={true} />, {
      wrapper: ContextWrapper,
    });

    const filterOptions = container.querySelector(".filter-options");
    expect(filterOptions).toBeInTheDocument();

    const filterOptionsElements = container.getElementsByClassName("op");
    expect(filterOptionsElements.length).toBe(2);

    const filterOptionsInput = container.getElementsByClassName("celda");
    expect(filterOptionsInput.length).toBe(2);

    const filterOptionsIcon = container.querySelector(".op > svg");
    expect(filterOptionsIcon).toBeInTheDocument();
  });

  it("should change userOptions when clicked in main page", () => {
    const { container } = render(<FilterOptions project={false} />, {
      wrapper: ContextWrapper,
    });

    const filterOptionsInput = container.querySelector("#showArchivCheckbox");
    expect(filterOptionsInput).toBeInTheDocument();

    const showArchivCheck = container.querySelector(
      "#showArchivCheckbox > svg"
    );
    expect(showArchivCheck).not.toBeInTheDocument();
    filterOptionsInput ? userEvent.click(filterOptionsInput) : null;
    //expect(showArchivCheck).toBeInTheDocument();
  });
});
