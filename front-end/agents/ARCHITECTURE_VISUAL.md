# 🎨 TZ·AI - Visual Architecture & Component Map

## 📐 Application Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Next.js App Router                        │
│                   (Pages at /app folder)                      │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
   ┌────▼────┐          ┌─────▼──────┐        ┌────▼────┐
   │   Home  │          │ Dashboard  │        │  Chat   │
   │  page.  │          │  page.tsx  │        │ page.   │
   │   tsx   │          │  (92 lines)│        │  tsx    │
   └────┬────┘          └──────┬─────┘        └────┬────┘
        │                      │                    │
        │                      │                    │
   ┌────▼────┐          ┌──────▼──────────┐   ┌────▼─────────┐
   │         │          │  8 Components   │   │ 4 Components │
   │Landing  │          │  + Structure    │   │              │
   │Features │          │  + Helpers      │   │   Messages   │
   │   CTA   │          │                 │   │   Input      │
   │         │          │  TOTAL: 15 files    │   Header     │
   └─────────┘          └─────────────────┘   │   Examples   │
                                                └──────────────┘
        │                                             │
        │                                             │
   ┌────▼──────────────────────────────────────────▼────┐
   │  ┌─────────────────────────────────────────────┐   │
   │  │    🔐 Auth Page (NEW - Phase 4)             │   │
   │  │    /auth/page.tsx (230 lines)               │   │
   │  └─────────────────────────────────────────────┘   │
   │                                                      │
   │  Features:                                           │
   │  ✅ Login/Register Toggle                           │
   │  ✅ Email, Password, Name fields                    │
   │  ✅ Remember me / Forgot password                   │
   │  ✅ Social auth buttons (Google, GitHub)            │
   │  ✅ Loading spinner                                 │
   │  ✅ Unified design style                            │
   └──────────────────────────────────────────────────────┘
```

---

## 🗂️ Complete File Structure

```
satpayev/
│
├── 📄 app/
│   ├── 📄 page.tsx                      (HOME - Updated Phase 4)
│   │   └─ Features: Logo, Nav, Landing, CTA
│   │
│   ├── 📁 auth/                         (NEW - Phase 4)
│   │   ├── page.tsx                     (230 lines - Full auth)
│   │   │   ├─ useState: isLogin, email, password, name, isLoading
│   │   │   ├─ Features: Login/Register toggle
│   │   │   ├─ Inputs: email, password, name
│   │   │   ├─ Checkbox: Remember me (login only)
│   │   │   ├─ Buttons: Google, GitHub
│   │   │   └─ Loading: Spinner animation
│   │   │
│   │   └── README.md                    (250+ lines - Docs)
│   │       ├─ Overview & Features
│   │       ├─ Component Structure
│   │       ├─ State Management
│   │       ├─ Integration Points
│   │       ├─ Security Notes
│   │       └─ Future Enhancements
│   │
│   ├── 📁 chat/                         (Phase 3)
│   │   ├── page.tsx                     (202 lines - Main chat logic)
│   │   │   ├─ useState: messages, input, isTyping
│   │   │   ├─ useRef: messagesEndRef (auto-scroll)
│   │   │   ├─ handleSubmit()
│   │   │   ├─ handleClear()
│   │   │   └─ Features: 6 examples, typing indicator
│   │   │
│   │   ├── components/
│   │   │   ├── ChatHeader.tsx           (38 lines)
│   │   │   │   └─ Logo, Status indicator, Dashboard link
│   │   │   │
│   │   │   ├── ChatInput.tsx            (81 lines)
│   │   │   │   ├─ Input field
│   │   │   │   ├─ Character counter (max 2000)
│   │   │   │   ├─ Send button
│   │   │   │   └─ 🗑️ Clear button (with confirm dialog)
│   │   │   │
│   │   │   ├── MessageList.tsx          (57 lines)
│   │   │   │   ├─ Message history
│   │   │   │   ├─ Fade-in animation
│   │   │   │   ├─ User vs Assistant styles
│   │   │   │   └─ Typing indicator
│   │   │   │
│   │   │   └── ExamplePrompts.tsx       (94 lines)
│   │   │       ├─ 6 example questions
│   │   │       ├─ Categories: Rules + Improvement
│   │   │       └─ Click handlers
│   │   │
│   │   ├── constants.ts                 (38 lines)
│   │   │   ├─ 6 example prompts array
│   │   │   ├─ Initial message
│   │   │   ├─ Sample responses
│   │   │   └─ Constants
│   │   │
│   │   └── README.md                    (280+ lines)
│   │       ├─ Complete documentation
│   │       ├─ Features explained
│   │       ├─ Integration examples
│   │       └─ Testing checklist
│   │
│   ├── 📁 dashboard/                    (Phase 1-2)
│   │   ├── page.tsx                     (92 lines - Orchestrator)
│   │   │   └─ Imports & renders all dashboard components
│   │   │
│   │   ├── components/                  (8 files)
│   │   │   ├── DashboardHeader.tsx      (85 lines)
│   │   │   │   └─ Logo, navigation, branding
│   │   │   │
│   │   │   ├── UploadModal.tsx          (358 lines - Phase 1)
│   │   │   │   ├─ Drag & drop upload
│   │   │   │   ├─ Project selection
│   │   │   │   ├─ Progress tracking
│   │   │   │   └─ Smooth animations
│   │   │   │
│   │   │   ├── DocumentList.tsx         (120 lines)
│   │   │   │   ├─ Document history
│   │   │   │   ├─ Search filtering
│   │   │   │   └─ Status badges
│   │   │   │
│   │   │   ├── ChatWidget.tsx           (95 lines)
│   │   │   │   ├─ Floating chat button
│   │   │   │   ├─ Link to /chat
│   │   │   │   └─ Hover animation
│   │   │   │
│   │   │   ├── StatCard.tsx             (50 lines)
│   │   │   │   ├─ Metric card
│   │   │   │   ├─ Icon + value
│   │   │   │   └─ Gradient background
│   │   │   │
│   │   │   ├── QuickTips.tsx            (75 lines)
│   │   │   │   ├─ Tips grid
│   │   │   │   └─ Hover effects
│   │   │   │
│   │   │   ├── EmptyState.tsx           (60 lines)
│   │   │   │   ├─ No documents state
│   │   │   │   └─ CTA button
│   │   │   │
│   │   │   └── FilterBar.tsx            (65 lines)
│   │   │       ├─ Search input
│   │   │       ├─ Type filter
│   │   │       └─ Sorting
│   │   │
│   │   ├── types/
│   │   │   └── dashboard.ts
│   │   │       ├─ Document interface
│   │   │       ├─ Stats interface
│   │   │       └─ Status enums
│   │   │
│   │   ├── constants/
│   │   │   └── index.ts
│   │   │       ├─ Sample documents
│   │   │       ├─ Tips
│   │   │       └─ Filter options
│   │   │
│   │   ├── helpers/
│   │   │   └── index.ts
│   │   │       ├─ formatDate()
│   │   │       ├─ filterDocuments()
│   │   │       └─ calculateStats()
│   │   │
│   │   └── README.md                    (200+ lines)
│   │       └─ Dashboard documentation
│   │
│   ├── 📄 globals.css                   (Updated)
│   │   ├─ @keyframes fade-in (animations)
│   │   ├─ @keyframes spin (loading)
│   │   ├─ Global styles
│   │   └─ CSS variables
│   │
│   └── 📄 layout.tsx                    (Root layout)
│       └─ Metadata & structure
│
├── 📁 components/                       (Global components - if any)
├── 📁 context/                          (State management - if any)
├── 📁 lib/                              (Utilities)
├── 📁 public/                           (Static files)
│
└── 📚 Documentation Files:
    ├── PROJECT_COMPLETION_REPORT.md     (300+ lines)
    │   └─ Full project overview, all 4 phases
    │
    ├── QUICK_START.md                   (250+ lines)
    │   └─ How to run, what to do on each page
    │
    ├── FILES_MANIFEST.md                (200+ lines)
    │   └─ Complete file listing
    │
    ├── package.json                     (Dependencies)
    ├── tsconfig.json                    (TypeScript config)
    ├── tailwind.config.ts               (Tailwind config)
    └── next.config.ts                   (Next.js config)
```

---

## 🎯 Component Dependency Graph

```
GlobalLayout (layout.tsx)
│
├─→ Home Page (page.tsx)
│   └─→ Links to other pages
│
├─→ Auth Page (/auth/page.tsx) ← NEW!
│   └─→ Standalone form
│
├─→ Dashboard (/dashboard/page.tsx)
│   ├─→ DashboardHeader
│   │   └─→ Logo, Nav, Links
│   │
│   ├─→ UploadModal
│   │   └─→ File handling, SVG icons
│   │
│   ├─→ DocumentList
│   │   └─→ Document array + filtering
│   │
│   ├─→ StatCard (×3)
│   │   └─→ Metric data
│   │
│   ├─→ QuickTips
│   │   └─→ Tips array
│   │
│   └─→ ChatWidget
│       └─→ Link to /chat
│
└─→ Chat (/chat/page.tsx)
    ├─→ ChatHeader
    │   └─→ Status, Links
    │
    ├─→ MessageList
    │   ├─→ Messages array
    │   └─→ Typing indicator
    │
    ├─→ ChatInput
    │   ├─→ Input handling
    │   └─→ 🗑️ Clear button
    │
    └─→ ExamplePrompts
        └─→ Examples array from constants.ts
```

---

## 🎨 Design System Map

### Colors Used
```
┌─────────────────────────────────────────┐
│ Primary Dark Background                  │
│ Color: #080d14 (slate-950 equivalent)   │
│ Used: All page backgrounds              │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Secondary Dark (Glass Effect)            │
│ Color: slate-900/40 with backdrop-blur  │
│ Used: Cards, modals, form containers    │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Accent Color                             │
│ Color: amber-400 (#facc15)              │
│ Used: Buttons, links, hover states      │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Borders (Subtle)                         │
│ Color: slate-700/50                     │
│ Used: Card borders, dividers            │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Text Primary                             │
│ Color: white (#ffffff)                  │
│ Used: Headings, body text               │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Text Secondary                           │
│ Color: slate-400 to slate-500           │
│ Used: Labels, hints, timestamps         │
└─────────────────────────────────────────┘
```

### Component Style Pattern
```
┌─────────────────────────────────┐
│  Input Fields Pattern            │
├─────────────────────────────────┤
│ bg-slate-800/50                 │
│ border border-slate-700         │
│ rounded-xl                      │
│ focus:border-amber-400/50       │
│ focus:ring-1 ring-amber-400/20  │
│ transition-all 200ms            │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│  Button Pattern                  │
├─────────────────────────────────┤
│ bg-amber-400                    │
│ hover:bg-amber-300              │
│ text-slate-900                  │
│ py-3 px-4                       │
│ rounded-xl                      │
│ font-bold                       │
│ transition-all 200ms            │
│ disabled:bg-slate-700           │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│  Card Pattern                    │
├─────────────────────────────────┤
│ backdrop-blur-xl                │
│ bg-slate-900/40                 │
│ border border-slate-700/50      │
│ rounded-2xl                     │
│ shadow-2xl shadow-black/50      │
│ p-6 to p-8                      │
└─────────────────────────────────┘
```

---

## 📊 Data Flow

### Chat Page Flow
```
User Input
    ↓
ChatInput Component
    ↓
handleSubmit()
    ↓
Add to messages state
    ↓
MessageList renders
    ↓
Auto-scroll trigger
    ↓
Show typing indicator
    ↓
Simulate AI response (setTimeout)
    ↓
Add response to messages
    ↓
User sees reply
```

### Dashboard Upload Flow
```
User drags file
    ↓
UploadModal detects drag
    ↓
Select project
    ↓
Click upload
    ↓
Progress tracking starts
    ↓
File "uploads" (simulated)
    ↓
Modal closes
    ↓
DocumentList updates (mock)
    ↓
User sees new document
```

### Auth Flow
```
User clicks button
    ↓
Toggle isLogin state
    ↓
Form fields change (name appears/hides)
    ↓
User fills form
    ↓
Click submit
    ↓
handleSubmit() called
    ↓
Show loading spinner
    ↓
Simulate API call (1s delay)
    ↓
Hide spinner
    ↓
Log to console
```

---

## 🔐 Type System Overview

### Key TypeScript Interfaces

```typescript
// Dashboard Types
interface Document {
  id: string;
  name: string;
  type: 'spec' | 'requirements' | 'ux-brief';
  date: Date;
  status: 'analyzed' | 'pending' | 'error';
}

interface Stat {
  label: string;
  value: number | string;
  icon: ReactNode;
  color?: string;
}

// Chat Types
interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface ExamplePrompt {
  id: string;
  category: string;
  text: string;
  description?: string;
}

// Auth Types
interface AuthFormData {
  email: string;
  password: string;
  name?: string;
  rememberMe?: boolean;
}
```

---

## 📈 Project Metrics

```
┌──────────────────────────────┐
│     Code Statistics          │
├──────────────────────────────┤
│ Total Files:        30+      │
│ Total Lines:       3000+     │
│ React Components:     20     │
│ TypeScript Files:      3     │
│ Documentation:         8     │
│ Errors:                0 ✅  │
│                              │
│ By Phase:                    │
│ Phase 1: 1 component        │
│ Phase 2: 8 components       │
│ Phase 3: 4 components       │
│ Phase 4: 1 component        │
└──────────────────────────────┘

┌──────────────────────────────┐
│   Build Information          │
├──────────────────────────────┤
│ Framework:   Next.js 16.2.3  │
│ Build Tool:  Turbopack       │
│ TypeScript:  5.x             │
│ CSS:         Tailwind CSS    │
│ Build Time:  ~3 seconds      │
│ Routes:      4 pages         │
│ Status:      ✅ Ready        │
└──────────────────────────────┘
```

---

## 🎯 Future Expansion Points

```
Potential Extensions:

1. State Management
   ├─→ Redux / Zustand for global state
   └─→ Context API for auth state

2. API Layer
   ├─→ TanStack Query for server state
   ├─→ Axios for HTTP client
   └─→ WebSocket for real-time chat

3. Testing
   ├─→ Jest for unit tests
   ├─→ React Testing Library
   └─→ Playwright for e2e

4. Additional Pages
   ├─→ /profile
   ├─→ /settings
   └─→ /analytics

5. UI Enhancements
   ├─→ Dark/Light theme
   ├─→ i18n (multi-language)
   └─→ Animations library
```

---

**Architecture designed for scalability and maintainability** ✨
