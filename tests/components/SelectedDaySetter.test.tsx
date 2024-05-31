import React from "react";
import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import SelectedDaySetter from "../../src/components/SelectedDaySetter/SelectedDaySetter";
import "@testing-library/jest-dom/vitest";
import { ContextWrapper } from "../setup";

describe("SelectedDaySetter", () => {
  it("should render date selector and elements", () => {
    const { container } = render(<SelectedDaySetter />, {
      wrapper: ContextWrapper,
    });

    const daySetter = container.querySelector("#day-setter");
    expect(daySetter).toBeInTheDocument();

    const dayName = container.querySelector(".day-name");
    expect(dayName).toBeInTheDocument();

    const prevButton = container.querySelector("#prev-day");
    expect(prevButton).toBeInTheDocument();

    const prevButtonIcon = container.querySelector("#prev-day > svg");
    expect(prevButtonIcon).toBeInTheDocument();

    const nextButton = container.querySelector("#next-day");
    expect(nextButton).toBeInTheDocument();

    const nextButtonIcon = container.querySelector("#next-day > svg");
    expect(nextButtonIcon).toBeInTheDocument();});
});
