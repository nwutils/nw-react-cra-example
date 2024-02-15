import { render, screen } from '@testing-library/react';

import { describe, expect, it } from "vitest";

import App from './App';

describe('app test suite', () => {
  it('renders learn react link', () => {
    render(<App />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
  });
});
