# Environment Variables Setup

## Quick Setup for Your Supabase Project

Your Supabase project ID: `gzucxffekdhheszunvdy`
Your project URL: `https://gzucxffekdhheszunvdy.supabase.co`

### Step 1: Get Your API Keys from Supabase Dashboard

Supabase has updated their key names! They now use:
- **Publishable Key** (replaces "anon" key) - Safe for frontend/client-side
- **Secret Key** (replaces "service_role" key) - MUST stay secret, server-side only

1. Go to your Supabase project: https://supabase.com/dashboard/project/gzucxffekdhheszunvdy
2. Click on **Settings** (gear icon) in the left sidebar  
3. Click on **API** in the settings menu
4. Look for these sections:
   - **Project URL**: Should be `https://gzucxffekdhheszunvdy.supabase.co`
   - **Project API keys**:
     - **Publishable key** (or "anon public" if using legacy): A long JWT token starting with `eyJ...`
     - **Secret key** (or "service_role" if using legacy): Another JWT token (DO NOT use in frontend!)

### Step 2: Create .env File

In your project root directory (`c:\Users\Aishika\projects\contesttracker`), create a file named `.env` with this content:

```env
VITE_SUPABASE_URL=https://gzucxffekdhheszunvdy.supabase.co
VITE_SUPABASE_ANON_KEY=your-publishable-key-from-dashboard
```

**Important Notes:**
- Use the **Publishable key** (or "anon public" key) from your dashboard
- The key should be a **long JWT token starting with `eyJ...`**
- Keys typically look like: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6dWN4ZmZla2RoaGVzenVudmR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY1NDk2MDAsImV4cCI6MjA1MjEyNTYwMH0...`
- **NEVER** put the Secret key in `.env` - it's only for server-side use!

**⚠️ Important:** The keys you mentioned (`sb_publishable_` and `sb_secret_`) are NOT the actual API keys. Those look like key identifiers or placeholders. You need to:
1. Go to your Supabase dashboard → Settings → API
2. Look for the **actual key values** (long JWT tokens starting with `eyJ...`)
3. Copy those values, not the prefixes or IDs

### Step 3: Restart Dev Server

After creating the `.env` file:

```bash
# Stop the current dev server (Ctrl+C)
# Then restart it
npm run dev
```

### Step 4: Verify It Works

1. Go to your app: http://localhost:5173
2. Try signing up with email/password
3. Check Supabase dashboard → **Authentication** → **Users** to see if user was created

## Troubleshooting

### If authentication doesn't work:
- Make sure `.env` file is in the root directory (same folder as `package.json`)
- Check that the keys don't have extra spaces or quotes
- Restart your dev server after creating/updating `.env`
- Check browser console for any Supabase connection errors

### If you see "Invalid API key":
- Make sure you're using the **anon public** key, not the service_role key
- The key should start with `eyJ...`
- Verify you copied it correctly from Supabase dashboard

## Next Steps

After setting up the `.env` file:
1. Run the SQL queries from `SUPABASE_SETUP.md` to create database tables
2. Enable OAuth providers (Google, GitHub) if you want them
3. Test authentication flows
