# 🎮 Bubbly Chat - Discord Clone

A modern, feature-rich Discord clone built with Next.js 15, Tauri, and modern web technologies. Experience real-time messaging, server management, and voice/video capabilities in a sleek desktop application.

<div align="center">
  <img src="./app-icon.png" alt="Bubbly Chat Logo" width="128" height="128" >
</div>

## ✨ Features

- **🏠 Server Management**: Create, manage, and customize Discord-like servers
- **📝 Real-time Messaging**: Instant messaging with Socket.IO integration
- **👥 User Roles**: Admin, Moderator, and Guest roles with proper permissions
- **🔊 Channel Type**: Text channels
- **💬 Direct Messages**: Private conversations between users
- **📎 File Sharing**: Upload and share images and PDFs
- **🎨 Modern UI**: Beautiful interface with light/dark mode support
- **🔐 Secure Authentication**: Clerk authentication with user management
- **🖥️ Desktop App**: Native desktop experience with Tauri

## 🛠️ Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons
- **Zustand** - State management

### Backend & Database

- **Prisma** - Database ORM
- **PostgreSQL** - Database (via Supabase)
- **Clerk** - Authentication and user management
- **Socket.IO** - Real-time communication
- **UploadThing** - File upload handling

### Desktop

- **Tauri** - Cross-platform desktop app framework
- **Rust** - Backend runtime for Tauri

### Real-time Features

- **Socket.IO** - Real-time messaging

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- Rust (for Tauri)
- PostgreSQL database (we recommend Supabase)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/limelight-hub/discord-desktop
   cd discord-desktop
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

   ```env
   # Database
   DATABASE_URL="your-postgresql-url"
   DIRECT_URL="your-postgresql-direct-url"

   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your-clerk-publishable-key"
   CLERK_SECRET_KEY="your-clerk-secret-key"

   # UploadThing
   UPLOADTHING_SECRET="your-uploadthing-secret"
   UPLOADTHING_APP_ID="your-uploadthing-app-id"
   UPLOADTHING_TOKEN="your-uploadthing-token"
   ```

4. **Set up the database**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**

   ```bash
   # For web development
   pnpm run dev

   # For desktop app development
   npm run tauri dev
   ```

6. **Build for production**

   ```bash
   # Build web version
   pnpm run build

   # Build desktop app
   npm run tauri build
   ```

## 📁 Project Structure

```
discord-clone/
├── src/
│   ├── app/                    # Next.js 15 App Router
│   │   ├── (auth)/            # Authentication routes
│   │   ├── (main)/            # Main application routes
│   │   ├── (setup)/           # Initial setup
│   │   └── api/               # API routes
│   │       ├── servers/       # Server management
│   │       ├── channels/      # Channel operations
│   │       ├── messages/      # Message handling
│   │       ├── members/       # Member management
│   │       └── uploadthing/   # File upload
│   ├── components/            # Reusable UI components
│   │   ├── ui/               # Radix UI components
│   │   ├── modals/           # Modal dialogs
│   │   ├── chat/             # Chat-related components
│   │   ├── server/           # Server sidebar components
│   │   └── navigation/       # Navigation components
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utility functions
│   └── middleware.ts         # Clerk middleware
├── src-tauri/                # Tauri desktop app
│   ├── src/                  # Rust source code
│   ├── icons/                # App icons
│   └── tauri.conf.json       # Tauri configuration
├── prisma/
│   └── schema.prisma         # Database schema
└── package.json
```

## 🎯 API Endpoints

### Servers

- `POST /api/servers` - Create a new server
- `PATCH /api/servers/[serverId]` - Update server details
- `DELETE /api/servers/[serverId]` - Delete server
- `PATCH /api/servers/[serverId]/invite-code` - Regenerate invite code
- `PATCH /api/servers/[serverId]/leave` - Leave server

### Channels

- `PATCH /api/channels/[channelId]` - Update channel
- `DELETE /api/channels/[channelId]` - Delete channel

### Messages

- `GET /api/messages` - Get paginated messages
- `GET /api/direct-messages` - Get direct messages

### Members

- `PATCH /api/members/[memberId]` - Update member role
- `DELETE /api/members/[memberId]` - Remove member

### File Upload

- `POST /api/uploadthing` - Handle file uploads

For detailed API documentation, see [API_DOCS.md](API_DOCS.md).

## 🔧 Database Management

### Reset Database

```bash
# Reset and recreate database
rm -rf prisma/migrations
rm -rf src/generated
npx prisma migrate reset
npx prisma migrate dev --name init
npx prisma generate
npx prisma db push
```

### View Database

```bash
# Open Prisma Studio
npx prisma studio
```

## 🌟 Key Features Detail

### Server Management

- Create and customize servers with names and images
- Invite system with unique codes
- Role-based permissions (Admin, Moderator, Guest)

### Channel System

- Text channels for messaging
- Audio/Video channels for voice communication
- Channel-specific permissions

### Real-time Communication

- Instant messaging with Socket.IO
- Message history and pagination
- File sharing (images and PDFs)

### User Management

- Clerk authentication integration
- User profiles with avatars
- Direct messaging between users

## 🎨 UI/UX

- Modern, Discord-inspired design
- Light and dark theme support
- Responsive layout for different screen sizes
- Smooth animations and transitions

## 🚀 Deployment

### Desktop App

```bash
npm run tauri build
```

### Web App

```bash
pnpm run build
```

The built files will be in the `dist/` directory.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Tauri](https://tauri.app/) - Desktop app framework
- [Clerk](https://clerk.com/) - Authentication
- [Prisma](https://www.prisma.io/) - Database ORM
- [Radix UI](https://www.radix-ui.com/) - UI components
- [Tailwind CSS](https://tailwindcss.com/) - Styling
