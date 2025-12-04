# Google OAuth Setup Guide

To enable Google sign-in, you need to configure Google OAuth in your Supabase project.

## Steps to Enable Google OAuth

### 1. Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth client ID**
5. Choose **Web application**
6. Add authorized redirect URIs:
   - `https://zxpenxanwyctuxtxmveg.supabase.co/auth/v1/callback`
   - For local development: `http://localhost:3000/auth/callback`
7. Copy the **Client ID** and **Client Secret**

### 2. Configure in Supabase

1. Go to your Supabase project: https://app.supabase.com/project/zxpenxanwyctuxtxmveg
2. Navigate to **Authentication** → **Providers**
3. Find **Google** in the list
4. Click **Enable**
5. Enter your **Client ID** and **Client Secret** from Google Cloud Console
6. Click **Save**

### 3. Configure Redirect URLs

1. In Supabase Dashboard, go to **Authentication** → **URL Configuration**
2. Add your site URLs:
   - **Site URL**: `http://localhost:3000` (for development) or your production URL
   - **Redirect URLs**: 
     - `http://localhost:3000/auth/callback`
     - `https://yourdomain.com/auth/callback` (for production)

## Testing

After configuration:
1. Go to `/login` or `/signup`
2. Click "Continuar con Google"
3. You should be redirected to Google for authentication
4. After approval, you'll be redirected back and logged in

## Notes

- The user's email from Google will be stored in `auth.users.email`
- If you need the father/parent email separately, it should be stored in the `father_email` field in the `santa_calls` table
- Google OAuth users don't need to verify their email (it's already verified by Google)

