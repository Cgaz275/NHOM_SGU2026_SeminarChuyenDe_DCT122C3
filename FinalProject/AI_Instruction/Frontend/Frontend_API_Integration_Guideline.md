# Frontend API Integration Guideline

**Hướng dẫn chi tiết cho việc tích hợp API trong Frontend của dự án Persona-Based Digital Twin Card.**

---

## 📋 API Client Setup

### Firebase Authentication

```typescript
// lib/firebase.ts

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

### HTTP API Client

```typescript
// lib/apiClient.ts

import axios, { AxiosInstance, AxiosError } from "axios";

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
      timeout: 30000,
      headers: {
        "Content-Type": "application/json"
      }
    });

    // Add auth token to requests
    this.client.interceptors.request.use(async (config) => {
      const token = await getAuthToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Handle errors
    this.client.interceptors.response.use(
      response => response,
      error => {
        if (error.response?.status === 401) {
          // Handle unauthorized
          window.location.href = "/login";
        }
        throw error;
      }
    );
  }

  get = <T>(url: string) => this.client.get<T>(url);
  post = <T>(url: string, data: any) => this.client.post<T>(url, data);
  put = <T>(url: string, data: any) => this.client.put<T>(url, data);
  delete = <T>(url: string) => this.client.delete<T>(url);
}

export const apiClient = new ApiClient();

async function getAuthToken() {
  // Get Firebase token
  return null;
}
```

---

## 📤 Service Layer Pattern

```typescript
// services/authService.ts

import { apiClient } from "@/lib/apiClient";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  userId: string;
  token: string;
  email: string;
}

export const authService = {
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>("/api/auth/login", data);
    return response.data;
  },

  async register(data: any): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>("/api/auth/register", data);
    return response.data;
  },

  async logout(): Promise<void> {
    await apiClient.post("/api/auth/logout", {});
  }
};
```

---

### Using Services in Components

```typescript
// components/auth/LoginForm.tsx

"use client";

import { useState } from "react";
import { authService } from "@/services/authService";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await authService.login({ email, password });
      // Save token and redirect
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
}
```

---

## 🔄 Custom Hook for API Calls

```typescript
// hooks/useApi.ts

import { useState, useEffect } from "react";

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useApi<T>(
  apiCall: () => Promise<T>,
  deps: any[] = []
): UseApiState<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    let isMounted = true;

    const fetch = async () => {
      try {
        setState({ data: null, loading: true, error: null });
        const result = await apiCall();
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
  const { data: user, loading, error } = useApi(
    () => userService.getUser(userId),
    [userId]
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!user) return <EmptyState />;

  return <div>{user.name}</div>;
}
```

---

## 🛡️ Error Handling

```typescript
// utils/errorHandler.ts

export type ApiError = {
  code: string;
  message: string;
  details?: any;
};

export function parseApiError(error: any): ApiError {
  if (error.response?.data) {
    return {
      code: error.response.data.error || "UNKNOWN_ERROR",
      message: error.response.data.message || "An error occurred",
      details: error.response.data.details
    };
  }

  if (error.message) {
    return {
      code: "NETWORK_ERROR",
      message: error.message
    };
  }

  return {
    code: "UNKNOWN_ERROR",
    message: "An unexpected error occurred"
  };
}
```

---

## ✅ API Integration Checklist

- ✅ API client configured?
- ✅ Service layer created?
- ✅ Error handling implemented?
- ✅ Loading states?
- ✅ Auth token management?
- ✅ Type-safe responses?
- ✅ Rate limiting aware?

---

**Version:** 1.0
**Last Updated:** 2026
**Status:** Active ✅
