# 🏆 CP Hub - Competitive Programming Contest Tracker

A dark, hacker-themed dashboard that aggregates competitive programming contests from all major platforms and displays your ratings in one unified view.

## Quick Start

```bash
npm install
# Create .env file with your Supabase keys (see below)
npm run dev
```

## Setup

1. **Create `.env` file**:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

2. **Run `DATABASE_SETUP.sql`** in Supabase SQL Editor to create all tables

3. **Set yourself as admin** (after creating your account):
   ```sql
   UPDATE profiles SET is_admin = true WHERE id = 'your-user-id-here';
   ```

4. **Enable OAuth** (optional): Google, GitHub in Supabase Authentication → Providers

## Features

- 📊 **Contest Tracking**: 6 platforms (Codeforces, LeetCode, AtCoder, CodeChef, HackerRank, TopCoder)
- 🔐 **Authentication**: Email/Password, Google, GitHub OAuth
- 📈 **Dashboard**: Personal dashboard with reminders (preview for guests)
- 🔔 **Reminders**: Set reminders for contests (requires login)
- ❤️ **Favorites**: Bookmark favorite contests (requires login)
- 👑 **Admin Dashboard**: View user stats, platform distribution (`/admin` - admin only)

## Current Status

### ✅ Working
- Contest fetching from Codeforces API + mock data for all platforms
- Authentication (Email/Password, Google, GitHub)
- Reminders and favorites saving to Supabase (requires login)
- Admin dashboard (shows user stats, platform distribution)
- Dark terminal-themed UI with responsive design

### 🔧 Needs Setup
- Run `DATABASE_SETUP.sql` in Supabase (creates tables)
- Set yourself as admin (see SQL above)
- Test API endpoints for AtCoder/CodeChef

### ⚠️ Not Yet Implemented
- Platform linking functionality (UI exists, needs implementation)
- Real rating fetching from platform APIs
- Rating history tracking
- Profile editing page
- Calendar export for reminders
- Email notifications

## Admin Dashboard

Visit `/admin` (admin only) to see:
- Total users count
- Active users (last 30 days)
- Total reminders and favorites
- Platform distribution
- Recent users list

**How to become admin**: After creating your account, run this SQL in Supabase:
```sql
UPDATE profiles SET is_admin = true WHERE id = 'your-user-id-here';
```

## Tech Stack

React 18 + TypeScript + Vite + Tailwind CSS + Supabase

---

**Status**: Core functionality works. Needs database setup for full functionality.
