import { render, screen } from '@testing-library/react'
import React from 'react';
import { App } from './src/app';

test('App component should render name', () => {
    render(<App name="Tea Party" />);
    expect(screen.getByRole("heading").textContent).toBe("Hello Tea Party!");
});

test('App component should render name with emojis', () => {
    render(<App name="Tea Party🍵" />);
    expect(screen.getByRole("heading").textContent).toBe("Hello Tea Party🍵!");
});