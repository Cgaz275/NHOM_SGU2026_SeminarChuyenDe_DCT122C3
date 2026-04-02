# Team Projects Section – Implementation Plan

## Overview
Replace the existing `Masterpiece` section (id="projects") with a fully-designed **Team Projects** section that matches the Figma design: a vertical list of project cards with image, title, date, description, and tech tags.

## Figma Design Summary
- Dark page (#0F0F0F background)
- Large bold heading "OUR WORK"
- Vertical list of 6 project cards, each:
  - Horizontal layout: 160×160 thumbnail on the left, content on the right
  - Dark card (`#0F0F0F`) with thin border (`rgba(217,217,217,1)`), `border-radius: 8px`, `padding: 24px`
  - Link/chain icon in the top-right corner
  - Content: project title, date range (gray), description paragraph, tech tags (outlined pills)
- Tags: small uppercase outlined badges (e.g. PYTHON, N8N, DIFY.AI, GENAI)

## Project Data (6 projects)
1. Workshop Copilot – [PYTHON]
2. N8N – [PYTHON, N8N, DIFY.AI]
3. Cơ sở lập trình với GenAI – [PYTHON, GENAI]
4. Nâng cao lập trình với GenAI – [PYTHON, GENAI]
5. Xây dựng sản phẩm phần mềm dùng GenAI – [PYTHON, GENAI]
6. Personal Website with an AI Digital Twin – [PYTHON, GENAI]

## New Folder Structure
```
components/projects/
  projects-data.ts       ← typed project data array
  project-card.tsx       ← single card component
  project-list.tsx       ← renders list of ProjectCards
  projects-section.tsx   ← full section with heading + ProjectList
```

## Files to Create
| File | Purpose |
|------|---------|
| `components/projects/projects-data.ts` | Project type definition + static data array |
| `components/projects/project-card.tsx` | Horizontal card: thumbnail, title, date, description, tags, link icon |
| `components/projects/project-list.tsx` | Maps over data → renders `<ProjectCard>` per item |
| `components/projects/projects-section.tsx` | `<section id="projects">` with "OUR WORK" heading + `<ProjectList>` |

## Files to Modify
| File | Change |
|------|--------|
| `components/seminar-landing.tsx` | Replace `<Masterpiece />` import/usage with `<ProjectsSection />` |
| `app/globals.css` | Add `.project-card` and `.tech-tag` reusable CSS classes |

## CSS Strategy
- Add to `globals.css`:
  - `.project-card` – dark card with border, border-radius, padding, flex horizontal layout
  - `.tech-tag` – small outlined uppercase pill tag (distinct from existing `.outline-pill` which is larger)
- Use existing tokens: `--background`, `--foreground`, `--seminar-blue`, `section-shell`, `section-heading`
- Responsive behavior:
  - Mobile: card content stacks vertically (image on top, content below)
  - Desktop: horizontal layout (image left, content right)

## Implementation Steps
1. Add CSS classes to `globals.css` (`.project-card`, `.tech-tag`)
2. Create `projects-data.ts` with `Project` type and 6 project entries
3. Create `project-card.tsx` using the new CSS classes
4. Create `project-list.tsx` to render cards from data
5. Create `projects-section.tsx` as the section wrapper
6. Update `seminar-landing.tsx` to replace `Masterpiece` with `ProjectsSection`
