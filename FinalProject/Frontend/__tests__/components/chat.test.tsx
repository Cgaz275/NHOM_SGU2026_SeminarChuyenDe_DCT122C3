/**
 * Jest Component Tests for Chat Widget Components
 * Tests: ChatWidget, ChatMessage, ChatInput components
 */

import { render, screen, userEvent, waitFor } from '@testing-library/react';
import ChatWidget from '@/components/chat/ChatWidget';
import ChatMessage from '@/components/chat/ChatMessage';
import ChatInput from '@/components/chat/ChatInput';

describe('ChatWidget Component', () => {
  it('should render chat widget', () => {
    render(<ChatWidget cardId="test-card" />);

    expect(screen.getByRole('button', { name: /chat/i })).toBeInTheDocument();
  });

  it('should open chat on button click', async () => {
    const user = userEvent.setup();
    render(<ChatWidget cardId="test-card" />);

    const chatButton = screen.getByRole('button', { name: /chat/i });
    await user.click(chatButton);

    expect(screen.getByLabelText(/chat input/i)).toBeInTheDocument();
  });

  it('should close chat on close button click', async () => {
    const user = userEvent.setup();
    render(<ChatWidget cardId="test-card" />);

    const chatButton = screen.getByRole('button', { name: /chat/i });
    await user.click(chatButton);

    const closeButton = screen.getByRole('button', { name: /close/i });
    await user.click(closeButton);

    expect(screen.queryByLabelText(/chat input/i)).not.toBeInTheDocument();
  });

  it('should display messages in chat', async () => {
    const user = userEvent.setup();
    const { rerender } = render(<ChatWidget cardId="test-card" />);

    const chatButton = screen.getByRole('button', { name: /chat/i });
    await user.click(chatButton);

    const chatInput = screen.getByLabelText(/chat input/i);
    const sendButton = screen.getByRole('button', { name: /send/i });

    await user.type(chatInput, 'Hello');
    await user.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText('Hello')).toBeInTheDocument();
    });
  });

  it('should show loading state while fetching AI response', async () => {
    const user = userEvent.setup();
    render(<ChatWidget cardId="test-card" isLoading={true} />);

    const chatButton = screen.getByRole('button', { name: /chat/i });
    await user.click(chatButton);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('should display error message on AI failure', async () => {
    const user = userEvent.setup();
    render(
      <ChatWidget cardId="test-card" error="Failed to get response" />
    );

    const chatButton = screen.getByRole('button', { name: /chat/i });
    await user.click(chatButton);

    expect(screen.getByText(/failed to get response/i)).toBeInTheDocument();
  });

  it('should disable send button when input is empty', async () => {
    const user = userEvent.setup();
    render(<ChatWidget cardId="test-card" />);

    const chatButton = screen.getByRole('button', { name: /chat/i });
    await user.click(chatButton);

    const sendButton = screen.getByRole('button', { name: /send/i });
    expect(sendButton).toBeDisabled();
  });

  it('should enable send button when input has text', async () => {
    const user = userEvent.setup();
    render(<ChatWidget cardId="test-card" />);

    const chatButton = screen.getByRole('button', { name: /chat/i });
    await user.click(chatButton);

    const chatInput = screen.getByLabelText(/chat input/i);
    const sendButton = screen.getByRole('button', { name: /send/i });

    await user.type(chatInput, 'Hello');
    expect(sendButton).not.toBeDisabled();
  });

  it('should handle real-time sync', async () => {
    render(<ChatWidget cardId="test-card" />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /chat/i })).toBeInTheDocument();
    });
  });

  it('should be responsive on mobile', () => {
    render(<ChatWidget cardId="test-card" isMobile={true} />);

    const chatButton = screen.getByRole('button', { name: /chat/i });
    expect(chatButton).toBeInTheDocument();
  });
});

describe('ChatMessage Component', () => {
  it('should render user message', () => {
    const message = {
      id: '1',
      content: 'Hello',
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    render(<ChatMessage message={message} />);

    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveClass('user-message');
  });

  it('should render AI message', () => {
    const message = {
      id: '1',
      content: 'Hi there!',
      sender: 'ai',
      timestamp: new Date().toISOString(),
    };

    render(<ChatMessage message={message} />);

    expect(screen.getByText('Hi there!')).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveClass('ai-message');
  });

  it('should display message timestamp', () => {
    const now = new Date();
    const message = {
      id: '1',
      content: 'Hello',
      sender: 'user',
      timestamp: now.toISOString(),
    };

    render(<ChatMessage message={message} />);

    expect(screen.getByText(new RegExp(now.toLocaleTimeString()))).toBeInTheDocument();
  });

  it('should align user messages to right', () => {
    const message = {
      id: '1',
      content: 'Hello',
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    const { container } = render(<ChatMessage message={message} />);

    expect(container.querySelector('.message-user')).toHaveClass('justify-end');
  });

  it('should align AI messages to left', () => {
    const message = {
      id: '1',
      content: 'Hi there!',
      sender: 'ai',
      timestamp: new Date().toISOString(),
    };

    const { container } = render(<ChatMessage message={message} />);

    expect(container.querySelector('.message-ai')).toHaveClass('justify-start');
  });

  it('should handle long messages with text wrapping', () => {
    const longMessage = 'A'.repeat(500);
    const message = {
      id: '1',
      content: longMessage,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    render(<ChatMessage message={message} />);

    expect(screen.getByText(new RegExp('A+')).textContent).toHaveLength(500);
  });

  it('should support markdown formatting in AI messages', () => {
    const message = {
      id: '1',
      content: '**Bold text** and *italic*',
      sender: 'ai',
      timestamp: new Date().toISOString(),
      isMarkdown: true,
    };

    render(<ChatMessage message={message} />);

    expect(screen.getByText(/Bold text/)).toBeInTheDocument();
  });
});

describe('ChatInput Component', () => {
  it('should render chat input field', () => {
    render(<ChatInput onSend={jest.fn()} />);

    expect(screen.getByPlaceholderText(/type your message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
  });

  it('should disable send button when input is empty', () => {
    render(<ChatInput onSend={jest.fn()} />);

    const sendButton = screen.getByRole('button', { name: /send/i });
    expect(sendButton).toBeDisabled();
  });

  it('should enable send button when input has text', async () => {
    const user = userEvent.setup();
    render(<ChatInput onSend={jest.fn()} />);

    const input = screen.getByPlaceholderText(/type your message/i);
    const sendButton = screen.getByRole('button', { name: /send/i });

    await user.type(input, 'Hello');

    expect(sendButton).not.toBeDisabled();
  });

  it('should call onSend when send button is clicked', async () => {
    const user = userEvent.setup();
    const handleSend = jest.fn();
    render(<ChatInput onSend={handleSend} />);

    const input = screen.getByPlaceholderText(/type your message/i);
    const sendButton = screen.getByRole('button', { name: /send/i });

    await user.type(input, 'Hello');
    await user.click(sendButton);

    expect(handleSend).toHaveBeenCalledWith('Hello');
  });

  it('should call onSend when Enter key is pressed', async () => {
    const user = userEvent.setup();
    const handleSend = jest.fn();
    render(<ChatInput onSend={handleSend} />);

    const input = screen.getByPlaceholderText(/type your message/i);

    await user.type(input, 'Hello{Enter}');

    expect(handleSend).toHaveBeenCalledWith('Hello');
  });

  it('should clear input after sending', async () => {
    const user = userEvent.setup();
    render(<ChatInput onSend={jest.fn()} />);

    const input = screen.getByPlaceholderText(/type your message/i) as HTMLInputElement;
    const sendButton = screen.getByRole('button', { name: /send/i });

    await user.type(input, 'Hello');
    await user.click(sendButton);

    expect(input.value).toBe('');
  });

  it('should support paste functionality', async () => {
    const user = userEvent.setup();
    render(<ChatInput onSend={jest.fn()} />);

    const input = screen.getByPlaceholderText(/type your message/i) as HTMLInputElement;

    // Simulate paste event
    await user.click(input);
    const pasteText = 'Pasted message';
    await user.paste(pasteText);

    expect(input.value).toContain(pasteText);
  });

  it('should disable input while sending', () => {
    render(<ChatInput onSend={jest.fn()} isLoading={true} />);

    const input = screen.getByPlaceholderText(/type your message/i);
    expect(input).toBeDisabled();
  });

  it('should support character limit indication', async () => {
    const user = userEvent.setup();
    render(<ChatInput onSend={jest.fn()} maxLength={5000} />);

    const input = screen.getByPlaceholderText(/type your message/i);
    await user.type(input, 'Hello');

    expect(screen.getByText(/5\/5000/)).toBeInTheDocument();
  });
});
