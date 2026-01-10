# How to Get Your Supabase JWT Key

## ⚠️ Important: UUID vs JWT Token

The string `c3649bc1-9238-40ec-b3b3-baf3a02bc0ef` you found is **NOT** the JWT key. That's a **UUID** (project ID or key identifier).

**JWT tokens look like this:** They start with `eyJ...` and are much longer, for example:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6dWN4ZmZla2RoaGVzenVudmR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY1NDk2MDAsImV4cCI6MjA1MjEyNTYwMH0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

## Step-by-Step to Get Your Actual JWT Key:

1. **Go to your Supabase Dashboard:**
   - Direct link: https://supabase.com/dashboard/project/gzucxffekdhheszunvdy/settings/api

2. **In the "Project API keys" section, look for:**
   - **"anon"** or **"anon public"** or **"publishable"** key
   - It should be a **long string** (hundreds of characters)
   - It **MUST start with `eyJ...`** (this is the JWT header)

3. **Copy the entire key** (it's very long, make sure you get all of it)

4. **Create your `.env` file:**
   ```env
   VITE_SUPABASE_URL=https://gzucxffekdhheszunvdy.supabase.co
   VITE_SUPABASE_ANON_KEY=paste-the-entire-eyJ-key-here
   ```

## Visual Guide:

When you open the API settings page, you'll see something like:

```
Project URL
https://gzucxffekdhheszunvdy.supabase.co

Project API keys
├─ anon public
│  └─ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6dWN4ZmZla2RoaGVzenVudmR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY1NDk2MDAsImV4cCI6MjA1MjEyNTYwMH0.XXXXX...
│     ^^^ This is what you need - the long token starting with eyJ
│
└─ service_role (DO NOT USE THIS - it's secret!)
```

## Quick Check:

- ✅ **Correct:** Starts with `eyJ`, very long (500+ characters), multiple sections separated by dots
- ❌ **Wrong:** Short UUID like `c3649bc1-9238-40ec-b3b3-baf3a02bc0ef`
- ❌ **Wrong:** Has prefixes like `sb_publishable_` (those are just labels)

## After Getting the Key:

1. Create `.env` file in project root with the correct key
2. Restart dev server: `npm run dev`
3. Try signing up/login - it should work!
