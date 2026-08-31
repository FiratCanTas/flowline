import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, test, expect, vi } from 'vitest';
import DealForm from './DealForm';

const renderWithClient = (ui) => {
  const queryClient = new QueryClient();
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
};

describe('DealForm', () => {
  test('shows a validation error when submitted with empty fields', async () => {
    const mockOnSubmit = vi.fn();
    const user = userEvent.setup();

    renderWithClient(<DealForm onSubmit={mockOnSubmit} />);
    await user.click(screen.getByRole('button', { name: /save/i }));

    expect(await screen.findByText('Title is required!')).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
});
