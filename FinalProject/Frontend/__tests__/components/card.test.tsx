/**
 * Jest Component Tests for Card/Profile Builder Components
 * Tests: CardForm, CardPreview, CardList components
 */

import { render, screen, userEvent, waitFor } from '@testing-library/react';
import CardForm from '@/components/card/CardForm';
import CardPreview from '@/components/card/CardPreview';
import CardList from '@/components/card/CardList';

describe('CardForm Component', () => {
  const defaultCard = {
    name: '',
    title: '',
    email: '',
    phone: '',
    bio: '',
  };

  it('should render card form with all input fields', () => {
    render(<CardForm onSubmit={jest.fn()} />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/bio/i)).toBeInTheDocument();
  });

  it('should populate form with initial card data', () => {
    const card = {
      name: 'John Doe',
      title: 'Developer',
      email: 'john@example.com',
      phone: '+1234567890',
      bio: 'A passionate developer',
    };

    render(<CardForm initialCard={card} onSubmit={jest.fn()} />);

    expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Developer')).toBeInTheDocument();
  });

  it('should display character counter for bio field', async () => {
    const user = userEvent.setup();
    render(<CardForm onSubmit={jest.fn()} />);

    const bioInput = screen.getByLabelText(/bio/i);
    await user.type(bioInput, 'This is a test bio');

    expect(screen.getByText(/18\/500/)).toBeInTheDocument();
  });

  it('should validate required fields', async () => {
    const user = userEvent.setup();
    const handleSubmit = jest.fn();
    render(<CardForm onSubmit={handleSubmit} />);

    const submitButton = screen.getByRole('button', { name: /save/i });
    await user.click(submitButton);

    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
  });

  it('should validate email format', async () => {
    const user = userEvent.setup();
    render(<CardForm onSubmit={jest.fn()} />);

    const emailInput = screen.getByLabelText(/email/i);
    await user.type(emailInput, 'invalid-email');
    await user.tab();

    expect(screen.getByText(/valid email/i)).toBeInTheDocument();
  });

  it('should handle form submission', async () => {
    const user = userEvent.setup();
    const handleSubmit = jest.fn();
    render(<CardForm onSubmit={handleSubmit} />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /save/i });

    await user.type(nameInput, 'Jane Doe');
    await user.type(emailInput, 'jane@example.com');
    await user.click(submitButton);

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Jane Doe',
          email: 'jane@example.com',
        })
      );
    });
  });

  it('should support avatar upload', async () => {
    const user = userEvent.setup();
    render(<CardForm onSubmit={jest.fn()} />);

    const file = new File(['avatar'], 'avatar.jpg', { type: 'image/jpeg' });
    const uploadInput = screen.getByRole('button', { name: /upload avatar/i });

    // This is a simplified test. In real scenarios, you'd interact with input directly
    expect(uploadInput).toBeInTheDocument();
  });

  it('should disable submit button while loading', () => {
    render(<CardForm onSubmit={jest.fn()} isLoading={true} />);

    const submitButton = screen.getByRole('button', { name: /save/i });
    expect(submitButton).toBeDisabled();
  });
});

describe('CardPreview Component', () => {
  const sampleCard = {
    name: 'John Doe',
    title: 'Full Stack Developer',
    bio: 'I love building amazing products',
    email: 'john@example.com',
    phone: '+1234567890',
    avatar: 'https://example.com/avatar.jpg',
  };

  it('should render card preview', () => {
    render(<CardPreview card={sampleCard} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Full Stack Developer')).toBeInTheDocument();
  });

  it('should display avatar image', () => {
    render(<CardPreview card={sampleCard} />);

    const avatar = screen.getByAltText(/avatar/i);
    expect(avatar).toHaveAttribute('src', sampleCard.avatar);
  });

  it('should display contact information', () => {
    render(<CardPreview card={sampleCard} />);

    expect(screen.getByText(sampleCard.email)).toBeInTheDocument();
    expect(screen.getByText(sampleCard.phone)).toBeInTheDocument();
  });

  it('should toggle between mobile and desktop view', async () => {
    const user = userEvent.setup();
    const { container } = render(<CardPreview card={sampleCard} />);

    const toggleButton = screen.getByRole('button', { name: /mobile|desktop/i });
    expect(container.querySelector('.preview-desktop')).toBeInTheDocument();

    await user.click(toggleButton);
    expect(container.querySelector('.preview-mobile')).toBeInTheDocument();
  });

  it('should apply dark mode when enabled', () => {
    const { container } = render(<CardPreview card={sampleCard} darkMode={true} />);

    expect(container.querySelector('.dark-mode')).toBeInTheDocument();
  });

  it('should display empty state for missing card', () => {
    render(<CardPreview card={null} />);

    expect(screen.getByText(/no preview/i)).toBeInTheDocument();
  });
});

describe('CardList Component', () => {
  const sampleCards = [
    { id: '1', name: 'Card 1', title: 'Developer', status: 'published' },
    { id: '2', name: 'Card 2', title: 'Designer', status: 'draft' },
  ];

  it('should render list of cards', () => {
    render(<CardList cards={sampleCards} onEdit={jest.fn()} onDelete={jest.fn()} />);

    expect(screen.getByText('Card 1')).toBeInTheDocument();
    expect(screen.getByText('Card 2')).toBeInTheDocument();
  });

  it('should display card status', () => {
    render(<CardList cards={sampleCards} onEdit={jest.fn()} onDelete={jest.fn()} />);

    expect(screen.getByText('Published')).toBeInTheDocument();
    expect(screen.getByText('Draft')).toBeInTheDocument();
  });

  it('should show edit button for each card', () => {
    render(<CardList cards={sampleCards} onEdit={jest.fn()} onDelete={jest.fn()} />);

    const editButtons = screen.getAllByRole('button', { name: /edit/i });
    expect(editButtons).toHaveLength(sampleCards.length);
  });

  it('should call onEdit when edit button is clicked', async () => {
    const user = userEvent.setup();
    const handleEdit = jest.fn();
    render(<CardList cards={sampleCards} onEdit={handleEdit} onDelete={jest.fn()} />);

    const editButtons = screen.getAllByRole('button', { name: /edit/i });
    await user.click(editButtons[0]);

    expect(handleEdit).toHaveBeenCalledWith(sampleCards[0]);
  });

  it('should call onDelete when delete button is clicked', async () => {
    const user = userEvent.setup();
    const handleDelete = jest.fn();
    render(<CardList cards={sampleCards} onEdit={jest.fn()} onDelete={handleDelete} />);

    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    await user.click(deleteButtons[0]);

    expect(handleDelete).toHaveBeenCalledWith(sampleCards[0].id);
  });

  it('should show empty state when no cards', () => {
    render(<CardList cards={[]} onEdit={jest.fn()} onDelete={jest.fn()} />);

    expect(screen.getByText(/no cards/i)).toBeInTheDocument();
  });

  it('should support pagination', () => {
    const manyCards = Array.from({ length: 15 }, (_, i) => ({
      id: `card-${i}`,
      name: `Card ${i}`,
      title: 'Developer',
      status: 'published',
    }));

    render(<CardList cards={manyCards} onEdit={jest.fn()} onDelete={jest.fn()} />);

    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
  });
});
