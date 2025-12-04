# Vercel Deployment Guide

This guide explains how to deploy the Santa Call UI to Vercel.

## Prerequisites

1. A [Vercel account](https://vercel.com/signup)
2. Your Supabase project configured (see `SUPABASE_SETUP.md`)
3. Google OAuth configured in Supabase (see `GOOGLE_OAUTH_SETUP.md`)

## Deploy to Vercel

### Option 1: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/santa-call-ui)

### Option 2: Manual Deploy via Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import your Git repository
4. Configure the project settings (Next.js will be auto-detected)
5. Add environment variables (see below)
6. Click **"Deploy"**

### Option 3: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy (follow prompts)
vercel

# Deploy to production
vercel --prod
```

## Environment Variables Setup

### Required Environment Variables

You **must** configure these environment variables in Vercel:

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | `https://xxxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous/public key | `eyJhbGciOiJIUzI1NiIs...` |

### How to Add Environment Variables in Vercel

1. Go to your project in [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable:
   - Click **"Add New"**
   - Enter the **Key** (e.g., `NEXT_PUBLIC_SUPABASE_URL`)
   - Enter the **Value** (your actual Supabase URL)
   - Select environments: ✅ Production, ✅ Preview, ✅ Development
   - Click **"Save"**
4. Repeat for `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Where to Find Your Supabase Credentials

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Navigate to **Settings** → **API**
4. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Post-Deployment Configuration

### Update Supabase Redirect URLs

After deploying to Vercel, you need to update Supabase to allow redirects from your new domain:

1. Go to [Supabase Dashboard](https://app.supabase.com) → Your Project
2. Navigate to **Authentication** → **URL Configuration**
3. Update **Site URL** to your Vercel domain (e.g., `https://santa-call-ui.vercel.app`)
4. Add your production callback URL to **Redirect URLs**:
   - `https://your-vercel-domain.vercel.app/auth/callback`
   - If using a custom domain: `https://yourdomain.com/auth/callback`

### Update Google OAuth Redirect URIs

If using Google OAuth, update the allowed redirect URIs in Google Cloud Console:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** → **Credentials**
3. Edit your OAuth 2.0 Client
4. Add to **Authorized redirect URIs**:
   - `https://your-supabase-project.supabase.co/auth/v1/callback`

## Vercel Project Settings

### Recommended Settings

- **Framework Preset**: Next.js (auto-detected)
- **Build Command**: `next build` (default)
- **Output Directory**: `.next` (default)
- **Install Command**: `npm install` (default)

### Custom Domain (Optional)

1. Go to **Settings** → **Domains**
2. Add your custom domain
3. Follow DNS configuration instructions
4. Don't forget to update Supabase redirect URLs!

## Troubleshooting

### "Missing environment variables" error

- Ensure both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set
- Variables starting with `NEXT_PUBLIC_` are exposed to the browser (this is intentional for Supabase anon key)

### Authentication redirect issues

- Verify your Vercel domain is added to Supabase's **Redirect URLs**
- Ensure the **Site URL** in Supabase matches your production URL
- Check that Google OAuth has the correct redirect URI

### Build failures

```bash
# Test locally with production build
npm run build
npm start
```

## Environment Variable Security

- `NEXT_PUBLIC_*` variables are exposed to the browser - this is safe for Supabase anon keys
- The anon key only allows operations permitted by your Row Level Security (RLS) policies
- Never expose your Supabase `service_role` key in frontend code

## Quick Reference

```bash
# Local development
cp .env.example .env.local
# Edit .env.local with your values
npm run dev

# Production deployment
vercel --prod
```

