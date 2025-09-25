# 🚀 Vercel Deployment Guide

## Environment Variables Setup

### 1. Di Vercel Dashboard:
1. Buka project di Vercel Dashboard
2. Go to **Settings** > **Environment Variables**
3. Add these variables:

```
NEXT_PUBLIC_SUPABASE_URL = https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 2. Di Local Development:
1. Copy `.env.example` to `.env.local`
2. Fill in your actual Supabase values:

```bash
cp .env.example .env.local
```

Then edit `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Deployment Steps

### Option 1: Via Git Push
```bash
git add .
git commit -m "Fix environment variables for Vercel"
git push origin main
```

### Option 2: Via Vercel CLI
```bash
npm i -g vercel
vercel --prod
```

## Troubleshooting

### Common Issues:
1. **Environment variables not found** - Make sure they're set in Vercel Dashboard
2. **Build fails** - Check build logs in Vercel
3. **Supabase connection fails** - Verify URL and key are correct

### Check Environment Variables:
- Go to Vercel Dashboard > Project > Settings > Environment Variables
- Make sure both variables are set for all environments (Production, Preview, Development)
- Redeploy after adding variables

## Supabase Setup

Make sure your Supabase project has:
1. ✅ Database tables created (profiles, recipes, bookmarks, ratings, comments)
2. ✅ RLS policies enabled
3. ✅ Authentication enabled
4. ✅ CORS configured for your domain
