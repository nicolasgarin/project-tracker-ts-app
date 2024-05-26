import { render, screen } from "@testing-library/react";
import pkg from "vitest";
const { beforeEach, describe, expect, it } = pkg;
import NewProjectForm from "../components/NewProjectForm/NewProjectForm";
import '@testing-library/jest-dom/jest-globals';
import '@testing-library/jest-dom';

describe("NewProjectForm", () => {

    beforeEach(() => {
        render(<NewProjectForm />)
    });

    it("renders correctly", () => {
        const form = document.querySelector(".form-nuevo");
        expect(form).toBeInTheDocument();
    });
});