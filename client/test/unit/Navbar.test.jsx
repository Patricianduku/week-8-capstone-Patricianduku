import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../../src/components/Navbar';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';

beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value:vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // deprecated
        removeListener:vi.fn(), // deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });
  vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => key,
        i18n: {
          language: 'en',
          changeLanguage: vi.fn(),
        },
    }),
  }));
    
const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Navbar', () => {
  it('renders all navigation links', () => {
    renderWithRouter(<Navbar />);

    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Support Rooms/i)).toBeInTheDocument();
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  it('toggles dark mode when button is clicked', () => {
    renderWithRouter(<Navbar />);
    const toggle = screen.getByRole('button', { name: /toggle dark mode/i });

    fireEvent.click(toggle);

    // Add expectations depending on your logic (e.g., class change)
    // This line is just a placeholder
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('matches snapshot', () => {
    const { asFragment } = renderWithRouter(<Navbar />);
    expect(asFragment()).toMatchSnapshot();
  });
});
