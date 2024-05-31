import React from "react";
import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import FilterOptions from "../../src/components/FilterOptions/FilterOptions";
import "@testing-library/jest-dom/vitest";
import { ContextWrapper } from "../setup";

describe("FilterOptions", () => {
    it("should render filter options elements if it is in main page", () => {
      const { container } = render(<FilterOptions project={false} />, {
        wrapper: ContextWrapper,
      });

      const filterOptions = container.querySelector(".filter-options");
      expect(filterOptions).toBeInTheDocument();
    });

    it("should render filter options elements if it is in a project page", () => {
        const { container } = render(<FilterOptions project={true} />, {
          wrapper: ContextWrapper,
        });

        const filterOptions = container.querySelector(".filter-options");
        expect(filterOptions).toBeInTheDocument();
      });
  })