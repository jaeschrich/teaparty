import { render, screen } from '@testing-library/react'
import React from 'react';
import { StaticRouter as Router } from 'react-router-dom';
import { App } from './app';

test('App component should / route', () => {
    // render(<Router location="/"><App /></Router>);
    // expect(screen.getByRole("heading").textContent).toBe("Hello Tea Party!");
});

test('App component should /craig route', () => {
    // render(<Router location="/craig"><App /></Router>);
    // expect(screen.getByRole("heading").textContent).toBe("Hello Craig!");
});