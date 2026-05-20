# Frontend Pages & Routing Guideline - Next.js 15 App Router

**Hướng dẫn chi tiết cho việc xây dựng Pages và Routing trong Frontend của dự án Persona-Based Digital Twin Card.**

---

## 📋 Pages & Routing là gì?

Pages là những React components mapping đến URLs. Next.js 15 sử dụng App Router - mỗi folder/file.tsx là một route.

**Trách nhiệm:**
- ✅ Define page routes
- ✅ Fetch server-side data
- ✅ Manage page layout
- ✅ Handle authentication/authorization
- ✅ SEO optimization

---

## 🏗️ App Router Structure

```
app/                           ← Root folder
├── layout.tsx                 ← Root layout (all pages)
├── page.tsx                   ← Home page (/)
├── globals.css                ← Global styles
│
├── (auth)/                    ← Route group (doesn't affect URL)
│   ├── layout.tsx             ← Auth layout
│   ├── login/
│   │   └── page.tsx           ← /login
│   ├── register/
│   │   └── page.tsx           ← /register
│   └── forgot-password/
│       └── page.tsx           ← /forgot-password
│
├── dashboard/                 ← /dashboard/*
│   ├── layout.tsx             ← Dashboard layout with sidebar
│   ├── profile-builder/
│   │   └── page.tsx           ← /dashboard/profile-builder
│   ├── ai-twin/
│   │   └── page.tsx           ← /dashboard/ai-twin
│   ├── inbox/
│   │   └── page.tsx           ← /dashboard/inbox
│   └── qr-manager/
│       └── page.tsx           ← /dashboard/qr-manager
│
├── admin/                     ← /admin/*
│   ├── layout.tsx
│   ├── login/
│   │   └── page.tsx           ← /admin/login
│   ├── users/
│   │   └── page.tsx           ← /admin/users
│   └── reports/
│       └── page.tsx           ← /admin/reports
│
├── u/                         ← Public profiles (dynamic)
│   └── [username]/
│       └── page.tsx           ← /u/john-doe
│
├── about/
│   └── page.tsx               ← /about
├── digital-twin/
│   └── page.tsx               ← /digital-twin
└── teamproject/
    └── page.tsx               ← /teamproject
```

---

## 💾 Page Template

### Basic Page Component

```typescript
// app/example/page.tsx

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Example Page",
  description: "This is an example page"
};

export default function ExamplePage() {
  return (
    <main className="p-4">
      <h1 className="text-3xl font-bold">Example Page</h1>
    </main>
  );
}
```

### Page with Server-Side Data Fetching

```typescript
// app/profile/[id]/page.tsx

import { Metadata } from "next";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const user = await fetchUser(id);

  if (!user) {
    return { title: "User Not Found" };
  }

  return {
    title: user.name,
    description: user.bio
  };
}

async function fetchUser(id: string) {
  const res = await fetch(`/api/users/${id}`, { cache: "revalidate" });
  if (!res.ok) return null;
  return res.json();
}

export default async function UserPage({ params }: Props) {
  const { id } = await params;
  const user = await fetchUser(id);

  if (!user) {
    notFound();
  }

  return (
    <main className="p-4">
      <h1>{user.name}</h1>
      <p>{user.bio}</p>
    </main>
  );
}
```

### Protected Page (Client-Side)

```typescript
// app/dashboard/page.tsx

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <main className="p-4">
      <h1>Welcome, {user.name}!</h1>
    </main>
  );
}
```

---

## 📋 Page Types & Examples

### 1. **Root Layout**

```typescript
// app/layout.tsx

import type { Metadata } from "next";
import { Providers } from "@/components/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Persona Digital Twin",
  description: "Build your AI Digital Twin"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <nav className="border-b">
            {/* Navigation */}
          </nav>
          {children}
          <footer className="border-t">
            {/* Footer */}
          </footer>
        </Providers>
      </body>
    </html>
  );
}
```

### 2. **Route Group Layout**

```typescript
// app/(auth)/layout.tsx

export default function AuthLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <div className="flex-1 hidden md:flex items-center justify-center bg-blue-500 text-white">
        <div>
          <h1 className="text-4xl font-bold">Persona</h1>
          <p>Build your AI Digital Twin</p>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-4">
        {children}
      </div>
    </div>
  );
}
```

### 3. **Dashboard Layout**

```typescript
// app/dashboard/layout.tsx

"use client";

import { useAuth } from "@/context/AuthContext";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { redirect } from "next/navigation";

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();

  if (!loading && !user) {
    redirect("/login");
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen">
      <DashboardSidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
```

### 4. **Login Page**

```typescript
// app/(auth)/login/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { LoginForm } from "@/components/auth/LoginForm";
import { GoogleButton } from "@/components/auth/GoogleButton";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
        <p className="text-gray-600">Sign in to your account</p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-800 rounded">
          {error}
        </div>
      )}

      <LoginForm onSubmit={handleSubmit} loading={loading} />

      <div className="mt-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>
        <div className="mt-4">
          <GoogleButton />
        </div>
      </div>

      <p className="mt-4 text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <a href="/register" className="text-blue-600 hover:underline">
          Sign up
        </a>
      </p>
    </div>
  );
}
```

### 5. **Dynamic Route Page**

```typescript
// app/u/[username]/page.tsx

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProfileHeroCard } from "@/components/public-profile/ProfileHeroCard";
import { AITwinChatWidget } from "@/components/public-profile/AITwinChatWidget";

interface Props {
  params: Promise<{ username: string }>;
}

async function getCard(username: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cards/slug/${username}`);
  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  const card = await getCard(username);

  if (!card) {
    return { title: "Profile Not Found" };
  }

  return {
    title: card.title,
    description: card.bio,
    openGraph: {
      title: card.title,
      description: card.bio,
      images: [card.profileImage]
    }
  };
}

export default async function PublicProfilePage({ params }: Props) {
  const { username } = await params;
  const card = await getCard(username);

  if (!card) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <ProfileHeroCard card={card} />
      
      <div className="container mx-auto px-4 py-8">
        {/* About, Skills, Experience, Projects sections */}
      </div>

      <AITwinChatWidget cardId={card.id} />
    </main>
  );
}
```

### 6. **Admin Protected Page**

```typescript
// app/admin/users/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { UserManagementPage } from "@/components/admin/UserManagementPage";

export default function AdminUsersPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      if (user.role === "admin") {
        setIsAdmin(true);
      } else {
        router.push("/login");
      }
    }
  }, [user, loading, router]);

  if (loading || !isAdmin) {
    return <div className="p-4">Loading...</div>;
  }

  return <UserManagementPage />;
}
```

---

## 🔄 Next.js App Router Patterns

### Client vs Server Components

```typescript
// ✅ GOOD: Server component (fetch data on server)
// app/articles/page.tsx
async function getArticles() {
  const res = await fetch("https://api.example.com/articles");
  return res.json();
}

export default async function ArticlesPage() {
  const articles = await getArticles();
  return <div>{articles.map(/* ... */)}</div>;
}

// ✅ GOOD: Client component (interactive)
// components/ArticleList.tsx
"use client";

import { useState } from "react";

export function ArticleList({ initialArticles }) {
  const [articles, setArticles] = useState(initialArticles);
  return <div>{articles.map(/* ... */)}</div>;
}
```

### Data Fetching

```typescript
// ✅ GOOD: Server-side fetching
async function getUser(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`,
    { 
      cache: "revalidate",  // Revalidate every request (ISR)
      next: { revalidate: 60 }  // Or set specific revalidation time
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }

  return res.json();
}

export default async function UserPage({ params }) {
  const user = await getUser(params.id);
  return <div>{user.name}</div>;
}
```

### Redirects & NotFound

```typescript
// ✅ GOOD: Using Next.js routing utilities
import { notFound, redirect } from "next/navigation";

export default async function Page({ params }) {
  const user = await getUser(params.id);

  if (!user) {
    notFound();  // Shows 404 page
  }

  if (!user.isActive) {
    redirect("/");  // Redirect to home
  }

  return <div>{user.name}</div>;
}
```

---

## 📱 Responsive Pages

```typescript
// ✅ GOOD: Mobile-first responsive layout
export default function Page() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {/* On mobile: 1 column */}
      {/* On tablet (md): 2 columns */}
      {/* On desktop (lg): 3 columns */}
    </div>
  );
}
```

---

## ✅ Page Checklist

Trước khi hoàn thành page:

- ✅ URL route đúng?
- ✅ Metadata định nghĩa (title, description)?
- ✅ Authentication check (nếu protected)?
- ✅ Error handling (notFound, error.tsx)?
- ✅ Loading state?
- ✅ Mobile responsive?
- ✅ Accessible (WCAG 2.1)?
- ✅ SEO optimized?
- ✅ Performance optimized?

---

**Version:** 1.0
**Last Updated:** 2026
**Status:** Active ✅
