# Supabase Integration Guide

This guide will walk you through setting up Supabase as your backend for CP Hub, including authentication, database, and user management.

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click **"Start your project"** or **"Sign In"** if you already have an account
3. Click **"New Project"**
4. Fill in the project details:
   - **Name**: `contesttracker` (or any name you prefer)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose the region closest to you
   - **Pricing Plan**: Free tier is fine for development
5. Click **"Create new project"**
6. Wait 2-3 minutes for your project to be ready

## Step 2: Get Your API Keys

1. In your Supabase project dashboard, go to **Settings** (gear icon in sidebar)
2. Click **API** in the left menu
3. Copy these values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)

## Step 3: Set Up Environment Variables

1. In your project root directory, create a file named `.env`
2. Add the following content:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Important**: Replace the placeholders with your actual values from Step 2!

3. Verify `.env` is in your `.gitignore` (it should be already)

## Step 4: Enable Authentication Providers

### Enable Email/Password (Already enabled by default)

1. Go to **Authentication** → **Providers** in Supabase dashboard
2. Find **Email** provider
3. Make sure it's **Enabled**
4. Configure if needed:
   - Enable "Confirm email" (optional for development)
   - Set email template (optional)

### Enable Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Go to **APIs & Services** → **Credentials**
4. Click **"Create Credentials"** → **"OAuth client ID"**
5. Configure consent screen (if first time):
   - Choose **External** user type
   - App name: `CP Hub`
   - Support email: (your email)
   - Developer contact: (your email)
   - Click **Save and Continue**
   - Scopes: Leave default
   - Test users: Add your email (optional for development)
   - Click **Save and Continue**
6. Create OAuth Client ID:
   - Application type: **Web application**
   - Name: `CP Hub`
   - Authorized JavaScript origins:
     - `http://localhost:5173`
     - `https://your-project-id.supabase.co`
   - Authorized redirect URIs:
     - `https://your-project-id.supabase.co/auth/v1/callback`
   - Click **Create**
7. Copy the **Client ID** and **Client Secret**

### Add Google to Supabase

1. In Supabase dashboard, go to **Authentication** → **Providers**
2. Find **Google** and click to expand
3. Toggle **Enable Google provider**
4. Enter:
   - **Client ID (for OAuth)**: (paste from Google Cloud Console)
   - **Client Secret (for OAuth)**: (paste from Google Cloud Console)
5. Click **Save**

### Enable GitHub OAuth

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click **"New OAuth App"**
3. Fill in:
   - **Application name**: `CP Hub`
   - **Homepage URL**: `http://localhost:5173`
   - **Authorization callback URL**: 
     - `https://your-project-id.supabase.co/auth/v1/callback`
4. Click **"Register application"**
5. Copy the **Client ID**
6. Click **"Generate a new client secret"** and copy it

### Add GitHub to Supabase

1. In Supabase dashboard, go to **Authentication** → **Providers**
2. Find **GitHub** and click to expand
3. Toggle **Enable GitHub provider**
4. Enter:
   - **Client ID**: (paste from GitHub)
   - **Client Secret**: (paste from GitHub)
5. Click **Save**

## Step 5: Set Up Database Tables

1. Go to **SQL Editor** in Supabase dashboard
2. Click **"New query"**
3. Paste this SQL to create the necessary tables:

```sql
-- Create profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create linked_platforms table
CREATE TABLE IF NOT EXISTS linked_platforms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  platform TEXT NOT NULL,
  username TEXT NOT NULL,
  rating INTEGER,
  rank TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, platform)
);

-- Create contest_reminders table
CREATE TABLE IF NOT EXISTS contest_reminders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  contest_id TEXT NOT NULL,
  contest_name TEXT NOT NULL,
  platform TEXT NOT NULL,
  start_time TIMESTAMPTZ NOT NULL,
  url TEXT,
  notified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, contest_id)
);

-- Create contest_favorites table
CREATE TABLE IF NOT EXISTS contest_favorites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  contest_id TEXT NOT NULL,
  contest_name TEXT NOT NULL,
  platform TEXT NOT NULL,
  start_time TIMESTAMPTZ NOT NULL,
  url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, contest_id)
);

-- Create user_statistics table
CREATE TABLE IF NOT EXISTS user_statistics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  total_contests INTEGER DEFAULT 0,
  contests_participated INTEGER DEFAULT 0,
  average_rank INTEGER,
  best_rank INTEGER,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE linked_platforms ENABLE ROW LEVEL SECURITY;
ALTER TABLE contest_reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE contest_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_statistics ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view all profiles"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Create policies for linked_platforms
CREATE POLICY "Users can view their own linked platforms"
  ON linked_platforms FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own linked platforms"
  ON linked_platforms FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own linked platforms"
  ON linked_platforms FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own linked platforms"
  ON linked_platforms FOR DELETE
  USING (auth.uid() = user_id);

-- Create policies for contest_reminders
CREATE POLICY "Users can view their own reminders"
  ON contest_reminders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own reminders"
  ON contest_reminders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reminders"
  ON contest_reminders FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reminders"
  ON contest_reminders FOR DELETE
  USING (auth.uid() = user_id);

-- Create policies for contest_favorites
CREATE POLICY "Users can view their own favorites"
  ON contest_favorites FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own favorites"
  ON contest_favorites FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own favorites"
  ON contest_favorites FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own favorites"
  ON contest_favorites FOR DELETE
  USING (auth.uid() = user_id);

-- Create policies for user_statistics
CREATE POLICY "Users can view their own statistics"
  ON user_statistics FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own statistics"
  ON user_statistics FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own statistics"
  ON user_statistics FOR UPDATE
  USING (auth.uid() = user_id);

-- Create function to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)));
  
  INSERT INTO public.user_statistics (user_id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to call function on new user signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_linked_platforms_updated_at
  BEFORE UPDATE ON linked_platforms
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
```

4. Click **"Run"** to execute the SQL

## Step 6: Test Your Setup

1. Restart your dev server:
   ```bash
   npm run dev
   ```

2. Go to `http://localhost:5173`
3. Click **"Sign Up"**
4. Try creating an account with email/password
5. Try logging in with Google or GitHub (if configured)
6. Check Supabase dashboard → **Authentication** → **Users** to see created users
7. Check **Table Editor** → **profiles** to see user profiles

## Step 7: Verify Database Setup

1. In Supabase dashboard, go to **Table Editor**
2. You should see these tables:
   - `profiles`
   - `linked_platforms`
   - `contest_reminders`
   - `user_statistics`
3. Check that Row Level Security is enabled for all tables

## Troubleshooting

### Can't connect to Supabase?
- Verify your `.env` file has correct values
- Make sure `.env` is in the root directory (same level as `package.json`)
- Restart your dev server after creating `.env`
- Check for typos in the URL and key

### Google OAuth not working?
- Verify redirect URI in Google Cloud Console matches: `https://your-project-id.supabase.co/auth/v1/callback`
- Check that Client ID and Secret are correct in Supabase
- Make sure Google provider is enabled in Supabase

### GitHub OAuth not working?
- Verify callback URL in GitHub settings matches: `https://your-project-id.supabase.co/auth/v1/callback`
- Check that Client ID and Secret are correct in Supabase
- Make sure GitHub provider is enabled in Supabase

### Database errors?
- Make sure you ran all the SQL queries successfully
- Check that triggers and functions were created
- Verify Row Level Security policies are active

### Users not appearing in profiles table?
- Check the trigger `on_auth_user_created` was created
- Verify the function `handle_new_user` exists
- Check Supabase logs for errors

## Next Steps

Once Supabase is set up, you can:
1. Test authentication (email/password, Google, GitHub)
2. Update the app to fetch real user data from database
3. Implement platform linking functionality
4. Add contest reminder functionality
5. Create API endpoints for fetching user statistics

Your backend is now ready to handle real users! 🚀
