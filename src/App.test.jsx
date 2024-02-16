import { render, screen } from '@testing-library/react';

import { describe, expect, it } from "vitest";

import App from './App';

describe('app test suite', () => {
  it('renders title', () => {
    render(<App />);
    const linkElement = screen.getByText(/NW.js React Example/i);
    expect(linkElement).toBeInTheDocument();
  });
});
