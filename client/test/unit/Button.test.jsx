import { describe, test, expect } from 'vitest';

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../../src/components/Button';

describe('Button', () => {
  test('renders the button with text', () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByText(/click me/i);
    expect(button).toBeInTheDocument();
  });

  test('calls onClick when clicked', () => {
    const handleClick = vi.fn(); // ← Use vi.fn() for Vitest
    render(<Button onClick={handleClick}>Click</Button>);
    const button = screen.getByText(/click/i);
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
