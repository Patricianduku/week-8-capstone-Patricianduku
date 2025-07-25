import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Register from "../../src/pages/Register";

import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';

// Mock i18n
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str) => str,
  }),
}));

// Mock navigate
const mockedNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

describe('Register Page', () => {
  const setup = () =>
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

  it('renders all form fields', () => {
    setup();
    expect(screen.getByLabelText(/Full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/I agree to the/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign up/i })).toBeInTheDocument();
  });

  it('shows validation errors on submit with empty fields', async () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: /Sign up/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Please confirm your password/i)).toBeInTheDocument();
      expect(screen.getByText(/You must agree to the terms and conditions/i)).toBeInTheDocument();
    });
  });

  it('submits the form with valid input', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        headers: {
          get: () => 'application/json',
        },
        json: () =>
          Promise.resolve({
            token: 'fake-token',
            name: 'Test User',
            email: 'test@example.com',
          }),
      })
    );

    setup();

    fireEvent.change(screen.getByLabelText(/Full name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/Email address/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/^Password$/i), { target: { value: 'Password123!' } });
    fireEvent.change(screen.getByLabelText(/Confirm password/i), { target: { value: 'Password123!' } });
    fireEvent.click(screen.getByLabelText(/I agree to the/i));
    fireEvent.click(screen.getByRole('button', { name: /Sign up/i }));

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('/');
    });
  });
});
