import React from "react";
import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import SelectedMonthSetter from "../../src/components/SelectedMonthSetter/SelectedMonthSetter";
import "@testing-library/jest-dom/vitest";
import { ContextWrapper } from "../setup";

const MockData = ["2021", "2022", "2023", "2024"];

describe("SelectedMonthSetter", () => {
  it("should render date selector and elements if btnDisabled is false", () => {
    const { container } = render(
      <SelectedMonthSetter availableYears={MockData} btnDisabled={false} />,
      {
        wrapper: ContextWrapper,
      }
    );

    const monthSetter = container.querySelector("#month-setter");
    expect(monthSetter).toBeInTheDocument();

    const yearSelector = screen.getByRole("listbox");
    expect(yearSelector).toBeInTheDocument();

    const monthName = container.querySelector(".month-name");
    expect(monthName).toBeInTheDocument();

    const prevButton = container.querySelector("#prev-month");
    expect(prevButton).toBeInTheDocument();
    expect(prevButton).not.toHaveAttribute("disabled");

    const prevButtonIcon = container.querySelector("#prev-month > svg");
    expect(prevButtonIcon).toBeInTheDocument();

    const nextButton = container.querySelector("#next-month");
    expect(nextButton).toBeInTheDocument();
    expect(nextButton).toHaveAttribute("disabled");

    const nextButtonIcon = container.querySelector("#next-month > svg");
    expect(nextButtonIcon).toBeInTheDocument();
  });

  it("should render date selector and elements if btnDisabled is true", () => {
    const { container } = render(
      <SelectedMonthSetter availableYears={MockData} btnDisabled={true} />,
      {
        wrapper: ContextWrapper,
      }
    );

    const monthSetter = container.querySelector("#month-setter");
    expect(monthSetter).toBeInTheDocument();

    const yearSelector = screen.getByRole("listbox");
    expect(yearSelector).toBeInTheDocument();

    const monthName = container.querySelector(".month-name");
    expect(monthName).toBeInTheDocument();

    const prevButton = container.querySelector("#prev-month");
    expect(prevButton).toBeInTheDocument();
    expect(prevButton).toHaveAttribute("disabled");

    const prevButtonIcon = container.querySelector("#prev-month > svg");
    expect(prevButtonIcon).toBeInTheDocument();

    const nextButton = container.querySelector("#next-month");
    expect(nextButton).toBeInTheDocument();
    expect(nextButton).toHaveAttribute("disabled");

    const nextButtonIcon = container.querySelector("#next-month > svg");
    expect(nextButtonIcon).toBeInTheDocument();
  });
});
