# Frontend Hooks & State Management Guideline

**Hướng dẫn chi tiết cho việc quản lý state trong Frontend của dự án Persona-Based Digital Twin Card.**

---

## 📋 Hooks & State Management

### Built-in React Hooks

**useState** - Manage local state

```typescript
const [count, setCount] = useState(0);
const [user, setUser] = useState<User | null>(null);
const [errors, setErrors] = useState<string[]>([]);
```

**useEffect** - Side effects

```typescript
useEffect(() => {
  fetchUser();
}, [userId]);  // Dependency array

// Cleanup
useEffect(() => {
  const unsubscribe = db.onSnapshot(/* ... */);
  return () => unsubscribe();
}, []);
```

**useContext** - Share state across components

```typescript
const user = useContext(AuthContext);
const theme = useContext(ThemeContext);
```

**useCallback** - Memoize callbacks

```typescript
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);
```

**useMemo** - Memoize values

```typescript
const sortedUsers = useMemo(() => {
  return users.sort((a, b) => a.name.localeCompare(b.name));
}, [users]);
```

**useReducer** - Complex state logic

```typescript
const [state, dispatch] = useReducer(reducer, initialState);

dispatch({ type: "ADD_ITEM", payload: item });
```

---

### Custom Hooks

```typescript
// hooks/useAuth.ts
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

// hooks/useLocalStorage.ts
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item = typeof window !== "undefined" ? localStorage.getItem(key) : null;
    return item ? JSON.parse(item) : initialValue;
  });

  const setValue = (value: T) => {
    setStoredValue(value);
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(value));
    }
  };

  return [storedValue, setValue] as const;
}

// Usage
const [user, setUser] = useLocalStorage<User | null>("user", null);
```

---

### React Context for Global State

```typescript
// context/AuthContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

interface User {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin";
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userData: User = {
          id: firebaseUser.uid,
          email: firebaseUser.email || "",
          name: firebaseUser.displayName || "",
          role: "user"
        };
        setUser(userData);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    // Implementation
  };

  const register = async (email: string, password: string, name: string) => {
    // Implementation
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
```

---

### State Management Patterns

**Lifting State Up** - Share state between siblings

```typescript
function Parent() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ChildA count={count} onIncrement={() => setCount(count + 1)} />
      <ChildB count={count} />
    </>
  );
}
```

**Form State Management**

```typescript
interface FormData {
  email: string;
  password: string;
  name: string;
}

function Form() {
  const [data, setData] = useState<FormData>({ email: "", password: "", name: "" });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!data.email) newErrors.email = "Email required";
    if (!data.password) newErrors.password = "Password required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Submit form
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
}
```

---

### Async State Management

```typescript
interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

function useAsync<T>(asyncFn: () => Promise<T>, deps: any[]) {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    let isMounted = true;

    const fetch = async () => {
      try {
        setState({ data: null, loading: true, error: null });
        const result = await asyncFn();
        if (isMounted) {
          setState({ data: result, loading: false, error: null });
        }
      } catch (error) {
        if (isMounted) {
          setState({ data: null, loading: false, error: error as Error });
        }
      }
    };

    fetch();

    return () => {
      isMounted = false;
    };
  }, deps);

  return state;
}

// Usage
function UserProfile({ userId }: { userId: string }) {
  const { data: user, loading, error } = useAsync(() => fetchUser(userId), [userId]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!user) return <EmptyState />;

  return <div>{user.name}</div>;
}
```

---

## ✅ Best Practices

- ✅ Keep state as close to where it's needed
- ✅ Use Context for global state (auth, theme)
- ✅ Use useState for local component state
- ✅ Memoize expensive calculations
- ✅ Cleanup side effects (unsubscribe, etc)
- ✅ Use TypeScript for type safety
- ✅ Avoid prop drilling (use Context instead)

---

**Version:** 1.0
**Last Updated:** 2026
**Status:** Active ✅
