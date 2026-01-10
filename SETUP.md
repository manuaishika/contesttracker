# Supabase Setup Guide

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in your project details:
   - Name: `contesttracker` (or any name)
   - Database Password: (choose a strong password)
   - Region: (choose closest to you)
5. Click "Create new project" and wait for it to be ready (2-3 minutes)

## Step 2: Get API Keys

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following:
   - **Project URL** (something like `https://xxxxx.supabase.co`)
   - **anon/public key** (long string starting with `eyJ...`)

## Step 3: Create Environment File

1. In your project root, create a file named `.env`
2. Add the following:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Replace with your actual values from Step 2.

## Step 4: Set Up Google OAuth (Optional but Recommended)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Go to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth client ID**
5. Configure consent screen if prompted:
   - User Type: External
   - App name: CP Hub
   - Support email: (your email)
   - Developer contact: (your email)
6. Create OAuth client ID:
   - Application type: Web application
   - Name: CP Hub
   - Authorized redirect URIs: 
     - `http://localhost:5173`
     - `https://your-project-id.supabase.co/auth/v1/callback`
7. Copy the **Client ID** and **Client Secret**

## Step 5: Enable Google Provider in Supabase

1. In Supabase dashboard, go to **Authentication** → **Providers**
2. Find **Google** and click to expand
3. Toggle **Enable Google provider**
4. Enter your Google OAuth:
   - **Client ID (for OAuth)**: (paste from Step 4)
   - **Client Secret (for OAuth)**: (paste from Step 4)
5. Click **Save**

## Step 6: Configure Database (Optional)

The app will work with default Supabase auth tables. If you want to store additional user data:

1. Go to **SQL Editor** in Supabase
2. Run this SQL to create a profiles table:

```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  username TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to read all profiles
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

-- Create policy to allow users to update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);
```

## Step 7: Test Authentication

1. Start your dev server: `npm run dev`
2. Go to `http://localhost:5173`
3. Click "Sign Up" or "Login"
4. Try both email/password and Google OAuth
5. Check Supabase dashboard → **Authentication** → **Users** to see created users

## Troubleshooting

### Google OAuth not working?
- Make sure redirect URIs are correctly set in Google Cloud Console
- Check that the redirect URI includes `https://your-project-id.supabase.co/auth/v1/callback`
- Verify Client ID and Secret are correct in Supabase

### Can't connect to Supabase?
- Verify your `.env` file has correct values
- Make sure `.env` is in the root directory (same level as `package.json`)
- Restart your dev server after creating `.env`

### Database errors?
- Make sure you've created the necessary tables (profiles, etc.)
- Check Row Level Security policies are set correctly