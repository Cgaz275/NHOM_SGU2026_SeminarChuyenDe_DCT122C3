# Frontend Styling & CSS Guideline

**Hướng dẫn chi tiết cho việc styling trong Frontend của dự án Persona-Based Digital Twin Card.**

---

## 🎨 Tailwind CSS Guidelines

### Color Palette

```
Primary: #3B82F6 (blue-500)
Secondary: #6B7280 (gray-600)
Success: #10B981 (green-500)
Warning: #F59E0B (amber-500)
Error: #EF4444 (red-500)
```

### Typography Scale

```
h1: text-3xl font-bold (32px)
h2: text-2xl font-bold (24px)
h3: text-xl font-semibold (20px)
h4: text-lg font-semibold (18px)
body: text-base font-regular (16px)
small: text-sm font-regular (14px)
```

### Spacing Scale

```
xs: 0.25rem (4px)
sm: 0.5rem (8px)
md: 1rem (16px)
lg: 1.5rem (24px)
xl: 2rem (32px)
2xl: 3rem (48px)
```

---

### Component Styling Pattern

```typescript
// ✅ GOOD: Reusable button variants
function Button({ variant = "primary", size = "md", children }: Props) {
  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-500 text-white hover:bg-red-600"
  };

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  };

  return (
    <button className={`rounded font-semibold ${variants[variant]} ${sizes[size]}`}>
      {children}
    </button>
  );
}
```

---

### Responsive Design

```typescript
// ✅ GOOD: Mobile-first responsive
function Layout() {
  return (
    <>
      {/* Mobile (default) */}
      <div className="grid grid-cols-1 gap-4 p-4">
        
        {/* sm: ≥ 640px */}
        <div className="sm:grid-cols-2">
        
        {/* md: ≥ 768px */}
        <div className="md:grid-cols-3">
        
        {/* lg: ≥ 1024px */}
        <div className="lg:gap-6">
        
        {/* xl: ≥ 1280px */}
        <div className="xl:p-6">
        
        {/* 2xl: ≥ 1536px */}
        <div className="2xl:grid-cols-4">
```

---

### Dark Mode Support

```typescript
// tailwind.config.ts
module.exports = {
  darkMode: 'class',
  // ...
}

// Usage
<div className="bg-white dark:bg-slate-900 text-black dark:text-white">
  Content
</div>
```

---

## 🎬 Animations

```typescript
// ✅ GOOD: Using Tailwind animations
<div className="animate-spin">Loading...</div>
<div className="animate-bounce">Highlight</div>
<div className="animate-pulse">Skeleton</div>

// Custom animations
<div className="transition-all duration-300 hover:scale-105">
  Hover me
</div>
```

---

## 📱 Responsive Images

```typescript
// ✅ GOOD: Using Next.js Image
import Image from "next/image";

<Image
  src="/photo.jpg"
  alt="Description"
  width={400}
  height={300}
  responsive
  priority={false}
  placeholder="blur"
/>
```

---

## ✅ Styling Checklist

- ✅ Use Tailwind CSS classes (no inline styles)?
- ✅ Mobile-first responsive design?
- ✅ Color palette consistent?
- ✅ Typography scale consistent?
- ✅ Accessibility contrast ratio ≥ 4.5:1?
- ✅ Dark mode support?
- ✅ Smooth transitions/animations?

---

**Version:** 1.0
**Last Updated:** 2026
**Status:** Active ✅
