# 🏗️ Архитектура TZ·AI

## 📊 Общая структура приложения

```
┌─────────────────────────────────────────────────────────────┐
│                    TZ·AI Application                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐  │
│  │   Home (/)   │    │ Dashboard(/  │    │   Chat (/   │  │
│  │              │    │  dashboard)  │    │    chat)     │  │
│  │ • Лендинг    │    │              │    │              │  │
│  │ • Hero       │    │ • Upload     │    │ • History    │  │
│  │ • CTA        │    │ • List docs  │    │ • Examples   │  │
│  │ • Nav        │    │ • Stats      │    │ • Input      │  │
│  │ • Features   │    │ • Tips       │    │ • Clear btn  │  │
│  └──────────────┘    │ • Chat       │    └──────────────┘  │
│                      │   widget     │                       │
│                      └──────────────┘                       │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## 🔗 Навигация между страницами

```
Home (/)
├─ Header "📊 Дашборд" → /dashboard
├─ Header "💬 Чат" → /chat
├─ Card button → /dashboard
├─ Card button → /chat
├─ CTA "Начать анализ ТЗ" → /dashboard
└─ CTA "Консультация ИИ" → /chat

Dashboard (/dashboard)
├─ Header "💬 Ассистент" → /chat
├─ ChatWidget "↗" button → /chat
└─ Upload modal (modal overlay)

Chat (/chat)
├─ No external links (but could add)
└─ Back to Home (implied via browser)
```

## 📁 Иерархия компонентов

### Home Page Hierarchy
```
Home (/page.tsx)
├── Header
│   ├── Logo (⚡ TZ·AI)
│   └── Nav (links to /dashboard, /chat)
├── Hero Section
│   ├── Title & Description
│   ├── Feature Cards (2x)
│   │   ├── Dashboard Card
│   │   └── Chat Card
│   └── CTA Buttons (2x)
└── Footer
```

### Dashboard Hierarchy
```
Dashboard (/dashboard/page.tsx)
├── DashboardHeader
│   ├── Branding (⚡ TZ·AI)
│   ├── Nav Button "💬 Ассистент" → /chat
│   └── User Profile
├── StatCard × 4
│   ├── Documents count
│   ├── Analyzed count
│   ├── Average score
│   └── Issues found
├── DocumentList
│   ├── Search input
│   ├── Filter dropdown
│   └── Document rows (6x)
│       ├── Format icon
│       ├── Document info
│       └── Score ring
├── QuickTips
│   └── Tips cards (3x)
├── ChatWidget (fixed bottom-right)
│   ├── Header with "↗" button → /chat
│   ├── Message list
│   └── Input + send button
└── UploadModal (overlay)
    ├── File drop zone
    ├── Project type selector
    └── Progress bar
```

### Chat Page Hierarchy
```
ChatPage (/chat/page.tsx)
├── ChatHeader
│   ├── Avatar (🤖)
│   ├── Status (online/processing)
│   └── Message counter
├── Main Content (conditional)
│   ├── IF messages.length === 1:
│   │   └── ExamplePrompts
│   │       ├── Rules section (4 examples)
│   │       └── Improve section (2 examples)
│   └── ELSE:
│       └── MessageList
│           ├── User messages (amber)
│           ├── Assistant messages (slate)
│           └── Typing indicator (3 dots)
└── ChatInput
    ├── Textarea (multiline)
    ├── Send button (with spinner)
    ├── Clear button (🗑️)
    └── Character counter
```

## 🎛️ Component Tree (React)

```
<RootLayout>
  <body>
    ┌─────────────────────────────────────────┐
    │         Home, Dashboard, or Chat        │
    │                 Route                   │
    └─────────────────────────────────────────┘
    
    // Route: /
    <Home>
      <Header />
      <HeroSection />
      <FeatureCards>
        <DashboardCard />
        <ChatCard />
      </FeatureCards>
      <Footer />
    </Home>
    
    // Route: /dashboard
    <Dashboard>
      <DashboardHeader />
      <StatCard icon="📊" />
      <StatCard icon="✅" />
      <StatCard icon="📈" />
      <StatCard icon="⚠️" />
      <DocumentList />
      <QuickTips />
      <ChatWidget /> {/* floating */}
      <UploadModal /> {/* overlay */}
    </Dashboard>
    
    // Route: /chat
    <ChatPage>
      <ChatHeader />
      <MainContent>
        {messages.length === 1 ? (
          <ExamplePrompts />
        ) : (
          <MessageList />
        )}
      </MainContent>
      <ChatInput />
    </ChatPage>
  </body>
</RootLayout>
```

## 💾 Data Flow

### Chat Page Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│ User Action                                                  │
└──────────────────────────┬──────────────────────────────────┘
                          │
                ┌─────────▼─────────┐
                │  handleSendMessage│
                └────────┬──────────┘
                        │
        ┌───────────────┼───────────────┐
        │               │               │
    ┌───▼──────┐  ┌────▼────┐  ┌──────▼──┐
    │ Add User  │  │ Set      │  │ Schedule│
    │ Message   │  │ isLoading│  │ Bot Msg │
    │ to state  │  │= true    │  │ (1.5s)  │
    └───┬──────┘  └────┬────┘  └──────┬──┘
        │              │              │
        └──────────────┼──────────────┘
                      │
        ┌─────────────▼─────────────┐
        │ setMessages([...messages,  │
        │  userMsg])                 │
        └──────────────┬────────────┘
                      │
                      ├─ Renders MessageList
                      ├─ Auto-scrolls
                      └─ Shows typing indicator
                      
         (after 1.5s timeout)
         
        ┌─────────────────────────┐
        │ Add Bot Response to      │
        │ state + set isLoading=   │
        │ false                    │
        └──────────────┬──────────┘
                      │
        ┌─────────────▼─────────────┐
        │ setMessages([...messages,  │
        │  botMsg])                  │
        └──────────────┬────────────┘
                      │
                      └─ Renders new message
                         with animation
```

### Clear Dialog Flow

```
┌──────────────────────────────┐
│ User clicks 🗑️ button         │
└──────────────┬───────────────┘
              │
    ┌─────────▼─────────┐
    │ window.confirm()   │
    │ "Вы уверены?"      │
    └────────┬───┬──────┘
             │   │
         YES│   │NO
             │   │
    ┌────────▼┐┌┴────────┐
    │ Reset   ││ Cancel  │
    │ state   ││         │
    └────┬───┘└─────────┘
         │
    ┌────▼─────────────┐
    │ setMessages([     │
    │  INITIAL_MESSAGE  │
    │ ])                │
    │ setInput("")      │
    └────┬─────────────┘
         │
         └─ Show examples again
            (messages.length === 1)
```

## 🗂️ File Structure

```
app/
├── page.tsx                                   # Home page
├── layout.tsx                                 # Root layout
├── globals.css                                # Global styles + animations
│
├── dashboard/
│   ├── page.tsx                              # Dashboard page
│   ├── README.md
│   └── components/
│       ├── types.ts                          # TypeScript interfaces
│       ├── constants.ts                      # Mock data
│       ├── helpers.ts                        # Utility functions
│       ├── shared-components.tsx             # Reusable UI components
│       ├── StatCard.tsx
│       ├── DashboardHeader.tsx               # (updated with Link to /chat)
│       ├── DocumentList.tsx
│       ├── QuickTips.tsx
│       ├── ChatWidget.tsx                    # (updated with Link to /chat)
│       └── UploadModal.tsx
│
└── chat/                                      # NEW SECTION
    ├── page.tsx                              # Chat page
    ├── constants.ts                          # Examples, initial message
    ├── README.md
    └── components/
        ├── ChatHeader.tsx                    # Header with status
        ├── ExamplePrompts.tsx                # System prompts (6 examples)
        ├── MessageList.tsx                   # Message history
        └── ChatInput.tsx                     # Input + clear button
```

## 🎯 Key Features per Page

### Home (/)
- [x] Responsive layout
- [x] Hero section with CTA
- [x] Feature cards with descriptions
- [x] Navigation to /dashboard and /chat
- [x] Consistent styling

### Dashboard (/dashboard)
- [x] File upload modal with drag-drop
- [x] Document list with filtering
- [x] Statistics cards
- [x] Quick tips section
- [x] Floating chat widget
- [x] Navigation to /chat

### Chat (/chat) **[NEW]**
- [x] Full-screen chat interface
- [x] Message history with animations
- [x] Example prompts (6 templates in 2 categories)
- [x] **Clear dialog button with confirmation**
- [x] Multiline input support
- [x] Typing indicator
- [x] Auto-scroll functionality
- [x] Character counter
- [x] Responsive design

## 🎨 Design System

### Colors
```
Primary Background:     #080d14
Secondary Background:   #0f1419
Accent Color:          amber-400 (#facc15)
Text Primary:          white
Text Secondary:        slate-400 / slate-500
Border Default:        slate-700
Border Hover:          amber-400/30
User Messages:         amber-400/20 background
Assistant Messages:    slate-800 background
```

### Typography
- Font Family: Arial, Helvetica, sans-serif
- Headings: 3xl-5xl, bold
- Body: sm-lg, regular
- Labels: xs, semibold

### Spacing System
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px

### Border Radius
- Buttons/Cards: 8-12px (rounded-lg to rounded-xl)
- Modal: 16px (rounded-2xl)
- Avatars: Full circle (rounded-full)

### Animations
- Fade-in: 300ms ease-out
- Transitions: 200-300ms
- Bounce: on loading indicators
- Spin: on buttons during loading

## 📊 State Management Strategy

### Local State (per component)
```typescript
// ChatPage
const [messages, setMessages] = useState<ChatMessage[]>()
const [input, setInput] = useState<string>()
const [isLoading, setIsLoading] = useState<boolean>()
const messagesEndRef = useRef<HTMLDivElement>()

// Dashboard
const [chatOpen, setChatOpen] = useState<boolean>()
const [uploadModalOpen, setUploadModalOpen] = useState<boolean>()
const [filterStatus, setFilterStatus] = useState<AnalysisStatus>()
const [search, setSearch] = useState<string>()
```

### Shared Types (across components)
```typescript
// From dashboard/components/types.ts
type AnalysisStatus = "completed" | "processing" | "error" | "pending"
type UploadStage = "idle" | "uploading" | "analyzing" | "done" | "error"
interface ChatMessage { role: "user" | "assistant"; text: string }
```

### Future: Global State (Context/Redux)
```
- Chat history persistence across pages
- User authentication context
- Theme/preferences
- Document upload context
```

## 🔄 Data Integration Points

### Mock Data (Current)
```
dashboard/components/constants.ts
├── mockDocuments (6 items)
├── mockChatHistory (3 messages)
├── PROJECT_TYPES (8 types)
├── FORMAT_META (file colors)

chat/constants.ts
├── EXAMPLE_PROMPTS (6 examples)
├── INITIAL_MESSAGE
└── RESPONSE_SAMPLES (4 responses)
```

### Future API Integrations
1. Upload file → POST /api/upload
2. Analyze document → POST /api/analyze
3. Get chat response → POST /api/chat
4. Save conversation → POST /api/conversations
5. Fetch documents → GET /api/documents

---

**Last Updated:** 14 апреля 2026  
**Status:** ✅ Ready for Development
