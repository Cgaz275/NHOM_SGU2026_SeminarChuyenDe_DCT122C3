/**
 * Jest Component Tests for Authentication Components
 * Tests: LoginForm, RegisterForm, PasswordReset components
 */

import { render, screen, userEvent, waitFor } from '@testing-library/react';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import PasswordResetForm from '@/components/auth/PasswordResetForm';

describe('LoginForm Component', () => {
  it('should render login form with email and password fields', () => {
    render(<LoginForm />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('should disable submit button when form is empty', () => {
    render(<LoginForm />);

    const submitButton = screen.getByRole('button', { name: /login/i });
    expect(submitButton).toBeDisabled();
  });

  it('should enable submit button when form is valid', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'SecurePass123!');

    expect(submitButton).not.toBeDisabled();
  });

  it('should show validation error for invalid email', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/email/i);
    await user.type(emailInput, 'invalid-email');
    await user.tab(); // Trigger blur

    expect(screen.getByText(/valid email/i)).toBeInTheDocument();
  });

  it('should toggle password visibility', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement;
    const toggleButton = screen.getByRole('button', { name: /show/i });

    expect(passwordInput.type).toBe('password');

    await user.click(toggleButton);
    expect(passwordInput.type).toBe('text');

    await user.click(toggleButton);
    expect(passwordInput.type).toBe('password');
  });

  it('should call onSubmit with form data when submitted', async () => {
    const user = userEvent.setup();
    const handleSubmit = jest.fn();
    render(<LoginForm onSubmit={handleSubmit} />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'SecurePass123!');
    await user.click(submitButton);

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'SecurePass123!',
      });
    });
  });

  it('should display forgot password link', () => {
    render(<LoginForm />);

    expect(screen.getByText(/forgot password/i)).toBeInTheDocument();
  });

  it('should display Google OAuth button', () => {
    render(<LoginForm />);

    expect(screen.getByRole('button', { name: /google/i })).toBeInTheDocument();
  });
});

describe('RegisterForm Component', () => {
  it('should render registration form with required fields', () => {
    render(<RegisterForm />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
  });

  it('should show password strength indicator', async () => {
    const user = userEvent.setup();
    render(<RegisterForm />);

    const passwordInput = screen.getByLabelText(/^password/i);
    await user.type(passwordInput, 'weak');

    expect(screen.getByText(/weak/i)).toBeInTheDocument();
  });

  it('should show error when passwords do not match', async () => {
    const user = userEvent.setup();
    render(<RegisterForm />);

    const passwordInput = screen.getByLabelText(/^password/i);
    const confirmInput = screen.getByLabelText(/confirm password/i);

    await user.type(passwordInput, 'SecurePass123!');
    await user.type(confirmInput, 'DifferentPass123!');
    await user.tab();

    expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
  });

  it('should validate email format', async () => {
    const user = userEvent.setup();
    render(<RegisterForm />);

    const emailInput = screen.getByLabelText(/email/i);
    await user.type(emailInput, 'invalid.email');
    await user.tab();

    expect(screen.getByText(/valid email/i)).toBeInTheDocument();
  });

  it('should require strong password', async () => {
    const user = userEvent.setup();
    render(<RegisterForm />);

    const passwordInput = screen.getByLabelText(/^password/i);
    await user.type(passwordInput, '123');
    await user.tab();

    expect(screen.getByText(/strong password/i)).toBeInTheDocument();
  });

  it('should disable submit until all fields are valid', async () => {
    const user = userEvent.setup();
    render(<RegisterForm />);

    const submitButton = screen.getByRole('button', { name: /register/i });
    expect(submitButton).toBeDisabled();

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/^password/i);
    const confirmInput = screen.getByLabelText(/confirm password/i);

    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(passwordInput, 'SecurePass123!');
    await user.type(confirmInput, 'SecurePass123!');

    expect(submitButton).not.toBeDisabled();
  });

  it('should display login link', () => {
    render(<RegisterForm />);

    expect(screen.getByText(/already have an account/i)).toBeInTheDocument();
  });
});

describe('PasswordResetForm Component', () => {
  it('should render password reset form', () => {
    render(<PasswordResetForm />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send reset/i })).toBeInTheDocument();
  });

  it('should disable button with invalid email', async () => {
    const user = userEvent.setup();
    render(<PasswordResetForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /send reset/i });

    await user.type(emailInput, 'invalid');
    expect(submitButton).toBeDisabled();
  });

  it('should enable button with valid email', async () => {
    const user = userEvent.setup();
    render(<PasswordResetForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /send reset/i });

    await user.type(emailInput, 'test@example.com');
    expect(submitButton).not.toBeDisabled();
  });

  it('should call onSubmit with email', async () => {
    const user = userEvent.setup();
    const handleSubmit = jest.fn();
    render(<PasswordResetForm onSubmit={handleSubmit} />);

    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /send reset/i });

    await user.type(emailInput, 'test@example.com');
    await user.click(submitButton);

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({ email: 'test@example.com' });
    });
  });

  it('should show success message after submission', async () => {
    const user = userEvent.setup();
    render(<PasswordResetForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /send reset/i });

    await user.type(emailInput, 'test@example.com');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/check your email/i)).toBeInTheDocument();
    });
  });

  it('should display back to login link', () => {
    render(<PasswordResetForm />);

    expect(screen.getByText(/back to login/i)).toBeInTheDocument();
  });
});
