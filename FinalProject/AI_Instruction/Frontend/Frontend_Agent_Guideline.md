# Frontend Agent Guideline - Next.js 15 + React 18 + TypeScript

**Tài liệu này là hướng dẫn chi tiết cho Frontend Developer Agent làm việc trên phần Frontend của dự án Persona-Based Digital Twin Card.**

---

## 📋 Mục đích và Phạm Vi

### Trách nhiệm Frontend Agent

- ✅ Implement UI components theo `AI_Instruction/Source of truth/GUI DESIGN.pdf`
- ✅ Xây dựng pages & layouts theo Next.js App Router
- ✅ Implement client-side logic & state management
- ✅ Tích hợp API calls với Backend services
- ✅ Tối ưu hóa performance (lazy loading, code splitting, image optimization)
- ✅ Implement accessibility (WCAG 2.1 AA standard)
- ✅ Responsive design (mobile-first approach)
- ✅ Error handling & loading states
- ✅ Form validation & user feedback
- ✅ Viết component tests
- ✅ Cập nhật documentation sau mỗi thay đổi

### Không phải trách nhiệm

- ❌ Backend API implementation
- ❌ Database design
- ❌ Server-side logic (Express routes)
- ❌ Infrastructure & deployment

---

## 🛠️ Technology Stack

| Công nghệ | Phiên bản | Mục đích | Tài liệu |
|-----------|----------|---------|---------|
| **Next.js** | 15.x | Framework | [Next.js Docs](https://nextjs.org/docs) |
| **React** | 18.x | UI library | [React Docs](https://react.dev) |
| **TypeScript** | 5.x | Type safety | [TypeScript Handbook](https://www.typescriptlang.org/docs/) |
| **Tailwind CSS** | 3.x | Styling | [Tailwind Docs](https://tailwindcss.com/docs) |
| **Firebase SDK** | Latest | Auth + Firestore | [Firebase Docs](https://firebase.google.com/docs) |
| **Cypress** | 13.x+ | E2E Testing | [Cypress Docs](https://docs.cypress.io/) |
| **Jest** | 29.x+ | Unit Testing | [Jest Docs](https://jestjs.io/) |

---

## 📁 Cây Cấu Trúc Frontend

```
Frontend/
├── app/                                  ← Next.js App Router (Next.js 15)
│   ├── layout.tsx                        ← Root layout
│   ├── page.tsx                          ← Home page (/)
│   ├── globals.css                       ← Global styles
│   │
│   ├── (auth)/                           ← Authentication pages (route group)
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── register/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   │
│   ├── dashboard/                        ← Protected dashboard pages
│   │   ├── layout.tsx
│   │   │
│   │   ├── profile-builder/
│   │   │   └── page.tsx                  ← User profile builder
│   │   ├── ai-twin/
│   │   │   └── page.tsx                  ← AI Twin configuration
│   │   ├── inbox/
│   │   │   └── page.tsx                  ← Conversations & chat
│   │   └── qr-manager/
│   │       └── page.tsx                  ← QR code management
│   │
│   ├── admin/                            ← Admin panel pages
│   │   ├── layout.tsx
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── users/
│   │   │   └── page.tsx
│   │   ├── reports/
│   │   │   └── page.tsx
│   │   └── analytics/
│   │       └── page.tsx
│   │
│   ├── u/[username]/                     ← Public profile page (dynamic)
│   │   └── page.tsx
│   │
│   ├── about/
│   │   └── page.tsx
│   ├── digital-twin/
│   │   └── page.tsx
│   ├── teamproject/
│   │   └── page.tsx
│   └── [other pages]/
│
├── components/                           ← Reusable components
│   ├── ui/                               ← Shared UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── Toast.tsx
│   │   ├── SectionHeading.tsx
│   │   ├── SkillTag.tsx
│   │   └── [other shared components]/
│   │
│   ├── auth/                             ← Authentication components
│   │   ├── AuthLayout.tsx
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   ├── GoogleButton.tsx
│   │   └── AuthHero.tsx
│   │
│   ├── admin/                            ← Admin panel components
│   │   ├── AdminLayout.tsx
│   │   ├── AdminSidebar.tsx
│   │   ├── AdminTable.tsx
│   │   ├── AdminSearchBar.tsx
│   │   ├── AdminPagination.tsx
│   │   ├── UserManagementPage.tsx
│   │   ├── ReportManagementPage.tsx
│   │   ├── [other admin components]/
│   │   └── ...
│   │
│   ├── profile-builder/                  ← Profile builder components
│   │   ├── ProfileBuilderForm.tsx
│   │   ├── BasicInfoSection.tsx
│   │   ├── MediaUploadSection.tsx
│   │   ├── SocialLinksSection.tsx
│   │   ├── ThemeSelectorSection.tsx
│   │   ├── PrivacySection.tsx
│   │   ├── PublishSection.tsx
│   │   ├── LiveProfilePreview.tsx
│   │   ├── MobilePreviewDrawer.tsx
│   │   └── ProfileBuilderStateBar.tsx
│   │
│   ├── ai-twin/                          ← AI Twin config components
│   │   ├── AITwinConfigPage.tsx
│   │   ├── AITwinTabs.tsx
│   │   ├── PersonaSection.tsx
│   │   ├── KnowledgeBaseSection.tsx
│   │   ├── PromptRulesSection.tsx
│   │   ├── AddExperienceModal.tsx
│   │   ├── ExperienceList.tsx
│   │   ├── [other AI Twin components]/
│   │   └── ...
│   │
│   ├── inbox/                            ← Conversation & chat components
│   │   ├── PersonaInboxPage.tsx
│   │   ├── ConversationList.tsx
│   │   ├── ConversationCard.tsx
│   │   ├── ConversationFilters.tsx
│   │   ├── LeadPanel.tsx
│   │   ├── ChatMessageBubble.tsx
│   │   ├── HumanTakeoverBanner.tsx
│   │   ├── TranscriptViewer.tsx
│   │   └── [other inbox components]/
│   │
│   ├── public-profile/                   ← Public profile components
│   │   ├── ProfileHeroCard.tsx
│   │   ├── AboutSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── FeaturedProjects.tsx
│   │   ├── SocialLinks.tsx
│   │   ├── AITwinChatWidget.tsx
│   │   ├── SaveContactCard.tsx
│   │   ├── GuestIntroModal.tsx
│   │   ├── ReportAIModal.tsx
│   │   └── [other public profile components]/
│   │
│   ├── qr-manager/                       ← QR code components
│   │   ├── QRCodeManagerPage.tsx
│   │   ├── QRCodePreviewCard.tsx
│   │   ├── QRStatusBadge.tsx
│   │   └── [other QR components]/
│   │
│   ├── dashboard/                        ← Dashboard layout
│   │   ├── DashboardSidebar.tsx
│   │   └── DashboardLayout.tsx
│   │
│   ├── landing/                          ← Landing page components
│   │   ├── LandingPage.tsx
│   │   ├── HeroMockup.tsx
│   │   └── FeatureGrid.tsx
│   │
│   ├── seminar/                          ← Seminar/marketing components
│   │   ├── SeminarLanding.tsx
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── TeamSection.tsx
│   │   ├── Masterpiece.tsx
│   │   ├── DigitalTwinChat.tsx
│   │   ├── ContactCTA.tsx
│   │   ├── Footer.tsx
│   │   └── TechStack.tsx
│   │
│   ├── about/                            ← About page components
│   │   ├── AboutHero.tsx
│   │   ├── TeamIntro.tsx
│   │   ├── MembersSection.tsx
│   │   ├── MemberCard.tsx
│   │   └── BinaryMatrix.tsx
│   │
│   └── projects/                         ← Projects components
│       ├── ProjectList.tsx
│       ├── ProjectCard.tsx
│       └── ProjectsSection.tsx
│
├── services/                             ← API client services
│   ├── authService.ts                    ← Auth API calls
│   ├── cardService.ts                    ← Card API calls
│   ├── aiTwinService.ts                  ← AI Twin API calls
│   ├── conversationService.ts            ← Conversation API calls
│   ├── [other services]/
│   └── ...
│
├── lib/                                  ← Utilities & helpers
│   ├── firebase.ts                       ← Firebase client config
│   ├── apiClient.ts                      ← HTTP client setup
│   ├── mock-*.ts                         ← Mock API responses (development)
│   └── [other utilities]/
│
├── context/                              ← React Context providers
│   ├── AuthContext.tsx                   ← Authentication context
│   └── [other contexts]/
│
├── types/                                ← TypeScript type definitions
│   ├── auth.ts
│   ├── ai-twin.ts
│   ├── profile-builder.ts
│   ├── public-profile.ts
│   ├── inbox.ts
│   ├── qr-manager.ts
│   ├── admin.ts
│   └── [other types]/
│
├── public/                               ← Static assets
│   ├── team_members/
│   ├── login/
│   ├── aboutusTheme/
│   ├── [images, icons, etc]/
│   └── favicon.ico
│
├── next.config.ts                        ← Next.js configuration
├── tailwind.config.ts                    ← Tailwind CSS config
├── tsconfig.json                         ← TypeScript config
├── eslint.config.mjs                     ← ESLint config
├── postcss.config.mjs                    ← PostCSS config
├── package.json
├── package-lock.json
├── CLAUDE.md                             ← Development guidelines (Claude)
├── AGENTS.md                             ← Next.js agent-specific rules
└── README.md

```

---

## 🔑 Core Feature Areas

### 1. **Authentication** (`components/auth/`, `services/authService.ts`)
**Pages:** `/login`, `/register`

**Components:**
- `LoginForm` — Email/password login
- `RegisterForm` — User registration
- `GoogleButton` — Google OAuth
- `AuthLayout` — Auth page layout
- `AuthHero` — Auth page hero section

**Responsibilities:**
- User registration & login UI
- Form validation
- Error handling
- Session management (using Firebase Auth)

**Reference:** `AI_Instruction/Source of truth/GUI DESIGN.pdf` - Auth screens

---

### 2. **Profile Builder** (`components/profile-builder/`, `/dashboard/profile-builder`)
**Page:** `/dashboard/profile-builder`

**Components:**
- `ProfileBuilderForm` — Main form container
- `BasicInfoSection` — Name, title, bio
- `MediaUploadSection` — Profile image, background
- `SocialLinksSection` — LinkedIn, Twitter, etc
- `ThemeSelectorSection` — Theme customization
- `PrivacySection` — Privacy settings
- `PublishSection` — Publish & slug management
- `LiveProfilePreview` — Real-time preview
- `MobilePreviewDrawer` — Mobile view preview

**Responsibilities:**
- User profile customization UI
- Form state management
- Real-time preview
- Image upload & optimization
- Publish workflow

**Reference:** `AI_Instruction/Source of truth/GUI DESIGN.pdf` - Profile Builder screens

---

### 3. **AI Twin Configuration** (`components/ai-twin/`, `/dashboard/ai-twin`)
**Page:** `/dashboard/ai-twin`

**Components:**
- `AITwinConfigPage` — Main page container
- `AITwinTabs` — Tab navigation
- `PersonaSection` — AI personality settings
- `KnowledgeBaseSection` — Knowledge base management
- `PromptRulesSection` — Prompt customization
- `GuardrailChecklist` — Safety guardrails
- `PublishAISection` — Publish AI Twin
- `TestChatSection` — Test AI responses
- `AddExperienceModal` — Add work experience
- `ExperienceList` — Experience items
- `ToneSelector` — Tone/style selection

**Responsibilities:**
- AI Twin configuration UI
- Persona customization
- Knowledge base CRUD
- Test chat interface
- Publish workflow

**Reference:** `AI_Instruction/Source of truth/DigitalTwin_Document.md` - AI Twin feature

---

### 4. **Inbox & Chat** (`components/inbox/`, `/dashboard/inbox`)
**Page:** `/dashboard/inbox`

**Components:**
- `PersonaInboxPage` — Main inbox container
- `ConversationList` — List of conversations
- `ConversationCard` — Single conversation item
- `ConversationFilters` — Filter & search
- `LeadPanel` — Lead details panel
- `ChatMessageBubble` — Chat message component
- `HumanTakeoverBanner` — Human takeover status
- `TranscriptViewer` — Chat transcript
- `ConversationActions` — Action buttons

**Responsibilities:**
- Conversation listing & filtering
- Chat UI & message display
- Human takeover workflow
- Lead management
- Transcript export

**Reference:** `AI_Instruction/Source of truth/GUI DESIGN.pdf` - Inbox screens

---

### 5. **Public Profile** (`components/public-profile/`, `/u/[username]`)
**Page:** `/u/[username]` (dynamic route)

**Components:**
- `ProfileHeroCard` — Profile header with avatar
- `AboutSection` — About/bio section
- `SkillsSection` — Skills display
- `ExperienceSection` — Work experience
- `FeaturedProjects` — Project showcase
- `SocialLinks` — Social media links
- `AITwinChatWidget` — AI Twin chat widget
- `SaveContactCard` — Contact save action
- `GuestIntroModal` — First-time visitor modal
- `ReportAIModal` — Report AI Twin

**Responsibilities:**
- Public profile display
- AI Twin chat widget
- Contact capture
- Report functionality

**Reference:** `AI_Instruction/Source of truth/PRD.pdf` - Public profile section

---

### 6. **QR Code Manager** (`components/qr-manager/`, `/dashboard/qr-manager`)
**Page:** `/dashboard/qr-manager`

**Components:**
- `QRCodeManagerPage` — Main page
- `QRCodePreviewCard` — QR code display
- `QRStatusBadge` — Active/inactive status
- `QRTrackingHint` — Tracking info
- `QRActionButtons` — Download, share actions
- `SlugWarning` — Slug change warning

**Responsibilities:**
- QR code display & management
- Download QR code
- Share QR code
- Track QR analytics

**Reference:** `AI_Instruction/Source of truth/PRD.pdf` - QR code section

---

### 7. **Admin Panel** (`components/admin/`, `/admin/*`)
**Pages:** `/admin/login`, `/admin/users`, `/admin/reports`

**Components:**
- `AdminLayout` — Admin layout wrapper
- `AdminSidebar` — Navigation sidebar
- `UserManagementPage` — User list & management
- `ReportManagementPage` — Report list & management
- `AdminTable` — Reusable table component
- `AdminSearchBar` — Search functionality
- `AdminPagination` — Pagination control
- `UserDetailModal` — User details modal
- `ReportDetailModal` — Report details modal
- `UserStatusBadge` — User status indicator
- `ReportStatusBadge` — Report status indicator

**Responsibilities:**
- User management UI
- Report management UI
- Admin authentication
- Admin analytics dashboard

**Reference:** `AI_Instruction/Source of truth/PRD.pdf` - Admin section

---

## 📝 Naming Conventions (Frontend)

### File & Folder Naming

```
components/
├── [Feature]/                          ← PascalCase folder
│   ├── ComponentName.tsx               ← PascalCase component
│   ├── SubComponent.tsx
│   └── [Subfolder]/

app/
├── [feature]/                          ← lowercase folder
│   ├── page.tsx                        ← page.tsx (Next.js requirement)
│   ├── layout.tsx                      ← layout.tsx
│   └── [other files]/

services/
├── featureService.ts                   ← camelCase + Service suffix

lib/
├── utility.ts                          ← camelCase utilities

types/
├── Feature.ts                          ← PascalCase (types file)

context/
├── FeatureContext.tsx                  ← PascalCase + Context suffix
```

### Component Naming

```typescript
// Page components (PascalCase)
export default function HomePage() {}
export default function DashboardPage() {}

// Feature components (PascalCase)
function UserCard({ user }: Props) {}
function ProfileHeader({ name }: Props) {}
function AITwinConfigPanel() {}

// UI components (PascalCase)
function Button({ children, onClick }: Props) {}
function Modal({ isOpen, onClose }: Props) {}

// Custom hooks (camelCase with 'use' prefix)
function useAuth() {}
function useUserProfile() {}
function useConversation() {}

// HOCs (HOC pattern)
function withAuth<P extends object>(Component: React.ComponentType<P>) {}
```

### Variable & Function Naming

```typescript
// State variables
const [isLoading, setIsLoading] = useState(false);
const [userData, setUserData] = useState(null);
const [errors, setErrors] = useState<string[]>([]);

// Event handlers (handle + Event name)
const handleClick = () => {};
const handleSubmit = async (e: React.FormEvent) => {};
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

// Computed values (is/has prefix for booleans)
const isAuthenticated = user !== null;
const hasPermission = user?.role === "admin";

// API/Service calls (fetch/get/post/put/delete prefix)
async function fetchUserProfile() {}
async function postNewCard() {}
```

### Type & Interface Naming

```typescript
// Component props (ComponentName + Props)
interface ButtonProps {
  onClick: () => void;
  variant: "primary" | "secondary";
}

interface UserCardProps {
  user: User;
  onSelect?: (userId: string) => void;
}

// Data models (PascalCase, no suffix)
interface User {
  id: string;
  email: string;
  name: string;
}

interface Card {
  id: string;
  title: string;
  slug: string;
}

// Enums (PascalCase)
enum UserRole {
  User = "user",
  Admin = "admin"
}

enum ConversationStatus {
  Active = "active",
  Escalated = "escalated",
  Closed = "closed"
}
```

---

## ✅ Code Quality Standards (Frontend)

### 1. **TypeScript Strict Mode**
```typescript
// ✅ GOOD: Full type safety
interface UserProfile {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
}

function UserCard({ user }: { user: UserProfile }) {
  return <div>{user.name}</div>;
}

// ❌ BAD: Using 'any'
function UserCard({ user }: { user: any }) {
  return <div>{user.name}</div>;
}
```

### 2. **Component Props & Destructuring**
```typescript
// ✅ GOOD: Clear props interface
interface ButtonProps {
  onClick: () => void;
  variant: "primary" | "secondary";
  disabled?: boolean;
  children: React.ReactNode;
}

function Button({ onClick, variant, disabled = false, children }: ButtonProps) {
  return <button onClick={onClick}>{children}</button>;
}

// ❌ BAD: Unclear props
function Button(props: any) {
  return <button onClick={props.onClick}>{props.children}</button>;
}
```

### 3. **Error Handling & Loading States**
```typescript
// ✅ GOOD: Proper error & loading states
function UserProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      try {
        const data = await fetchUserData();
        setUser(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!user) return <EmptyState />;

  return <div>{user.name}</div>;
}

// ❌ BAD: No error/loading handling
function UserProfile() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetchUserData().then(setUser);
  }, []);

  return <div>{user.name}</div>;
}
```

### 4. **Form Validation**
```typescript
// ✅ GOOD: Client-side validation
interface LoginFormData {
  email: string;
  password: string;
}

function LoginForm() {
  const [data, setData] = useState<LoginFormData>({ email: "", password: "" });
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});

  function validateForm() {
    const newErrors: Partial<LoginFormData> = {};

    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = "Invalid email";
    }

    if (!data.password || data.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await loginUser(data);
    } catch (error) {
      setErrors({ email: "Login failed" });
    }
  }

  return <form onSubmit={handleSubmit}>{/* form fields */}</form>;
}
```

### 5. **Component Structure & Reusability**
```typescript
// ✅ GOOD: Reusable, well-structured
function Card({ title, description, image, onAction }: CardProps) {
  return (
    <div className="card">
      <img src={image} alt={title} />
      <h2>{title}</h2>
      <p>{description}</p>
      <button onClick={onAction}>Action</button>
    </div>
  );
}

// ❌ BAD: Hard-coded, not reusable
function UserCard() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetchUser().then(setUser);
  }, []);

  return (
    <div className="card">
      <img src={user?.image} />
      <h2>{user?.name}</h2>
      <p>{user?.bio}</p>
      <button onClick={() => saveUser()}>Save</button>
    </div>
  );
}
```

---

## 🎨 Design System & Styling

### Tailwind CSS Guidelines

**Reference:** `AI_Instruction/Source of truth/GUI DESIGN.pdf`

```typescript
// ✅ GOOD: Use Tailwind utilities
function Button({ variant = "primary", children }: ButtonProps) {
  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  };

  return (
    <button className={`px-4 py-2 rounded ${variants[variant]}`}>
      {children}
    </button>
  );
}

// ❌ BAD: Inline styles (unless necessary)
function Button({ children }: ButtonProps) {
  return (
    <button style={{ backgroundColor: "blue", color: "white", padding: "8px 16px" }}>
      {children}
    </button>
  );
}
```

### Color Palette
- Primary: Blue (#3B82F6)
- Secondary: Gray (#6B7280)
- Success: Green (#10B981)
- Warning: Yellow (#F59E0B)
- Error: Red (#EF4444)

### Typography
- Heading 1: 32px, Bold (font-weight: 700)
- Heading 2: 24px, Bold
- Heading 3: 20px, Semibold (font-weight: 600)
- Body: 16px, Regular (font-weight: 400)
- Small: 14px, Regular

---

## 📱 Responsive Design

### Breakpoints (Tailwind)
- Mobile: < 640px (sm)
- Tablet: >= 640px (md)
- Desktop: >= 1024px (lg)
- Large: >= 1280px (xl)

```typescript
// ✅ GOOD: Mobile-first responsive
function Hero() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns */}
    </div>
  );
}

// Media queries for complex responsive logic
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
};
```

---

## ♿ Accessibility (WCAG 2.1 AA)

### Key Practices

```typescript
// ✅ GOOD: Accessible form
function LoginForm() {
  return (
    <form>
      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        type="email"
        placeholder="Enter your email"
        required
        aria-label="Email address"
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        placeholder="Enter your password"
        required
        aria-label="Password"
      />

      <button type="submit" aria-label="Submit login form">
        Log In
      </button>
    </form>
  );
}

// ✅ GOOD: Semantic HTML
<article>
  <h1>Article Title</h1>
  <p>Content...</p>
</article>

// ✅ GOOD: ARIA labels for icons
<button aria-label="Close dialog" onClick={onClose}>
  ✕
</button>

// ❌ BAD: Non-semantic, inaccessible
<div onClick={handleClick}>Click me</div>
```

---

## 🧪 Testing Strategy (Frontend)

### Unit & Component Tests (Jest)
```typescript
// ✅ Example: Component test
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

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
});
```

### E2E Tests (Cypress)
```javascript
// ✅ Example: E2E test
describe("User Login Flow", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("should login successfully with valid credentials", () => {
    cy.get("input[type=email]").type("test@mail.com");
    cy.get("input[type=password]").type("password123");
    cy.get("button[type=submit]").click();

    cy.url().should("include", "/dashboard");
    cy.get(".welcome-message").should("contain", "Welcome");
  });

  it("should show error with invalid email", () => {
    cy.get("input[type=email]").type("invalid-email");
    cy.get("input[type=password]").type("password123");
    cy.get("button[type=submit]").click();

    cy.get(".error-message").should("be.visible");
  });
});
```

### Test Modules (7 Modules per TEST PLAN.pdf)
```
Testing/Frontend/cypress/e2e/
├── Module_1_Auth.cy.js                 ← Login/Register
├── Module_2_Card_Profile.cy.js         ← Profile builder + QR
├── Module_3_AI_Config.cy.js            ← AI Twin configuration
├── Module_4_Chatbot_AI.cy.js           ← Chat with AI Twin
├── Module_5_Fallback_Inbox.cy.js       ← Inbox & conversations
├── Module_6_Human_Takeover.cy.js       ← Human takeover workflow
└── Module_7_Admin_Panel.cy.js          ← Admin operations
```

---

## 🔧 Performance Optimization

### 1. **Image Optimization**
```typescript
// ✅ GOOD: Use Next.js Image component
import Image from "next/image";

function ProfileImage({ src, alt }: Props) {
  return (
    <Image
      src={src}
      alt={alt}
      width={300}
      height={300}
      priority={false}  // lazy load
      placeholder="blur"
    />
  );
}

// ❌ BAD: Regular <img> tag (no optimization)
<img src={image} alt="profile" />
```

### 2. **Code Splitting & Lazy Loading**
```typescript
// ✅ GOOD: Dynamic imports for large components
import dynamic from "next/dynamic";

const AITwinConfig = dynamic(() => import("./AITwinConfig"), {
  loading: () => <LoadingSpinner />,
  ssr: false  // Don't SSR if not needed
});

function Dashboard() {
  return <AITwinConfig />;
}

// ✅ GOOD: Lazy load heavy modals
const ReportModal = lazy(() => import("./ReportModal"));
```

### 3. **Memoization**
```typescript
// ✅ GOOD: Memoize expensive components
const UserCard = React.memo(function UserCard({ user }: Props) {
  return <div>{user.name}</div>;
});

// ✅ GOOD: useMemo for expensive calculations
function ConversationList({ conversations }: Props) {
  const sortedConversations = useMemo(() => {
    return conversations.sort((a, b) => b.timestamp - a.timestamp);
  }, [conversations]);

  return <div>{sortedConversations.map(/* ... */)}</div>;
}
```

---

## 📋 Development Workflow

1. **Design Review**
   - Check `AI_Instruction/Source of truth/GUI DESIGN.pdf`
   - Understand component specs, colors, typography

2. **Component Planning**
   - Define component structure & props
   - Plan state management
   - Plan API integration points

3. **Component Development**
   - Implement with TypeScript
   - Add accessibility features
   - Style with Tailwind
   - Write unit tests

4. **Integration**
   - Connect to Backend APIs
   - Add error handling
   - Add loading states

5. **Testing**
   - Run unit tests (Jest)
   - Run E2E tests (Cypress)
   - Manual testing on mobile/desktop

6. **Documentation & Commit**
   - Document in comments (if needed)
   - Commit with clear message

---

## 🚀 Pre-Launch Checklist

Before deployment:

- ✅ All pages load correctly
- ✅ Mobile responsive (tested on actual devices)
- ✅ Accessibility (WCAG 2.1 AA)
- ✅ All forms validated
- ✅ Error states handled
- ✅ Loading states visible
- ✅ Images optimized
- ✅ TypeScript strict mode passed
- ✅ ESLint warnings fixed
- ✅ Unit tests passed
- ✅ E2E tests passed
- ✅ Lighthouse score > 90
- ✅ No console errors/warnings

---

## 📞 Common Issues & Solutions

### Issue: Next.js App Router Changes
**Reference:** `Frontend/AGENTS.md` - Next.js agent rules

### Issue: Hydration Mismatch
```typescript
// ❌ BAD: Browser-only code in server component
function ClientComponent() {
  const isMobile = window.innerWidth < 640;  // ERROR in SSR!
}

// ✅ GOOD: Use 'use client' directive
"use client";

function ClientComponent() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
  }, []);

  return <div>{isMobile ? "Mobile" : "Desktop"}</div>;
}
```

### Issue: Firestore Real-time Listener Memory Leak
```typescript
// ✅ GOOD: Clean up listener
function useConversations() {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection("conversations")
      .onSnapshot(snapshot => {
        setConversations(snapshot.docs.map(d => d.data()));
      });

    return () => unsubscribe();  // Clean up!
  }, []);

  return conversations;
}
```

---

## 🔗 Key References

| Document | Location | When to Read |
|----------|----------|---|
| **GUI Design** | `AI_Instruction/Source of truth/GUI DESIGN.pdf` | Component design |
| **PRD** | `AI_Instruction/Source of truth/PRD.pdf` | Feature requirements |
| **System Design** | `AI_Instruction/Source of truth/Architecht & Database.pdf` | API contracts |
| **Test Plan** | `AI_Instruction/Source of truth/TEST PLAN.pdf` | Test strategy |
| **Next.js Rules** | `Frontend/AGENTS.md` | Next.js specifics |
| **System Guideline** | `AI_Instruction/System_Agent_Guideline.md` | General rules |
| **Tech Docs** | `AI_Instruction/Source of truth/Tech Documents/` | Tech stack |

---

## ⏱️ Frontend Testing Timeline (6 Phases)

Reference: `Testing_Agent_Guideline.md` v2.0 - Complete 6-phase timeline

### Phase 1: Setup & Module 1 (Week 1-2)

**Activities**:
- Set up test environment (Node, npm, dependencies)
- Install Jest, Cypress, React Testing Library
- Configure `cypress.config.ts` and `jest.config.js`
- Create test data fixtures (users, cards)
- Write Module 1 (Auth) tests:
  - LoginForm component test (Jest)
  - RegisterForm component test (Jest)
  - Auth E2E flow (Cypress)

**Deliverables**:
- ✅ Test environment ready
- ✅ Module 1 tests passing

---

### Phase 2: Functional Testing - Modules 1-4 (Week 3-4)

**Activities**:
- Execute Module 1 (Auth) - Jest + Cypress
- Execute Module 2 (Card Profile) - Cypress E2E
  - ProfileBuilderForm test
  - Theme selector test
  - Preview functionality test
- Execute Module 3 (AI Twin Config) - Jest + Manual
  - PersonaSection component test
  - KnowledgeBaseSection test
  - Manual testing of config flow
- Execute Module 4 (Chat) - Cypress
  - AITwinChatWidget interaction
  - Message display
  - Real-time updates

**Success Criteria**:
- ✅ Module 1-4 pass rate ≥ 90%
- ✅ All critical paths tested

---

### Phase 3: Integration & Modules 5-7 (Week 4-5)

**Activities**:
- Execute Module 5 (Inbox) - Cypress real-time
  - ConversationList test
  - Real-time message sync
  - Filtering & search
- Execute Module 6 (Human Takeover) - Cypress
  - HumanTakeoverBanner test
  - Escalation flow
- Execute Module 7 (Admin) - Cypress
  - Admin table interactions
  - User management flow
- Real-time chat widget testing
- Integration tests (Frontend ↔ Backend)

**Success Criteria**:
- ✅ Module 5-7 pass rate ≥ 90%
- ✅ Real-time sync working

---

### Phase 4: Performance & Accessibility (Week 5-6)

**Activities**:
- Lighthouse analysis on all main pages
- WCAG 2.1 AA accessibility audit
- Mobile device testing (iOS + Android)
- Browser compatibility (Chrome, Firefox, Safari)
- Performance profiling (DevTools)

**Targets**:
- ✅ Lighthouse ≥ 90 (all categories)
- ✅ WCAG 2.1 AA compliant
- ✅ Mobile responsive verified

---

### Phase 5: Regression & Final Testing (Week 6-7)

**Activities**:
- Run regression test suite (smoke tests)
- Re-test all bug fixes
- Final manual testing on all flows
- Accessibility re-check
- Performance verification

**Smoke Tests** (7 tests, one per module):
```javascript
// Module 1: Auth flow
cy.visit("/login");
cy.get("input[type=email]").type("test@mail.com");
cy.get("input[type=password]").type("password123");
cy.get("button[type=submit]").click();
cy.url().should("include", "/dashboard");

// Module 2: Profile builder
cy.visit("/dashboard/profile-builder");
cy.get("input[name=title]").type("Senior Engineer");
cy.get("button:contains('Save')").click();
cy.get(".success-message").should("be.visible");

// Module 3: AI Twin config
cy.visit("/dashboard/ai-twin");
cy.get("textarea[name=persona]").type("Test persona");
cy.get("button:contains('Save')").click();

// Module 4: Chat widget
cy.visit("/u/test-user");
cy.get("button:contains('Chat')").click();
cy.get("input[placeholder*='Message']").type("Hello");
cy.get("button:contains('Send')").click();
cy.get(".ai-response").should("be.visible");

// Module 5: Inbox
cy.visit("/dashboard/inbox");
cy.get(".conversation-list").children().should("have.length.greaterThan", 0);

// Module 6: Human takeover
cy.get("button:contains('Escalate')").click();
cy.get(".success-toast").should("be.visible");

// Module 7: Admin
cy.visit("/admin/users");
cy.get(".user-table").should("be.visible");
```

**Success Criteria**:
- ✅ All regression tests pass
- ✅ Zero Critical/High bugs

---

### Phase 6: Release Preparation (Week 7-8)

**Activities**:
- Prepare test summary report
- Verify all deliverables complete
- Final demo testing
- Create test coverage report

**Deliverables**:
- ✅ Test Summary Report
- ✅ Test Coverage Report (≥ 80%)
- ✅ Bug Log (final status)
- ✅ Release readiness verification

---

## 🎯 Frontend Performance Baselines

### Page Load Time Targets

| Page | Target | Measurement |
|------|--------|-------------|
| Landing Page | < 2s | Time to Interactive (TTI) |
| Login/Register | < 2s | TTI |
| Dashboard | < 2s | TTI |
| Profile Builder | < 2s | TTI |
| Public Profile | < 2s | TTI |
| Admin Panel | < 2s | TTI |

### Lighthouse Score Targets (per page)

```
Overall Target: ≥ 90

Breakdown:
- Performance: ≥ 90
- Accessibility: ≥ 95
- Best Practices: ≥ 90
- SEO: ≥ 90
```

### Measurement Commands

```bash
# Run Lighthouse CLI
lighthouse https://localhost:3000 --view

# For all pages
npm run lighthouse:audit

# CI/CD integration
npm run lighthouse:ci
```

### Performance Optimization Checklist

- ✅ Images optimized (Next.js Image component)
- ✅ Code split lazy loading implemented
- ✅ Unused CSS removed
- ✅ JavaScript minified
- ✅ Fonts optimized
- ✅ Caching strategies applied
- ✅ Bundle size < target (e.g., 200KB main)

### Target Metrics Tracking

| Metric | Target | Tool |
|--------|--------|------|
| Largest Contentful Paint (LCP) | < 2.5s | Lighthouse |
| First Input Delay (FID) | < 100ms | Lighthouse |
| Cumulative Layout Shift (CLS) | < 0.1 | Lighthouse |
| First Contentful Paint (FCP) | < 1.8s | Lighthouse |

---

## 🔄 Frontend Regression Testing Strategy

### When to Run Regression Tests

- ✅ After each bug fix (before commit)
- ✅ Before each release/milestone
- ✅ After major dependency updates
- ✅ After significant refactoring

### Frontend Regression Test Suite (Smoke Tests)

```javascript
// File: Frontend/cypress/e2e/regression.cy.js

describe("REGRESSION: Frontend Smoke Tests", () => {

  // Module 1: Auth Critical Path
  describe("Module 1: Authentication", () => {
    it("should complete full auth flow", () => {
      // Register
      cy.visit("/register");
      cy.get("input[name=email]").type(`test-${Date.now()}@mail.com`);
      cy.get("input[name=password]").type("SecurePass123!");
      cy.get("button[type=submit]").click();
      cy.url().should("include", "/dashboard");

      // Logout
      cy.get("[data-testid=logout-button]").click();
      cy.url().should("include", "/login");
    });
  });

  // Module 2: Card Profile Critical Path
  describe("Module 2: Card Profile", () => {
    beforeEach(() => {
      cy.login("test@mail.com", "password123");
    });

    it("should create and save card", () => {
      cy.visit("/dashboard/profile-builder");
      cy.get("input[name=title]").type("Test Card");
      cy.get("button:contains('Save')").click();
      cy.get(".success-toast").should("be.visible");
    });

    it("should show profile preview in real-time", () => {
      cy.visit("/dashboard/profile-builder");
      cy.get("input[name=title]").type("Updated Title");
      cy.get(".preview-title").should("contain", "Updated Title");
    });
  });

  // Module 3: AI Twin Configuration
  describe("Module 3: AI Twin Config", () => {
    beforeEach(() => {
      cy.login("test@mail.com", "password123");
    });

    it("should save AI configuration", () => {
      cy.visit("/dashboard/ai-twin");
      cy.get("textarea[name=persona]").type("AI persona");
      cy.get("button:contains('Save')").click();
      cy.get(".success-toast").should("be.visible");
    });
  });

  // Module 4: AI Chat Widget
  describe("Module 4: Chat Widget", () => {
    it("should load and respond in chat widget", () => {
      cy.visit("/u/test-user");
      cy.get("button:contains('Chat')").click();
      cy.get(".chat-widget").should("be.visible");

      cy.get("input[placeholder*='Message']").type("Hello");
      cy.get("button:contains('Send')").click();
      cy.get(".ai-response").should("be.visible");
    });
  });

  // Module 5: Inbox Management
  describe("Module 5: Inbox", () => {
    beforeEach(() => {
      cy.login("test@mail.com", "password123");
    });

    it("should display inbox conversations", () => {
      cy.visit("/dashboard/inbox");
      cy.get(".conversation-list").should("be.visible");
      cy.get(".conversation-card").should("have.length.greaterThan", 0);
    });
  });

  // Module 6: Human Takeover
  describe("Module 6: Human Takeover", () => {
    beforeEach(() => {
      cy.login("test@mail.com", "password123");
    });

    it("should escalate conversation", () => {
      cy.visit("/dashboard/inbox");
      cy.get(".conversation-card").first().click();
      cy.get("button:contains('Escalate')").click();
      cy.get(".confirm-modal").should("be.visible");
      cy.get("button:contains('Confirm')").click();
      cy.get(".success-toast").should("be.visible");
    });
  });

  // Module 7: Admin Panel
  describe("Module 7: Admin Panel", () => {
    beforeEach(() => {
      cy.login("admin@mail.com", "adminpass123");
    });

    it("should access admin panel and view users", () => {
      cy.visit("/admin");
      cy.get(".admin-sidebar").should("be.visible");
      cy.get("a[href*='/admin/users']").click();
      cy.get(".user-table").should("be.visible");
    });
  });
});
```

### Regression Test Execution

```bash
# Run all regression tests
npm run cypress:run -- --spec "cypress/e2e/regression.cy.js"

# Run specific module
npm run cypress:run -- --spec "cypress/e2e/regression.cy.js" --grep "Module 1"

# Generate report
npm run cypress:run -- --reporter json --spec "cypress/e2e/regression.cy.js"
```

### Regression Test Results Tracking

| Date | Module | Test Case | Status | Issue |
|------|--------|-----------|--------|-------|
| 2026-01-15 | Module 1 | Auth flow | ✅ PASS | - |
| 2026-01-15 | Module 2 | Card save | ✅ PASS | - |
| 2026-01-15 | Module 4 | Chat widget | ⚠️ TIMEOUT | Investigate |
| 2026-01-15 | Module 7 | Admin access | ✅ PASS | - |

**If regression test fails**:
1. Identify failing test
2. Reproduce issue manually
3. Find root cause
4. Fix bug
5. Re-run regression test until pass

---

## ✅ Pre-Implementation Checklist

Before coding any feature:

**Documentation Review**:
- ✅ Have I read the GUI Design for this feature?
- ✅ Have I understood the PRD requirements?
- ✅ Do I understand the API contracts (from Architecture)?

**Planning**:
- ✅ Have I planned the component structure?
- ✅ Have I planned accessibility requirements?
- ✅ Have I checked existing components for reuse?

**Testing & Performance**:
- ✅ Do I have a testing strategy (unit + E2E)?
- ✅ Do I understand performance targets (Lighthouse ≥ 90)?
- ✅ Have I planned for regression testing?

**Next.js Specifics**:
- ✅ Have I checked for Next.js App Router requirements?
- ✅ Do I need "use client" directive?
- ✅ Have I considered SSR vs Client-side rendering?

---

**Version:** 1.1 (Enhanced)
**Last Updated:** 2026
**Status:** Active ✅

*Enhanced version with testing timeline, performance baselines, and regression testing strategy.*
