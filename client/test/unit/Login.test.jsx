import { render, fireEvent } from '@testing-library/react';
import Login from '../../src/pages/Login';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';

// ✅ Mock i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe('Login Page', () => {
  it('renders login form', () => {
    const { getByLabelText, getByRole } = renderWithRouter(<Login />);
    expect(getByLabelText(/email/i)).toBeInTheDocument();
    expect(getByLabelText(/password/i)).toBeInTheDocument();
    expect(getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('displays validation errors on empty submit', () => {
    const { getByRole, getByText } = renderWithRouter(<Login />);
    const button = getByRole('button', { name: /sign in/i });
    fireEvent.click(button);

    expect(getByText(/Email is required/i)).toBeInTheDocument();
    expect(getByText(/Password is required/i)).toBeInTheDocument();
  });
});
