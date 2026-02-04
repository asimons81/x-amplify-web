# Unified Hub Spec — "OZZY Command OS"

This document is the blueprint for merging `second-brain` and `x-amplify-web` into a single, cohesive Next.js application.

---

## 1. Project Structure (Target)

```
x-amplify-web/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with unified sidebar
│   │   ├── page.tsx            # Dashboard (Command Center HUD)
│   │   ├── generator/
│   │   │   └── page.tsx        # X-Amplify (post generator)
│   │   ├── workflow/
│   │   │   └── page.tsx        # Kanban board
│   │   ├── notes/
│   │   │   ├── page.tsx        # Brain overview
│   │   │   └── [category]/
│   │   │       ├── page.tsx    # Category list
│   │   │       └── [slug]/
│   │   │           └── page.tsx # Individual doc
│   │   └── globals.css
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx     # Unified nav sidebar
│   │   │   ├── Header.tsx      # Top bar with command palette trigger
│   │   │   └── CommandPalette.tsx # Cmd+K modal
│   │   ├── dashboard/
│   │   │   ├── StatCard.tsx
│   │   │   ├── TrendPulse.tsx  # Real-time idea feed
│   │   │   ├── ExitTracker.tsx # Income replacement widget
│   │   │   └── ActiveDirectives.tsx
│   │   ├── generator/          # X-Amplify components (existing)
│   │   │   ├── PostCard.tsx
│   │   │   ├── EditModal.tsx
│   │   │   ├── SkeletonCard.tsx
│   │   │   └── ...
│   │   ├── workflow/
│   │   │   ├── KanbanBoard.tsx
│   │   │   ├── KanbanColumn.tsx
│   │   │   └── KanbanCard.tsx
│   │   ├── notes/
│   │   │   └── DocViewer.tsx   # Markdown renderer
│   │   └── ui/                 # Shared primitives
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Tooltip.tsx
│   │       ├── Modal.tsx
│   │       └── Background.tsx
│   ├── lib/
│   │   ├── gemini.ts           # AI engine (existing)
│   │   ├── prompts.ts          # Stijn method (existing)
│   │   ├── scraper.ts          # URL extraction (existing)
│   │   ├── validator.ts        # Post validation (existing)
│   │   ├── brain.ts            # Markdown file reader (from second-brain)
│   │   ├── kanban.ts           # Kanban state management (localStorage)
│   │   └── history.ts          # Generation history (localStorage)
│   └── content/                # Markdown files (from second-brain)
│       ├── concepts/
│       ├── journal/
│       ├── ideas/
│       └── templates/
├── public/
├── package.json
└── ...
```

---

## 2. Design System

### Colors
```css
--bg-primary: #0a0a0a;
--bg-secondary: #080808;
--bg-card: rgba(255, 255, 255, 0.03);
--border-subtle: rgba(255, 255, 255, 0.05);
--border-hover: rgba(99, 102, 241, 0.5);
--accent-blue: #3b82f6;
--accent-purple: #8b5cf6;
--accent-amber: #f59e0b;
--text-primary: #ededed;
--text-muted: #71717a;
```

### Typography
- **Headers:** Outfit (Black, Italic, Tight tracking)
- **Body:** Inter (Regular)
- **Mono:** JetBrains Mono (Stats, code)

### Effects
- Glassmorphism: `backdrop-blur-xl bg-white/5 border border-white/10`
- Glow on hover: `shadow-[0_0_20px_rgba(99,102,241,0.3)]`
- Subtle grain overlay on background

---

## 3. Page Specifications

### 3.1 Dashboard (`/`)
The "Head-Up Display" — a single glance tells you the state of the operation.

**Widgets:**
1. **Exit Tracker** — Progress bar: current digital income vs $17/hr ISU salary
2. **Stat Cards** — X Followers, Daily Renders, Ideas in Pipeline
3. **Trend Pulse** — Live feed of top 5 ideas from `content/ideas/` sorted by HN score
4. **Active Directives** — List of current automation goals
5. **Quick Actions** — "Generate Post", "New Idea", "Check Newsletter"

### 3.2 Generator (`/generator`)
The existing X-Amplify functionality, but now nested in the unified shell.
- Keep all existing features (loading states, history, copy all, share to X, etc.)
- Add breadcrumb: "Dashboard > Generator"

### 3.3 Workflow (`/workflow`)
A Kanban board for the content pipeline.

**Columns:**
1. **Scouted** — Raw ideas from Trend Scout
2. **Writing** — Drafts in progress
3. **Rendering** — Queued for Remotion
4. **Scheduled** — Ready to post
5. **Posted** — Archive

**Card Data:**
- Title, source URL, HN score (if applicable), created date
- Drag-and-drop between columns
- Click to expand: full idea text, generate button (sends to X-Amplify)

**Persistence:** LocalStorage (later: API/database)

### 3.4 Notes (`/notes`)
The Second Brain wiki, now integrated.

**Features:**
- Category tabs: Journal, Concepts, Ideas, Templates
- Search bar (client-side filter)
- Markdown rendering with syntax highlighting
- "Edit in Cursor" button (opens file path)

---

## 4. Unified Sidebar

**Navigation Items:**
1. 🏠 Dashboard (`/`)
2. ⚡ Generator (`/generator`)
3. 📋 Workflow (`/workflow`)
4. 🧠 Notes (`/notes`)

**Footer:**
- User card (Tony Simons, "Digital Twin Active")
- Collapse toggle

**Mobile:**
- Hamburger menu
- Full-screen overlay nav

---

## 5. Command Palette (`Cmd+K`)

A global search/action modal.

**Actions:**
- "Generate Post" → navigates to `/generator`
- "New Idea" → opens quick-add modal
- "Search Notes" → filters brain content
- "Check Quota" → shows API usage

---

## 6. Implementation Order

1. **Phase 1: Merge Assets**
   - Copy `content/` folder from second-brain
   - Copy `lib/brain.ts` from second-brain
   - Install missing deps (gray-matter)

2. **Phase 2: Unified Layout**
   - Create new `Sidebar.tsx` with all nav items
   - Create `Header.tsx` with Cmd+K trigger
   - Update `layout.tsx` to wrap all pages

3. **Phase 3: Dashboard Rebuild**
   - Create dashboard widgets
   - Wire up to real data (ideas count, etc.)

4. **Phase 4: Route Migration**
   - Move current X-Amplify page to `/generator`
   - Create `/notes` routes with dynamic segments
   - Create `/workflow` with Kanban

5. **Phase 5: Polish**
   - Command Palette implementation
   - Animations and transitions
   - Mobile responsiveness pass
   - Final design QA

---

## 7. Dependencies to Add

```bash
npm install gray-matter @dnd-kit/core @dnd-kit/sortable cmdk
```

- `gray-matter`: Markdown frontmatter parsing
- `@dnd-kit/*`: Drag-and-drop for Kanban
- `cmdk`: Command palette component

---

## 8. Success Criteria

- [ ] Single URL hosts all functionality
- [ ] Consistent visual language across all pages
- [ ] Mobile-responsive on all routes
- [ ] `npm run build` passes
- [ ] Deployed to Vercel successfully
