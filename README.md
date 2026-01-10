# 🏆 CP Hub - Competitive Programming Contest Tracker

A dark, hacker-themed dashboard that aggregates competitive programming contests from all major platforms (Codeforces, LeetCode, CodeChef, AtCoder, HackerRank, TopCoder) and displays your ratings in one unified view.

## Features

- 🔐 **Authentication**: Email/password and Google OAuth login
- 📊 **Contest Tracking**: View all contests from major CP platforms
- 🎯 **Filter & Search**: Filter by platform, status, and search contests
- 📈 **Dashboard**: Track your ratings across platforms
- 🔔 **Reminders**: Set reminders for upcoming contests
- 🌙 **Dark Terminal Theme**: Beautiful hacker-inspired UI

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or bun
- Supabase account (free tier works)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/manuaishika/contesttracker.git
cd contesttracker
```

2. Install dependencies:
```bash
npm install
```

3. Set up Supabase:
   - Go to [supabase.com](https://supabase.com) and create a free account
   - Create a new project
   - Go to Settings → API and copy your Project URL and anon/public key

4. Create `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your-project-url-here
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

5. Enable Google OAuth in Supabase:
   - Go to Authentication → Providers in your Supabase dashboard
   - Enable Google provider
   - Add your Google OAuth credentials (Client ID and Secret)
   - Add `http://localhost:5173` to authorized redirect URLs

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS with custom dark theme
- **Routing**: React Router v6
- **Authentication**: Supabase (Email/Password + Google OAuth)
- **UI Components**: Custom shadcn/ui-inspired components
- **Fonts**: JetBrains Mono (terminal aesthetic)

## Project Structure

```
src/
├── components/       # React components
│   ├── contests/    # Contest-related components
│   ├── dashboard/   # Dashboard components
│   ├── home/        # Homepage components
│   ├── layout/      # Layout components (Navbar, etc.)
│   └── ui/          # Reusable UI components
├── contexts/        # React contexts (Auth, etc.)
├── hooks/           # Custom React hooks
├── lib/             # Utilities and configurations
├── pages/           # Page components
└── App.tsx          # Main app component
```

## Authentication

The app supports:
- **Email/Password**: Traditional sign up and login
- **Google OAuth**: One-click Google authentication
- **Codeforces Linking**: Link your Codeforces account (manual handle entry)

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

MIT License - feel free to use this project for your own purposes.
