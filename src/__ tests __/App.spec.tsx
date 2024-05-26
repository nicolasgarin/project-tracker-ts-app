// src/__ tests __/App.test.tsx

import '@testing-library/jest-dom'
import { render } from "@testing-library/react"

test("Renders the main page", () => {
    render(<div id='a'>as</div>)
    expect(document.getElementById('a')).toHaveTextContent('a')
})