You are a senior frontend engineer and UI/UX designer.

Continue working inside the existing Next.js 15 App Router project.

IMPORTANT:
Write all source code inside the folder named `FrontEnd`.
Do not create or use `Frontend`, `frontend`, `FE`, or any other folder name.

Task:
Build a polished frontend interface for the “Profile Builder / Card Editor” screen of a Persona-Based Digital Card platform.

This is an owner dashboard screen where the card owner can create and edit their public Digital Profile. The owner can enter personal information, upload media, add social links, configure privacy, select a theme, preview the public card in real time, save draft, and publish the card.

Do not build real backend logic yet.
Use mock data and mock API functions only.
Make the UI API-ready for future backend integration.

Project context:
The system allows users to create a personalized digital business card with an AI Digital Twin. The Profile Builder is used before publishing the public profile at a URL like `/u/[username]`.

This screen should visually match the existing dark-tech style of the project:
- Dark background
- Black/dark gray panels
- Blue accent colors
- Rounded cards
- Thin borders
- Clean form fields
- Sidebar navigation
- Premium dashboard feeling

Main design direction:
Use the provided reference image as inspiration:
- Left sidebar with “SEMINAR” logo and menu items.
- Main content area with stacked rounded form sections.
- Sections:
  - Basic Info
  - Media
  - Social Links
  - Privacy
  - Theme
  - Publish
- Desktop should show form on the left/main area and live preview on the right.
- Mobile should show form as step-by-step sections with a “Preview” button/drawer.

Tech requirements:
- Use Next.js 15 App Router.
- Use TypeScript.
- Use Tailwind CSS.
- Use Framer Motion for subtle transitions.
- Use lucide-react icons.
- Use mock data only.
- Do not connect real database, authentication, storage, or API.
- Keep code clean and componentized.
- Build with future API integration in mind.

Route:
Create the screen at:
`/dashboard/profile-builder`

Suggested file path:
`FrontEnd/app/dashboard/profile-builder/page.tsx`

Required folder/file structure:
- FrontEnd/app/dashboard/profile-builder/page.tsx
- FrontEnd/components/dashboard/DashboardSidebar.tsx
- FrontEnd/components/profile-builder/ProfileBuilderForm.tsx
- FrontEnd/components/profile-builder/BasicInfoSection.tsx
- FrontEnd/components/profile-builder/MediaUploadSection.tsx
- FrontEnd/components/profile-builder/SocialLinksSection.tsx
- FrontEnd/components/profile-builder/PrivacySection.tsx
- FrontEnd/components/profile-builder/ThemeSelectorSection.tsx
- FrontEnd/components/profile-builder/PublishSection.tsx
- FrontEnd/components/profile-builder/LiveProfilePreview.tsx
- FrontEnd/components/profile-builder/MobilePreviewDrawer.tsx
- FrontEnd/components/profile-builder/ProfileBuilderStateBar.tsx
- FrontEnd/components/profile-builder/SlugInput.tsx
- FrontEnd/components/ui/Toast.tsx
- FrontEnd/lib/mock-profile-builder-api.ts
- FrontEnd/types/profile-builder.ts

If some shared components already exist, reuse them when appropriate, but do not break the existing Public Digital Profile page.

Design tokens:
Use the same visual language as the current project.

Colors:
- Background: #0B0B0B
- Sidebar: #101010
- Surface/card: #101010
- Input background: #FFFFFF or #F5F5F5 for readability
- Brand blue: #2367A2
- Electric blue: #008FEA
- Text primary: #FFFFFF
- Text muted: #B7B7B7
- Border: rgba(255,255,255,0.14)
- Danger: #E5484D
- Success: #2ECC71
- Warning: #F5A524

Layout requirements:
Desktop:
- Full screen dashboard layout.
- Left sidebar fixed or sticky, width around 220px.
- Sidebar items:
  - Manage Profile
  - Manage Persona
  - Manage QR
  - Manage Messages
- Active item: Manage Profile.
- Main content should have:
  - Header row with title: “Profile Builder”
  - Subtitle: “Edit your public digital card and preview changes in real time.”
  - Status bar showing Draft Saved / Unsaved Changes / Published.
  - Form column.
  - Live preview column.
- Form column should be wider than preview or use a 60/40 layout.
- Live preview should be sticky on desktop.

Mobile:
- Sidebar should collapse into a top bar or hamburger-style menu.
- Form should become step-based:
  1. Basic Info
  2. Media
  3. Social Links
  4. Privacy
  5. Theme
  6. Publish
- Add a button: “Preview”
- Preview opens as a drawer/modal.
- Keep all controls touch-friendly.

Core sections:

1. Basic Info Section
Fields:
- Full Name
- Role / Title
- Slogan
- Bio
- Slug

Rules:
- Full Name is required.
- Role / Title is required.
- Slogan is optional.
- Bio max length: 300 characters.
- Show character counter for Bio.
- Slug is required.
- Slug should be shown as:
  `digitalcard.app/u/[slug]`
- Validate slug format:
  - lowercase letters
  - numbers
  - hyphen only
  - no spaces
- Simulate slug availability check with mock API.
- If slug is unavailable, show error:
  “This slug is already taken.”
- If slug is valid and available, show success:
  “Slug is available.”

2. Media Upload Section
Fields:
- Avatar upload
- Cover image upload

Rules:
- Avatar max size: 5MB.
- Cover max size: 8MB.
- Accept image files only.
- Show selected image preview immediately.
- If no image exists, show gradient placeholder.
- Mock upload only, no real storage.
- Show upload failed state if mock API fails.
- Add helper text:
  “Images are previewed locally. Real upload will be connected later.”
- Optional crop UI can be mocked, but do not implement complex crop logic.

3. Social Links Section
Fields:
- Facebook
- Instagram
- X / Twitter
- GitHub
- Behance
- Dribbble
- Portfolio
- Email
- Phone

Rules:
- URL fields should validate URL format.
- Email should validate email format.
- Phone can be free text but should not be empty if Show Phone is enabled.
- Show matching social icon automatically if a field has data.
- Empty social fields should not appear in the public preview.

4. Privacy Section
Toggles:
- Show Email
- Show Phone
- Show Social Links
- Allow AI to mention contact info

Rules:
- These toggles affect live preview immediately.
- If Show Email is off, email should not appear in preview.
- If Show Phone is off, phone should not appear in preview.
- If Show Social Links is off, social icons should be hidden in preview.
- If Allow AI to mention contact info is off, show helper text:
  “AI will not be allowed to share your email or phone number.”

5. Theme Selector Section
Options:
- Dark Blue
- Minimal Black
- Electric Blue
- Glass Card

Controls:
- Accent color selector with predefined colors only.
- Font style selector:
  - Modern Sans
  - Tech Display
  - Clean Professional

Rules:
- Theme changes should reflect in Live Preview.
- Keep all themes within the dark-tech brand style.
- Do not create light mode for this screen unless needed for preview only.

6. Publish Section
Actions:
- Save Draft
- Publish Card
- Reset Changes

Rules:
- Save Draft should call a mock API.
- Publish should validate required fields first.
- If required fields are missing, highlight errors.
- If publish succeeds, show toast:
  “Card published successfully.”
- If draft saves, show toast:
  “Draft saved.”
- Reset Changes should restore initial mock data after confirmation.
- Show a small summary:
  - Required fields completed
  - Slug status
  - Privacy status
  - Last saved time

Live Preview:
Create a `LiveProfilePreview` component that simulates the public profile card.

Preview content:
- Avatar
- Cover image or gradient placeholder
- Full Name
- Role
- Slogan
- Bio
- Social icons if enabled
- Email/phone if enabled
- Skills placeholder pills
- Button: “Ask my AI Twin”
- Button: “Save Contact”

Preview requirements:
- Updates in real time when form fields change.
- Updates should feel instant and stay under 200ms.
- Preview should clearly look like the public card.
- Use a small badge:
  - Draft
  - Ready to Publish
  - Published
- Preview should support desktop and mobile preview toggle:
  - Mobile preview
  - Desktop preview

State handling:
Create UI states:
- Loading initial profile data
- Draft saved
- Unsaved changes
- Saving draft
- Publishing
- Published successfully
- Validation error
- Slug unavailable
- Upload failed
- Network/mock API error

Mock API:
Create `FrontEnd/lib/mock-profile-builder-api.ts`.

It should export Promise-based functions:
- getProfileDraft()
- saveProfileDraft(data)
- publishProfile(data)
- checkSlugAvailability(slug)
- mockUploadAvatar(file)
- mockUploadCover(file)
- resetProfileDraft()

Rules:
- Use artificial delay.
- Return mock success/error.
- `checkSlugAvailability` should return unavailable for slugs:
  - admin
  - test
  - anthony-simon
  - digitalcard
- Other valid slugs should return available.
- Keep the mock API easy to replace with real API later.

Types:
Create `FrontEnd/types/profile-builder.ts`.

Required types:
- ProfileBuilderData
- BasicInfoData
- MediaData
- SocialLinksData
- PrivacySettings
- ThemeSettings
- ProfileBuilderStatus
- SlugStatus
- UploadStatus

Suggested data model:
ProfileBuilderData should include:
- id
- fullName
- role
- slogan
- bio
- slug
- avatarUrl
- coverUrl
- socialLinks
- email
- phone
- privacy
- theme
- status
- lastSavedAt

Validation:
Create clean frontend validation.
Validation should include:
- Full name required.
- Role required.
- Slug required.
- Slug format.
- Bio max 300 characters.
- URL format for social links.
- Email format.
- Avatar max 5MB.
- Cover max 8MB.

Do not over-engineer with external form libraries unless necessary.
React state is acceptable.
If using a form library, keep the implementation simple.

User experience:
- Inputs should be readable and have clear labels.
- Required fields should be marked.
- Validation errors should appear near the field.
- Use helper text where needed.
- Use disabled/loading state for async actions.
- Use smooth transitions between mobile steps.
- Use toasts for success/error actions.
- Use confirmation modal before reset.
- Do not show raw technical errors to the user.

Important API-ready architecture:
- Do not hard-code mock data inside deeply nested components.
- Keep mock data and mock API functions in `mock-profile-builder-api.ts`.
- The main page should own the form state and call mock API functions.
- Child components should receive values and callbacks through props.
- Keep components reusable and clean.
- Real API integration later should only require replacing mock API functions and adding real fetch/Supabase calls.

Do not implement:
- Real authentication
- Real database
- Real image storage
- Real QR generation
- Real AI configuration
- Payment
- Admin features
- PDF/DOCX upload

Implementation expectation:
- Return complete working code.
- Do not leave TODO placeholders.
- Do not break existing files/routes.
- Keep naming consistent.
- Ensure imports are correct.
- The screen should look polished and demo-ready.
- The UI should closely follow the reference image but improve it with a modern dashboard layout and live preview.

Manual verification checklist:
After implementation, I should be able to:
1. Run the dev server.
2. Open `/dashboard/profile-builder`.
3. Edit full name, role, slogan, bio, and slug.
4. See the live preview update immediately.
5. Toggle email/phone/social visibility and see preview change.
6. Upload avatar/cover locally and see preview change.
7. Test slug unavailable state using `anthony-simon`, `admin`, or `test`.
8. Save draft and see a success toast.
9. Publish with missing required fields and see validation errors.
10. Publish with valid fields and see success state.
11. Open the page on mobile size and use step-based form plus preview drawer.

Important:
Do not modify the existing `/u/[username]` Public Digital Profile route unless absolutely necessary.
This task is only for `/dashboard/profile-builder`.
Shared components may be reused, but do not break the existing public profile page.
