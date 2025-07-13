# 🎮 Bubbly Chat - Discord Clone

<div align="center">
  <img src="app-icon.png" alt="Bubbly Chat Logo" width="120" height="120">
  
  **A modern, full-featured Discord clone built with cutting-edge technologies**
  
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![Tauri](https://img.shields.io/badge/Tauri-FFC131?style=for-the-badge&logo=tauri&logoColor=white)](https://tauri.app/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
  [![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socket.io&logoColor=white)](https://socket.io/)
  [![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
</div>

## 📋 Table of Contents

- [🎯 Overview](#-overview)
- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🏗️ Architecture](#️-architecture)
- [🚀 Getting Started](#-getting-started)
- [📁 Project Structure](#-project-structure)
- [🔧 Configuration](#-configuration)
- [📡 API Documentation](#-api-documentation)
- [🔄 Real-time Features](#-real-time-features)
- [🗄️ Database Schema](#️-database-schema)
- [📱 Desktop Application](#-desktop-application)
- [🎨 UI Components](#-ui-components)
- [🔐 Authentication](#-authentication)
- [📁 File Management](#-file-management)
- [🧪 Testing](#-testing)
- [🚢 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## 🎯 Overview

Bubbly Chat is a feature-rich Discord clone that combines the power of modern web technologies with native desktop performance. Built with Next.js 15, React 19, and Tauri, it offers real-time messaging, voice channels, file sharing, and server management in a beautiful, responsive interface.

### 🌟 Key Highlights

- **Native Desktop App**: Built with Tauri for optimal performance
- **Real-time Communication**: Instant messaging with Socket.IO
- **Modern UI**: Clean, Discord-inspired interface with dark/light themes
- **Full-stack TypeScript**: End-to-end type safety
- **Scalable Architecture**: Microservices-ready design
- **Cross-platform**: Works on Windows, macOS, and Linux

## ✨ Features

### 💬 Messaging

- [x] Real-time text messaging
- [x] Direct messages between users
- [x] Message editing and deletion
- [x] File attachments (images, documents)
- [x] Emoji picker with search
- [x] Message reactions
- [x] Rich text formatting
- [x] Message history and pagination

### 🏠 Servers & Channels

- [x] Create and manage servers
- [x] Text, voice, and video channels
- [x] Channel categories and organization
- [x] Server roles and permissions
- [x] Invite system with custom codes
- [x] Server member management
- [x] Channel-specific permissions

### 👥 User Management

- [x] User authentication (Clerk)
- [x] Custom user profiles
- [x] Online/offline status
- [x] User roles (Admin, Moderator, Guest)
- [x] Server member lists
- [x] User search and discovery

### 🎨 Interface

- [x] Dark/light theme toggle
- [x] Responsive design
- [x] Custom window controls (Tauri)
- [x] Keyboard shortcuts
- [x] Accessible UI components
- [x] Mobile-friendly layout

### 🔧 Advanced Features

- [x] File upload with progress tracking
- [x] Image optimization and CDN
- [x] Search functionality
- [x] Notification system
- [x] Offline support
- [x] Database migrations
- [x] API rate limiting

## 🛠️ Tech Stack

### **Frontend**

- **[Next.js 15](https://nextjs.org/)** - Full-stack React framework with App Router
- **[React 19](https://reactjs.org/)** - UI library with latest features
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[Lucide React](https://lucide.dev/)** - Modern icon library

### **Desktop Application**

- **[Tauri](https://tauri.app/)** - Rust-based desktop app framework
- **Custom Window Controls** - Native window management
- **System Integration** - OS-specific features

### **State Management**

- **[Zustand](https://github.com/pmndrs/zustand)** - Lightweight state management
- **[React Query](https://tanstack.com/query/latest)** - Server state management
- **React Context** - Theme and modal management

### **Backend & Database**

- **[PostgreSQL](https://www.postgresql.org/)** - Relational database
- **[Prisma](https://www.prisma.io/)** - Type-safe database client
- **[Supabase](https://supabase.com/)** - Database hosting

### **Real-time & Communication**

- **[Socket.IO](https://socket.io/)** - Real-time bidirectional communication
- **WebSocket** - Low-latency messaging
- **Server-Sent Events** - Live updates

### **Authentication & Security**

- **[Clerk](https://clerk.com/)** - Complete authentication solution
- **JWT Tokens** - Secure session management
- **Middleware Protection** - Route-level security

### **File Management**

- **[UploadThing](https://uploadthing.com/)** - File upload service
- **Image Processing** - Automatic optimization
- **CDN Distribution** - Global file delivery

### **Development Tools**

- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[PostCSS](https://postcss.org/)** - CSS processing
- **[pnpm](https://pnpm.io/)** - Package manager

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Tauri Desktop Shell                      │
├─────────────────────────────────────────────────────────────┤
│                     Next.js Frontend                       │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────────────────┐ │
│  │  React UI   │ │   Zustand   │ │    React Query Cache    │ │
│  │ Components  │ │    Store    │ │   (Server State)        │ │
│  └─────────────┘ └─────────────┘ └─────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│                    API Layer (Next.js)                     │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────────────────┐ │
│  │ REST Routes │ │ Socket.IO   │ │    Authentication       │ │
│  │   Handler   │ │   Server    │ │    (Clerk + JWT)        │ │
│  └─────────────┘ └─────────────┘ └─────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│                   Database Layer                            │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────────────────┐ │
│  │   Prisma    │ │ PostgreSQL  │ │    File Storage         │ │
│  │    ORM      │ │  Database   │ │   (UploadThing)         │ │
│  └─────────────┘ └─────────────┘ └─────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **pnpm** (recommended) or npm
- **Rust** (for Tauri development)
- **PostgreSQL** database
- **Git**

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/discord-clone.git
   cd discord-clone
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Fill in your environment variables:

   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/discord_clone"
   DIRECT_URL="postgresql://username:password@localhost:5432/discord_clone"

   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
   CLERK_SECRET_KEY="your_clerk_secret_key"

   # UploadThing
   UPLOADTHING_SECRET="your_uploadthing_secret"
   UPLOADTHING_APP_ID="your_uploadthing_app_id"
   ```

4. **Set up the database**

   ```bash
   # Generate Prisma client
   pnpm prisma generate

   # Run database migrations
   pnpm prisma db push

   # (Optional) Seed the database
   pnpm prisma db seed
   ```

5. **Run the development server**

   ```bash
   # Web development
   pnpm dev

   # Desktop development
   pnpm tauri dev
   ```

6. **Build for production**

   ```bash
   # Build web app
   pnpm build

   # Build desktop app
   pnpm tauri build
   ```

## 📁 Project Structure

```
discord-clone/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Authentication routes
│   │   ├── (main)/            # Main application routes
│   │   ├── (setup)/           # Initial setup
│   │   ├── api/               # API routes
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── chat/             # Chat-related components
│   │   ├── modals/           # Modal components
│   │   ├── navigation/       # Navigation components
│   │   ├── providers/        # Context providers
│   │   ├── server/           # Server components
│   │   └── ui/               # Reusable UI components
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utility functions
│   ├── pages/                # Pages API routes
│   └── types.ts              # TypeScript type definitions
├── src-tauri/                # Tauri desktop app
│   ├── src/                  # Rust source code
│   ├── icons/                # App icons
│   └── tauri.conf.json       # Tauri configuration
├── prisma/                   # Database schema and migrations
│   └── schema.prisma         # Database schema
├── api-testing/              # API testing utilities
└── public/                   # Static assets
```

## 🔧 Configuration

### Database Configuration

The application uses PostgreSQL with Prisma ORM. The database schema includes:

- **Users & Profiles**: User authentication and profile management
- **Servers**: Discord server equivalents
- **Channels**: Text, voice, and video channels
- **Messages**: Chat messages and direct messages
- **Members**: Server membership and roles
- **Conversations**: Direct message conversations

### Environment Variables

```env
# Database
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# Authentication (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_..."
CLERK_SECRET_KEY="sk_..."

# File Upload (UploadThing)
UPLOADTHING_SECRET="sk_..."
UPLOADTHING_APP_ID="..."

# Development
NEXT_PUBLIC_SITE_URL="http://localhost:1420"
```

### Tauri Configuration

The desktop app is configured in `src-tauri/tauri.conf.json`:

```json
{
  "build": {
    "beforeDevCommand": "pnpm dev",
    "beforeBuildCommand": "pnpm build",
    "devPath": "http://localhost:1420",
    "distDir": "../dist"
  },
  "tauri": {
    "windows": [
      {
        "title": "Bubbly Chat",
        "width": 1200,
        "height": 850,
        "decorations": false
      }
    ]
  }
}
```

## 📡 API Documentation

### Authentication Endpoints

- `POST /api/auth/sign-in` - User sign in
- `POST /api/auth/sign-up` - User registration
- `POST /api/auth/sign-out` - User sign out

### Server Management

- `GET /api/servers` - Get user servers
- `POST /api/servers` - Create new server
- `PATCH /api/servers/[serverId]` - Update server
- `DELETE /api/servers/[serverId]` - Delete server
- `PATCH /api/servers/[serverId]/invite-code` - Regenerate invite code

### Channel Management

- `GET /api/channels` - Get server channels
- `POST /api/channels` - Create new channel
- `PATCH /api/channels/[channelId]` - Update channel
- `DELETE /api/channels/[channelId]` - Delete channel

### Message Management

- `GET /api/messages` - Get channel messages
- `POST /api/messages` - Send message
- `PATCH /api/messages/[messageId]` - Edit message
- `DELETE /api/messages/[messageId]` - Delete message

### Direct Messages

- `GET /api/direct-messages` - Get direct messages
- `POST /api/direct-messages` - Send direct message

### Member Management

- `GET /api/members/[memberId]` - Get member info
- `PATCH /api/members/[memberId]` - Update member role
- `DELETE /api/members/[memberId]` - Kick member

## 🔄 Real-time Features

### Socket.IO Events

**Client → Server Events:**

- `join-channel` - Join a channel room
- `leave-channel` - Leave a channel room
- `send-message` - Send a message
- `edit-message` - Edit a message
- `delete-message` - Delete a message
- `typing-start` - Start typing indicator
- `typing-stop` - Stop typing indicator

**Server → Client Events:**

- `new-message` - New message received
- `message-edited` - Message was edited
- `message-deleted` - Message was deleted
- `user-joined` - User joined channel
- `user-left` - User left channel
- `typing-start` - Someone started typing
- `typing-stop` - Someone stopped typing

### Real-time Updates

- **Message Delivery**: Instant message delivery with Socket.IO
- **Typing Indicators**: Real-time typing status
- **User Presence**: Online/offline status updates
- **Channel Updates**: Live channel modifications
- **Member Changes**: Real-time member join/leave events

## 🗄️ Database Schema

### Core Tables

**Profile**

```prisma
model Profile {
  id       String @id @default(uuid())
  userId   String @unique
  name     String
  imageUrl String @db.Text
  email    String @db.Text
  servers  Server[]
  members  Member[]
  channels Channel[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

**Server**

```prisma
model Server {
  id         String @id @default(uuid())
  name       String
  imageUrl   String @db.Text
  inviteCode String @unique
  profileId  String
  profile    Profile @relation(fields: [profileId], references: [id], onDelete: Cascade)
  members    Member[]
  channels   Channel[]
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}
```

**Channel**

```prisma
model Channel {
  id        String      @id @default(uuid())
  name      String
  type      ChannelType @default(TEXT)
  profileId String
  profile   Profile @relation(fields: [profileId], references: [id], onDelete: Cascade)
  serverId  String
  server    Server @relation(fields: [serverId], references: [id], onDelete: Cascade)
  messages  Message[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

**Message**

```prisma
model Message {
  id        String  @id @default(uuid())
  content   String  @db.Text
  fileUrl   String? @db.Text
  memberId  String
  member    Member @relation(fields: [memberId], references: [id], onDelete: Cascade)
  channelId String
  channel   Channel @relation(fields: [channelId], references: [id], onDelete: Cascade)
  deleted   Boolean @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Relationships

- **Profile** → **Server** (One-to-Many)
- **Server** → **Channel** (One-to-Many)
- **Channel** → **Message** (One-to-Many)
- **Profile** → **Member** (One-to-Many)
- **Server** → **Member** (One-to-Many)
- **Member** → **Message** (One-to-Many)
- **Member** → **Conversation** (Many-to-Many)

## 📱 Desktop Application

### Tauri Features

- **Native Window Controls**: Custom titlebar and window management
- **System Integration**: OS-specific features and notifications
- **Performance**: Rust backend for optimal performance
- **Security**: Sandboxed execution environment
- **Cross-platform**: Windows, macOS, and Linux support

### Window Management

```rust
// src-tauri/src/main.rs
fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

### Custom Titlebar

The app features a custom titlebar component that integrates with Tauri's window controls:

```tsx
// src/components/titlebar.tsx
export function Titlebar() {
  return (
    <div className="titlebar">
      <div className="titlebar-content">
        <span>Bubbly Chat</span>
      </div>
      <div className="titlebar-controls">{/* Window controls */}</div>
    </div>
  )
}
```

## 🎨 UI Components

### Component Library

Built with **Radix UI** primitives and **Tailwind CSS** for consistent, accessible design:

- **Avatar**: User profile pictures
- **Button**: Interactive buttons with variants
- **Dialog**: Modal dialogs and confirmations
- **Dropdown**: Context menus and selections
- **Input**: Form input fields
- **Scroll Area**: Custom scrollbar styling
- **Tooltip**: Hover information displays

### Theme System

```tsx
// Dark/Light theme toggle
const { theme, setTheme } = useTheme();

return (
  <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
    {theme === 'dark' ? <Sun /> : <Moon />}
  </button>
);
```

### Responsive Design

- **Mobile-first**: Designed for mobile devices first
- **Breakpoints**: Tailwind CSS responsive breakpoints
- **Adaptive Layout**: Components adapt to screen size
- **Touch-friendly**: Optimized for touch interactions

## 🔐 Authentication

### Clerk Integration

The application uses Clerk for complete authentication management:

```tsx
// src/app/layout.tsx
import { ClerkProvider } from "@clerk/nextjs"

export default function RootLayout({ children }) {
  return <ClerkProvider>{children}</ClerkProvider>
}
```

### Authentication Flow

1. **User Registration/Login**: Handled by Clerk
2. **Profile Creation**: Automatic profile creation after auth
3. **Session Management**: JWT tokens for API authentication
4. **Route Protection**: Middleware guards for protected routes

### Middleware Protection

```typescript
// src/middleware.ts
import { clerkMiddleware } from "@clerk/nextjs/server"

export default clerkMiddleware()

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
}
```

## 📁 File Management

### UploadThing Integration

File uploads are handled by UploadThing for optimal performance:

```typescript
// src/app/api/uploadthing/core.ts
import { createUploadthing } from "uploadthing/next"

const f = createUploadthing()

export const ourFileRouter = {
  serverImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      const user = await currentUser()
      if (!user) throw new Error("Unauthorized")
      return { userId: user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId)
      console.log("file url", file.url)
      return { uploadedBy: metadata.userId }
    }),
}
```

### File Types Supported

- **Images**: JPG, PNG, GIF, WebP
- **Documents**: PDF, DOC, DOCX, TXT
- **Archives**: ZIP, RAR
- **Maximum Size**: 4MB per file
- **Processing**: Automatic image optimization

## 🧪 Testing

### Testing Setup

```bash
# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

### Testing Stack

- **Jest**: JavaScript testing framework
- **React Testing Library**: Component testing
- **MSW**: API mocking
- **Playwright**: E2E testing

### Test Structure

```
src/
├── __tests__/
│   ├── components/
│   ├── pages/
│   └── utils/
├── __mocks__/
└── test-utils.ts
```

## 🚢 Deployment

### Web Deployment

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

### Desktop App Distribution

```bash
# Build desktop app
pnpm tauri build

# Output locations:
# - Windows: src-tauri/target/release/bundle/msi/
# - macOS: src-tauri/target/release/bundle/dmg/
# - Linux: src-tauri/target/release/bundle/deb/
```

### Environment Setup

1. **Database**: Set up PostgreSQL database
2. **Authentication**: Configure Clerk
3. **File Storage**: Set up UploadThing
4. **Domain**: Configure domain and SSL

### Deployment Platforms

- **Vercel**: Recommended for Next.js apps
- **Netlify**: Alternative hosting platform
- **Railway**: Full-stack deployment
- **Self-hosted**: VPS or dedicated server

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Write tests for new features
- Follow the existing code style
- Update documentation as needed
- Use conventional commit messages

### Code Style

- **ESLint**: Linting rules
- **Prettier**: Code formatting
- **TypeScript**: Type safety
- **Tailwind**: Utility-first CSS

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>Built with ❤️ by the Bubbly Chat team</p>
  <p>
    <a href="https://github.com/your-username/discord-clone">GitHub</a> •
    <a href="https://discord.gg/your-discord">Discord</a> •
    <a href="https://twitter.com/your-twitter">Twitter</a>
  </p>
</div>
