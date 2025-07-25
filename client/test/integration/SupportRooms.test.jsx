import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SupportRooms from '@/pages/SupportRooms';


import { BrowserRouter } from 'react-router-dom';
import * as authHook from '../../../hooks/useAuth'; 
import '@testing-library/jest-dom';

vi.mock('../../../components/ChatRoom', () => ({
  default: ({ room, onBack }) => (
    <div>
      <h2>ChatRoom for {room.name}</h2>
      <button onClick={onBack}>Back</button>
    </div>
  ),
}));

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('SupportRooms page', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('redirects to login if no user is logged in', () => {
    vi.spyOn(authHook, 'useAuth').mockReturnValue({ user: null });

    renderWithRouter(<SupportRooms />);

    expect(screen.queryByText(/Support Rooms/i)).not.toBeInTheDocument();
  });

  it('displays all rooms if user is authenticated', () => {
    vi.spyOn(authHook, 'useAuth').mockReturnValue({ user: { id: 'abc123' } });

    renderWithRouter(<SupportRooms />);

    expect(screen.getByText('Support Rooms')).toBeInTheDocument();
    expect(screen.getByText('Anxiety Support')).toBeInTheDocument();
    expect(screen.getByText('Depression Support')).toBeInTheDocument();
    expect(screen.getByText('Grief & Loss')).toBeInTheDocument();
  });

  it('filters rooms when a category is selected', () => {
    vi.spyOn(authHook, 'useAuth').mockReturnValue({ user: { id: 'abc123' } });

    renderWithRouter(<SupportRooms />);

    fireEvent.click(screen.getByText('Wellness'));

    expect(screen.queryByText('Anxiety Support')).not.toBeInTheDocument();
    expect(screen.queryByText('Depression Support')).not.toBeInTheDocument();
    expect(screen.getByText('Sleep Support')).toBeInTheDocument();
    expect(screen.getByText('Self-Care Circle')).toBeInTheDocument();
  });

  it('enters a chat room when clicked', () => {
    vi.spyOn(authHook, 'useAuth').mockReturnValue({ user: { id: 'abc123' } });

    renderWithRouter(<SupportRooms />);

    fireEvent.click(screen.getByText('Anxiety Support'));

    expect(screen.getByText('ChatRoom for Anxiety Support')).toBeInTheDocument();

    // Go back
    fireEvent.click(screen.getByText('Back'));
    expect(screen.getByText('Support Rooms')).toBeInTheDocument();
  });
});
