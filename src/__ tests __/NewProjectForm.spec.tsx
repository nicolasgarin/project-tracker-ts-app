import '@testing-library/jest-dom'
import { render } from "@testing-library/react"
import NewProjectForm from '../components/NewProjectForm/NewProjectForm'

test("Renders the main page", () => {
    render(<NewProjectForm />)
    expect(document.getElementsByClassName('form-nuevo')).toHaveLength(1)
})