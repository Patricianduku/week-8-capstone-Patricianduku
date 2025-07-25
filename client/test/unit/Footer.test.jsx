import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Footer from "../../src/components/Footer";

import { vi } from "vitest";

// Mock fetch globally
global.fetch = vi.fn();

describe("Footer Component", () => {
  beforeEach(() => {
    fetch.mockReset(); // Reset between tests
  });

  it("renders logo and mission", () => {
    render(<Footer />);
    expect(screen.getByAltText(/Tuliza Logo/i)).toBeInTheDocument();
    expect(screen.getByText(/Find Your Calm/i)).toBeInTheDocument();
    expect(screen.getByText(/Empowering Kenyan youth/i)).toBeInTheDocument();
  });

  it("renders quick links", () => {
    render(<Footer />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Journal")).toBeInTheDocument();
    expect(screen.getByText("Support Rooms")).toBeInTheDocument();
    expect(screen.getByText("Resources")).toBeInTheDocument();
  });

  it("renders contact section", () => {
    render(<Footer />);
    expect(screen.getByText(/support@tuliza.co.ke/i)).toBeInTheDocument();
    expect(screen.getByText(/Emergency: 1199/i)).toBeInTheDocument();
  });

  it("renders legal links", () => {
    render(<Footer />);
    expect(screen.getByText(/Privacy Policy/i)).toBeInTheDocument();
    expect(screen.getByText(/Terms of Service/i)).toBeInTheDocument();
    expect(screen.getByText(/Cookie Policy/i)).toBeInTheDocument();
  });

  it("shows error if newsletter email is empty", async () => {
    render(<Footer />);
    fireEvent.click(screen.getByText(/Sign Up/i));
    await waitFor(() => {
      expect(screen.getByText(/Please enter your email/i)).toBeInTheDocument();
    });
  });

  it("handles newsletter success", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: "Success" }),
    });

    render(<Footer />);
    fireEvent.change(screen.getByLabelText(/Email address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.click(screen.getByText(/Sign Up/i));

    await waitFor(() => {
      expect(screen.getByText(/Thank you for signing up!/i)).toBeInTheDocument();
    });
  });

  it("handles newsletter failure", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: "Signup failed" }),
    });

    render(<Footer />);
    fireEvent.change(screen.getByLabelText(/Email address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.click(screen.getByText(/Sign Up/i));

    await waitFor(() => {
      expect(screen.getByText(/Signup failed/i)).toBeInTheDocument();
    });
  });
});
