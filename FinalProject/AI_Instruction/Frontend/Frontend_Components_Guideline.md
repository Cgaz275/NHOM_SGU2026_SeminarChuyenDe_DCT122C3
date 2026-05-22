# Frontend Components Guideline - Next.js 15 + React 18 + TypeScript

**Hướng dẫn chi tiết cho việc xây dựng React Components trong Frontend của dự án Persona-Based Digital Twin Card.**

---

## 📋 Components là gì?

React Components là những reusable UI building blocks. Chúng nhận props làm input, trả về JSX để render UI.

**Trách nhiệm của Components:**
- ✅ Render UI theo design
- ✅ Manage local state
- ✅ Handle user interactions
- ✅ Type-safe with TypeScript
- ✅ Accessible (WCAG 2.1)
- ✅ Responsive design
- ✅ Error handling

---

## 🏗️ Component Folder Structure

```
Frontend/components/
├── ui/                           ← Shared UI components
│   ├── Button.tsx               ← Reusable button
│   ├── Input.tsx                ← Form input
│   ├── Modal.tsx                ← Modal dialog
│   ├── Toast.tsx                ← Notifications
│   └── [other shared]/

├── [Feature]/                   ← Feature-specific components
│   ├── ComponentName.tsx        ← Main component
│   ├── SubComponent.tsx         ← Sub-components
│   └── [Subfolder]/

├── auth/
├── admin/
├── profile-builder/
├── ai-twin/
├── inbox/
├── public-profile/
├── qr-manager/
├── dashboard/
├── landing/
├── seminar/
└── projects/
```

---

## 💾 Component Template

### Basic Component Structure

```typescript
// components/example/ExampleComponent.tsx

import React from "react";

interface ExampleComponentProps {
  title: string;
  description?: string;
  onAction?: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
}

/**
 * ExampleComponent
 * 
 * A reusable component that displays content with action
 * 
 * @param title - Required: Title text
 * @param description - Optional: Description text
 * @param onAction - Optional: Callback when action button clicked
 * @param variant - Styling variant (default: 'primary')
 * @param disabled - Disable component (default: false)
 */
export default function ExampleComponent({
  title,
  description,
  onAction,
  variant = "primary",
  disabled = false
}: ExampleComponentProps) {
  
  // State
  const [isLoading, setIsLoading] = React.useState(false);

  // Handlers
  const handleClick = async () => {
    if (disabled) return;

    setIsLoading(true);
    try {
      await onAction?.();
    } catch (error) {
      console.error("Error in action:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Styles
  const variantStyles = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300"
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold">{title}</h2>
      
      {description && (
        <p className="text-gray-600 mt-2">{description}</p>
      )}

      <button
        onClick={handleClick}
        disabled={disabled || isLoading}
        className={`mt-4 px-4 py-2 rounded ${variantStyles[variant]} ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        aria-label={`${title} action button`}
      >
        {isLoading ? "Loading..." : "Action"}
      </button>
    </div>
  );
}
```

---

## 📋 Detailed Component Examples

### 1. **UI Components** - Button

```typescript
// components/ui/Button.tsx

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled,
  children,
  className = "",
  ...props
}: ButtonProps) {
  
  // Variant styles
  const variantStyles = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-500 text-white hover:bg-red-600",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100"
  };

  // Size styles
  const sizeStyles = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  };

  const finalDisabled = disabled || isLoading;

  return (
    <button
      disabled={finalDisabled}
      className={`
        rounded font-semibold transition-colors
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${finalDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${className}
      `}
      {...props}
    >
      {isLoading ? <span className="animate-spin">⟳</span> : children}
    </button>
  );
}
```

### 2. **Form Components** - Input with Validation

```typescript
// components/ui/Input.tsx

import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
}

export default function Input({
  label,
  error,
  helper,
  required,
  id,
  className = "",
  ...props
}: InputProps) {

  const inputId = id || label?.toLowerCase().replace(/\s/g, "-");

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label 
          htmlFor={inputId}
          className="text-sm font-medium text-gray-700"
        >
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <input
        id={inputId}
        required={required}
        className={`
          px-3 py-2 border rounded-lg
          focus:outline-none focus:ring-2 focus:ring-blue-500
          ${error ? "border-red-500" : "border-gray-300"}
          ${className}
        `}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props}
      />

      {error && (
        <p id={`${inputId}-error`} className="text-sm text-red-500">
          {error}
        </p>
      )}

      {helper && (
        <p className="text-sm text-gray-500">
          {helper}
        </p>
      )}
    </div>
  );
}
```

### 3. **Modal Component**

```typescript
// components/ui/Modal.tsx

import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  closeButton?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  closeButton = true,
  size = "md"
}: ModalProps) {

  // Handle ESC key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeStyles = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg"
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
      role="presentation"
    >
      <div
        className={`bg-white rounded-lg shadow-lg p-6 ${sizeStyles[size]}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          {title && <h2 className="text-xl font-bold">{title}</h2>}
          {closeButton && (
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close modal"
            >
              ✕
            </button>
          )}
        </div>

        {/* Content */}
        <div className="mb-6">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex gap-2 justify-end">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
```

### 4. **Feature Component** - Profile Card

```typescript
// components/profile-builder/ProfileCard.tsx

import React from "react";
import Image from "next/image";

interface ProfileCardProps {
  name: string;
  title?: string;
  bio?: string;
  image?: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function ProfileCard({
  name,
  title,
  bio,
  image,
  onEdit,
  onDelete
}: ProfileCardProps) {

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      
      {/* Image */}
      {image && (
        <div className="relative h-40 w-full bg-gray-100">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            priority={false}
          />
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900">{name}</h3>
        
        {title && (
          <p className="text-sm text-gray-600 mt-1">{title}</p>
        )}
        
        {bio && (
          <p className="text-sm text-gray-700 mt-3 line-clamp-3">{bio}</p>
        )}

        {/* Actions */}
        <div className="flex gap-2 mt-4">
          {onEdit && (
            <button
              onClick={onEdit}
              className="flex-1 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm font-medium"
              aria-label={`Edit ${name} profile`}
            >
              Edit
            </button>
          )}
          
          {onDelete && (
            <button
              onClick={onDelete}
              className="flex-1 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm font-medium"
              aria-label={`Delete ${name} profile`}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
```

### 5. **List Component**

```typescript
// components/common/List.tsx

import React from "react";

interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T, index: number) => string | number;
  loading?: boolean;
  empty?: React.ReactNode;
  className?: string;
}

export default function List<T>({
  items,
  renderItem,
  keyExtractor,
  loading = false,
  empty = <p className="text-gray-500">No items</p>,
  className = ""
}: ListProps<T>) {

  if (loading) {
    return (
      <div className={`space-y-4 ${className}`}>
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-16 bg-gray-200 rounded animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return <div className={className}>{empty}</div>;
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {items.map((item, index) => (
        <React.Fragment key={keyExtractor(item, index)}>
          {renderItem(item, index)}
        </React.Fragment>
      ))}
    </div>
  );
}
```

---

## ✅ Component Best Practices

### 1. **Type Safety with TypeScript**

```typescript
// ✅ GOOD: Full type safety
interface UserCardProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: "admin" | "user";
  };
  onSelect: (userId: string) => void;
}

function UserCard({ user, onSelect }: UserCardProps) {
  return <div onClick={() => onSelect(user.id)}>{user.name}</div>;
}

// ❌ BAD: Using 'any'
function UserCard({ user, onSelect }: { user: any; onSelect: any }) {
  return <div onClick={() => onSelect(user.id)}>{user.name}</div>;
}
```

### 2. **Props Destructuring**

```typescript
// ✅ GOOD: Clear props interface
function Button({
  variant = "primary",
  size = "md",
  disabled = false,
  children,
  ...props
}: ButtonProps) {
  return <button {...props}>{children}</button>;
}

// ❌ BAD: Unclear what props are accepted
function Button(props: any) {
  return <button {...props}>{props.children}</button>;
}
```

### 3. **Default Props**

```typescript
// ✅ GOOD: Use default values
interface CardProps {
  title: string;
  variant?: "dark" | "light";
  showImage?: boolean;
}

function Card({ title, variant = "light", showImage = true }: CardProps) {
  return <div>{title}</div>;
}

// ❌ BAD: Props.defaultProps (deprecated pattern)
function Card({ title, variant, showImage }) {
  return <div>{title}</div>;
}
Card.defaultProps = { variant: "light", showImage: true };
```

### 4. **Memoization for Performance**

```typescript
// ✅ GOOD: Memoize expensive components
const UserCard = React.memo(function UserCard({ user }: Props) {
  return <div>{user.name}</div>;
}, (prevProps, nextProps) => {
  return prevProps.user.id === nextProps.user.id;
});

// ✅ GOOD: useMemo for expensive calculations
function UserList({ users }: Props) {
  const sortedUsers = React.useMemo(() => {
    return users.sort((a, b) => a.name.localeCompare(b.name));
  }, [users]);

  return <div>{sortedUsers.map(/* ... */)</div>;
}
```

### 5. **Error Boundaries**

```typescript
// ✅ GOOD: Error boundary for safety
interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="p-4 bg-red-100 text-red-800 rounded">
            Something went wrong: {this.state.error?.message}
          </div>
        )
      );
    }

    return this.props.children;
  }
}
```

---

## 🎨 Component Styling Guidelines

### Using Tailwind CSS

```typescript
// ✅ GOOD: Use Tailwind utilities
function Card({ title, variant }: Props) {
  const variantStyles = {
    primary: "bg-blue-500 text-white",
    secondary: "bg-gray-200 text-gray-800"
  };

  return (
    <div className={`p-4 rounded-lg shadow ${variantStyles[variant]}`}>
      {title}
    </div>
  );
}

// ❌ BAD: Inline styles
function Card({ title, variant }: Props) {
  return (
    <div
      style={{
        padding: "1rem",
        borderRadius: "0.5rem",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        backgroundColor: variant === "primary" ? "blue" : "gray"
      }}
    >
      {title}
    </div>
  );
}
```

### Responsive Classes

```typescript
// ✅ GOOD: Mobile-first responsive
function Layout({ children }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {children}
    </div>
  );
}

// Breakpoints:
// sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px
```

---

## ♿ Accessibility in Components

```typescript
// ✅ GOOD: Accessible button
function Button({ ariaLabel, children, ...props }: Props) {
  return (
    <button
      aria-label={ariaLabel || undefined}
      className="px-4 py-2 bg-blue-500 text-white rounded"
      {...props}
    >
      {children}
    </button>
  );
}

// ✅ GOOD: Accessible form input
function FormInput({ label, error, ...props }: Props) {
  const id = props.id || `input-${Math.random()}`;
  
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && <p id={`${id}-error`}>{error}</p>}
    </div>
  );
}

// ✅ GOOD: Semantic HTML
<section aria-label="Main content">
  <article>
    <h1>Title</h1>
    <p>Content</p>
  </article>
</section>
```

---

## 🧪 Testing Components

```typescript
// components/__tests__/Button.test.tsx

import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../Button";

describe("Button Component", () => {
  it("should render button with text", () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it("should call onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);

    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalled();
  });

  it("should be disabled when disabled prop is true", () => {
    render(<Button disabled>Click</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("should show loading state", () => {
    render(<Button isLoading>Click</Button>);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
```

---

## ✅ Component Checklist

Trước khi hoàn thành component:

- ✅ Có TypeScript types cho tất cả props?
- ✅ Có default values cho optional props?
- ✅ Có accessibility attributes (aria-*, htmlFor)?
- ✅ Có responsive design (mobile-first)?
- ✅ Có error handling?
- ✅ Có loading states?
- ✅ Có unit tests?
- ✅ Tailwind CSS thay vì inline styles?
- ✅ JSDoc comments cho complex components?

---

**Version:** 1.0
**Last Updated:** 2026
**Status:** Active ✅
