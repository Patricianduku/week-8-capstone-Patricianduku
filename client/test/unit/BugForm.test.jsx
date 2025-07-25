import { render, screen, fireEvent } from '@testing-library/react';
import BugForm from '../../src/components/BugForm';
import { describe, it, expect, vi } from 'vitest';

describe('BugForm', () => {
  it('renders input fields and submit button', () => {
    render(<BugForm onSubmit={() => {}} />);
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit bug/i })).toBeInTheDocument();
  });

  it('calls onSubmit with correct data when form is submitted', () => {
    const mockSubmit = vi.fn();
    render(<BugForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Crash on login' } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'App crashes when logging in with invalid credentials' } });
    fireEvent.click(screen.getByRole('button', { name: /submit bug/i }));

    expect(mockSubmit).toHaveBeenCalledWith({
      title: 'Crash on login',
      description: 'App crashes when logging in with invalid credentials',
    });
  });

  it('does not call onSubmit if title is empty', () => {
    const mockSubmit = vi.fn();
    render(<BugForm onSubmit={mockSubmit} />);
    fireEvent.click(screen.getByRole('button', { name: /submit bug/i }));
    expect(mockSubmit).not.toHaveBeenCalled();
  });
});
