import React from 'react';
import { render, screen } from '@testing-library/react';
import BugList from '../../src/components/BugList';

describe('BugList', () => {
  test('renders a list of bugs', () => {
    const bugs = [
      { id: 1, title: 'Bug one' },
      { id: 2, title: 'Bug two' }
    ];
    render(<BugList bugs={bugs} />);
    const bugOne = screen.getByText(/bug one/i);
    const bugTwo = screen.getByText(/bug two/i);
    expect(bugOne).toBeInTheDocument();
    expect(bugTwo).toBeInTheDocument();
  });
});
