# OAuth Setup Instructions

## Google OAuth Setup

The error "Unsupported provider: provider is not enabled" means Google OAuth is not configured in Supabase.

### Steps to Fix:

1. **Go to Supabase Dashboard**
   - Visit https://supabase.com/dashboard
   - Select your project

2. **Enable Google Provider**
   - Go to **Authentication** → **Providers**
   - Find **Google** in the list
   - Toggle it **ON**

3. **Get Google OAuth Credentials**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Go to **APIs & Services** → **Credentials**
   - Click **Create Credentials** → **OAuth client ID**
   - Application type: **Web application**
   - Authorized redirect URIs: Add these:
     ```
     https://gzucxffekdhheszunvdy.supabase.co/auth/v1/callback
     http://localhost:5173/dashboard
     ```
   - Copy the **Client ID** and **Client Secret**

4. **Add Credentials to Supabase**
   - Back in Supabase → **Authentication** → **Providers** → **Google**
   - Paste your **Client ID** and **Client Secret**
   - Click **Save**

5. **Test**
   - Try signing in with Google again
   - It should work now!

## Codeforces Linking

Codeforces **does NOT support OAuth**. You cannot sign in with Codeforces.

Instead, users can:
1. Sign up/login with email or Google
2. Go to Dashboard
3. Click "Link Platform" button
4. Enter their Codeforces handle
5. The app will fetch their ratings and contest history

This is already implemented in the code - the "Link Codeforces Handle" button just shows a message explaining this.
