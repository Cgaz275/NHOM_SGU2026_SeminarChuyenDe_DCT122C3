Prompt Lần 1

You are a senior frontend engineer and UI/UX designer.

Build a polished Next.js 15 App Router frontend interface for a “Public Digital Profile with AI Digital Twin Chat” page.

IMPORTANT:
Write all source code inside the folder named `FrontEnd`.

Project context:
This is a Persona-Based Digital Card platform. A visitor opens a public profile after scanning a QR code or opening a personalized URL like `/u/[username]`.

The page works like a modern portfolio / digital business card, but it also includes an AI Digital Twin chat assistant representing the profile owner. The AI must feel like an assistant of the owner, not the real person.

The visitor should be able to:
- View the owner’s public profile like a portfolio.
- See skills, projects, experience, bio, and social links.
- Start chatting with the owner’s AI Digital Twin.
- Leave contact information if the AI is disabled, broken, overloaded, or unable to answer.
- Report the AI if it behaves aggressively, gives misleading information, or feels unsafe.
- Download a contact card image containing name, role, short info, and QR code.
- Export a vCard as a secondary contact option.

Tech requirements:
- Use Next.js 15 App Router.
- Use TypeScript.
- Use Tailwind CSS.
- Use Framer Motion for subtle animations.
- Use lucide-react icons.
- Build clean, componentized code.
- Use mock data only.
- Do not build real backend logic yet.
- Do not integrate real authentication, database, AI API, file storage, or analytics.
- Keep the code API-ready so real APIs can be connected later.
- Use responsive mobile-first design.
- The UI should look like a real polished product demo, not a basic CRUD screen.

Design direction:
Use a premium dark-tech digital card aesthetic.

Main colors:
- Background: #0B0B0B
- Surface/card: #101010
- Brand blue: #2367A2
- Electric blue: #008FEA
- User chat bubble / input light color: #EAF3FC
- Text primary: #FFFFFF
- Text muted: #B7B7B7
- Danger: #E5484D
- Success: #2ECC71

Visual style:
- Dark background.
- Large rounded cards, radius around 20-24px.
- Thin borders using rgba(255,255,255,0.15).
- Blue glow around the main profile card.
- Button style: pill-shaped, blue, smooth hover effect.
- Cards should have soft shadows and subtle hover states.
- The profile card should resemble a digital business card.
- The chat panel may use a light inner message area inside the dark layout for readability.
- Use a clean modern font style. Tailwind default is fine, but the feeling should be close to Inter / Satoshi / Space Grotesk.
- Use subtle animation only. No distracting effects.

Main page:
Create a public profile page for “Anthony Simon”.

Route:
- `/u/[username]`

Mock username:
- `anthony-simon`

Page layout:
- Mobile-first layout.
- Desktop layout should use 2 columns:
  - Left column:
    - Profile hero card
    - QR / contact card preview
    - Social links
    - Save contact actions
  - Right column:
    - About
    - Skills
    - Featured projects
    - Experience
    - AI Twin Chat widget
- On mobile, stack all sections vertically.
- The first viewport should clearly show:
  - Avatar
  - Name
  - Role
  - Short slogan
  - Social icons
  - Primary CTA: “Ask my AI Twin”
  - Secondary CTA: “Save Contact”
  - Small AI status badge

Mock profile data:
Use this mock profile:

Name:
Anthony Simon

Role:
Product Designer & AI Strategist

Slogan:
Crafting digital twins for seamless professional connection

Bio:
Anthony is a versatile full-stack developer and AI product strategist. He builds digital experiences that combine personal branding, automation, and conversational AI.

Skills:
- Next.js
- Python
- UI/UX
- AI Agent
- Supabase
- Tailwind CSS

Social links:
- LinkedIn
- GitHub
- X
- Portfolio
- Email

Featured projects:
1. Personal Website with an AI Digital Twin
   Date: 01.2026 - 02.2026
   Description:
   A portfolio platform where visitors can chat with an AI representative trained on the owner’s skills, projects, and experience.
   Tags:
   Next.js, AI, Tailwind

2. Persona-Based Digital Card
   Date: 01.2026 - 02.2026
   Description:
   A smart digital business card with QR sharing, lead capture, AI chat, and contact export.
   Tags:
   QR, Supabase, AI

Experience:
1. Company A
   Date: 01.2026 - 02.2026
   Description:
   Worked on frontend interfaces, profile management, AI assistant configuration, and dashboard workflows.

2. Company B
   Date: 03.2026 - 05.2026
   Description:
   Built interactive public profile components, chat UI states, and lead capture forms.

Required components:
Create clean separated components such as:

1. PublicProfilePage
2. ProfileHeroCard
3. SocialLinks
4. AboutSection
5. SkillsSection
6. FeaturedProjects
7. ExperienceSection
8. SaveContactCard
9. AITwinChatWidget
10. LeadFallbackModal
11. ReportAIModal
12. StateSwitcher
13. LoadingSkeleton
14. EmptyState
15. Toast

Suggested folder structure:
- FrontEnd/app/u/[username]/page.tsx
- FrontEnd/components/public-profile/ProfileHeroCard.tsx
- FrontEnd/components/public-profile/SocialLinks.tsx
- FrontEnd/components/public-profile/AboutSection.tsx
- FrontEnd/components/public-profile/SkillsSection.tsx
- FrontEnd/components/public-profile/FeaturedProjects.tsx
- FrontEnd/components/public-profile/ExperienceSection.tsx
- FrontEnd/components/public-profile/SaveContactCard.tsx
- FrontEnd/components/public-profile/AITwinChatWidget.tsx
- FrontEnd/components/public-profile/LeadFallbackModal.tsx
- FrontEnd/components/public-profile/ReportAIModal.tsx
- FrontEnd/components/public-profile/StateSwitcher.tsx
- FrontEnd/components/public-profile/LoadingSkeleton.tsx
- FrontEnd/components/public-profile/EmptyState.tsx
- FrontEnd/components/ui/Toast.tsx
- FrontEnd/lib/mock-public-profile-api.ts
- FrontEnd/types/public-profile.ts

Architecture requirement:
Build the UI as frontend-first, but make it easy to connect real APIs later.

Do not hard-code business logic deeply inside UI components. Use a clean mock data layer and service-like functions so that future API integration only requires replacing mock functions.

Create TypeScript interfaces/types for:
- PublicProfile
- SocialLink
- Project
- Experience
- AIStatus
- ChatMessage
- LeadFormData
- ReportData
- PublicProfileState

Create a separate mock API file:
`FrontEnd/lib/mock-public-profile-api.ts`

This file should contain Promise-based mock functions:
- getPublicProfile(username)
- sendChatMessage(profileId, message)
- submitLeadForm(profileId, leadData)
- submitAIReport(profileId, reportData)
- downloadContactCard(profileId)
- exportVCard(profileId)

For now, these functions should:
- Return mock data.
- Use small artificial delays.
- Simulate success and error states.
- Be easy to replace later with real fetch / axios / Supabase calls.

Component architecture:
- The page component should handle main state and call mock service functions.
- Child components should receive props and emit events.
- Avoid placing mock arrays directly inside deeply nested components.
- Keep presentation components reusable.
- Prepare loading, success, and error states for future real API behavior.
- Do not implement a real backend yet.

AI Twin Chat behavior:
Create an interactive mock chat widget.

Initial chat state:
- Header: “Anthony’s AI Twin”
- Badge: “AI Ready”
- Disclaimer:
  “This is an AI assistant representing Anthony. It may not be the real person.”
- Initial assistant message:
  “Hi, I’m Anthony’s AI Twin. You can ask me about his skills, projects, experience, or collaboration availability.”

Chat interaction:
- User can type into an input and send messages.
- On send:
  - Append the user message.
  - Show a typing/loading indicator.
  - Mock an AI response after a short delay.
- AI responses should be based on simple mock logic:
  - If the user asks about projects, answer with the project summary.
  - If the user asks about skills, answer with skills.
  - If the user asks about experience, answer with experience.
  - If the user asks about contact, collaboration, service, price, pricing, hiring, or business, suggest leaving contact information.
  - If the user asks something unknown, AI should say:
    “I do not have enough information about that. You can leave your contact information so Anthony can reply directly.”
- Add a button inside the chat:
  “Leave contact info”
- Add a small “Report AI” button in the chat header or near the widget.

Important AI behavior:
- Do not make the AI sound like it is Anthony himself.
- Always label it as “AI Twin”, “AI assistant”, or “Anthony’s AI Twin”.
- The AI should never claim to be the real person.
- Add clear disclaimer text in the chat.

Fallback / lead capture behavior:
The lead form should appear in these cases:
1. User manually clicks “Leave contact info”.
2. AI status is “AI Disabled”.
3. AI status is “AI Error”.
4. AI detects that the visitor is asking detailed business, service, contact, pricing, or collaboration questions.
5. AI cannot answer the question confidently.

Lead fallback modal:
Create a modal with:
- Title:
  “Leave your contact information”
- Subtitle:
  “Anthony can contact you directly if the AI cannot answer your question.”
- Fields:
  - Name
  - Email
  - Phone number
  - Message / Need
- Consent text:
  “By submitting this form, you agree that the profile owner may contact you back.”
- Buttons:
  - Cancel
  - Send

Lead form behavior:
- Validate required fields visually.
- Email should have a basic email validation.
- Phone number can be optional.
- Message should be required.
- On submit, call `submitLeadForm`.
- Show loading state while submitting.
- Show success state:
  “Your information has been sent. Anthony will contact you later.”
- Show error state if mock API fails.

Report AI modal:
This is used when the AI response feels aggressive, unsafe, misleading, or inappropriate.

Trigger:
- Red/danger button:
  “Report AI”

Modal content:
- Title:
  “Report this AI profile”
- Subtitle:
  “Tell us what happened so we can review this Digital Twin.”
- Textarea label:
  “Reason for report”
- Optional quick reason pill buttons:
  - Aggressive response
  - Misleading information
  - Spam
  - Privacy concern
  - Other
- Submit button:
  “Submit report”

Report behavior:
- On submit, call `submitAIReport`.
- Show loading state while submitting.
- Show success message:
  “Thanks. This report has been submitted for review.”
- The modal should not look scary, but it must be clearly available.

Save contact behavior:
Important:
In this UI, the primary “Save Contact” action should download a contact card image, not only a `.vcf`.

Create a `SaveContactCard` component.

The contact card preview should include:
- Avatar
- Name
- Role
- Slogan
- Large QR placeholder
- URL:
  `digitalcard.app/u/anthony-simon`

Buttons:
1. Primary button:
   “Download Contact Card”
2. Secondary button:
   “Export vCard”

Behavior:
- When “Download Contact Card” is clicked:
  - Call `downloadContactCard(profileId)`.
  - Mock the download.
  - Show toast:
    “Contact card image downloaded.”
- When “Export vCard” is clicked:
  - Call `exportVCard(profileId)`.
  - Mock the vCard export.
  - Show toast:
    “vCard exported.”
- No real canvas export is required unless easy to implement.
- The UI should still look like it supports real downloading later.

State handling:
Add a small developer/demo state switcher to preview page states.

The state switcher should support:
1. Published + AI Ready
2. AI Disabled
3. AI Error
4. Profile Updating
5. Card Locked
6. 404 Not Found
7. Loading Skeleton

State rules:

Published + AI Ready:
- Show full profile.
- Show active AI chat widget.
- Chat input is enabled.
- AI status badge should be green/success.

AI Disabled:
- Show full profile.
- Disable or hide active chat input.
- Show message:
  “Anthony’s AI Twin is currently unavailable. You can still leave your contact information.”
- Show fallback lead form CTA.

AI Error:
- Show full profile.
- Show safe fallback message:
  “The AI assistant is under maintenance. Please leave your contact information and Anthony will get back to you.”
- Show fallback lead form CTA.
- Do not show technical error details.

Profile Updating:
- Hide unfinished profile content.
- Show centered empty state:
  “This profile is being updated.”

Card Locked:
- Hide profile content.
- Show centered empty state:
  “This profile is currently unavailable.”

404 Not Found:
- Show modern 404 page:
  “Digital profile not found.”

Loading Skeleton:
- Show skeleton cards for:
  - Profile hero
  - About section
  - Projects
  - Chat widget

UX details:
- Social icons should open in a new tab.
- Buttons should have clear hover and focus states.
- Modals should have backdrop overlay and close button.
- Use accessible labels for inputs and buttons.
- Use keyboard-friendly buttons and inputs.
- Use responsive spacing.
- The mobile experience must be strong because most visitors scan QR codes using phones.
- Avoid layout shift.
- Use toast feedback for actions.
- Use clean empty states instead of raw errors.
- Never show technical stack traces or raw API error text to the visitor.

Expected output:
- Generate complete working code.
- The app should run without missing imports.
- Do not leave TODO placeholders.
- Keep the design consistent, premium, dark, and demo-ready.
- Use mock data and mock API functions only.
- Make the code easy to connect with a real backend later.
- Focus only on frontend UI and client-side mock interactions.
