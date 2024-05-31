import React from 'react';
import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import EmptyInfo from '../../src/components/EmptyInfo/EmptyInfo';
import '@testing-library/jest-dom/vitest';

describe('EmptyInfo', () => {
    it('should display message', () => {
        render(<EmptyInfo mssg='Texto de prueba' />);

        const heading = screen.getByRole('heading');
        expect(heading).toBeInTheDocument();
        expect(heading).toHaveTextContent(/texto de prueba/i);
    })

    it('should display image if provided', () => {
        render(<EmptyInfo mssg='Texto de prueba' img='cohete' />);

        const image = screen.getByRole('img');
        expect(image).toBeInTheDocument();
    })

    it('should not display image if not provided', () => {
        const { container } = render(<EmptyInfo mssg='Texto de prueba' />);

        expect(container.getElementsByClassName('emptyinfo-img').length).toBe(0);
    })
})