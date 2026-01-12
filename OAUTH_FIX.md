# Fixing Google OAuth & Codeforces Linking

## Google OAuth Error: "Unsupported provider"

The error you're seeing means Google OAuth is not enabled in your Supabase project.

### How to Fix:

1. **Go to Supabase Dashboard** → Your Project
2. **Click "Authentication"** in the left sidebar
3. **Click "Providers"**
4. **Find "Google"** and click to expand
5. **Toggle "Enable Google provider"** to ON
6. **Add your Google OAuth credentials:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project (or use existing)
   - Enable Google+ API
   - Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
   - Application type: "Web application"
   - Authorized redirect URIs: Add this:
     ```
     https://gzucxffekdhheszunvdy.supabase.co/auth/v1/callback
     ```
     (Replace with your actual Supabase project URL)
   - Copy the **Client ID** and **Client Secret**
   - Paste them into Supabase Google provider settings
7. **Save** in Supabase

### For Local Development:
Also add this redirect URI in Google Cloud Console:
```
http://localhost:5173/auth/callback
```

## Codeforces Linking

**Codeforces does NOT have OAuth** - it's not supported by Codeforces.

### Solution:
Users need to manually link their Codeforces handle:
1. User signs up/logs in with email/password or Google
2. Go to Dashboard → Settings
3. Enter their Codeforces handle manually
4. The app will fetch their rating using Codeforces API

The "Link Codeforces" button on login page now shows a message explaining this.

## Testing OAuth

After enabling Google OAuth:
1. Restart your dev server
2. Try signing in with Google
3. It should redirect to Google login, then back to your app

## Other OAuth Providers

You can also enable:
- **GitHub** (already in code, just needs to be enabled in Supabase)
- **Discord** (if you want to add it)
- **Twitter/X** (if you want to add it)

All follow the same pattern - enable in Supabase → add credentials → test!
