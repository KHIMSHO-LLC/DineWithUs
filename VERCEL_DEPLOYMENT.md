# Vercel Deployment Guide with Supabase

## Prerequisites

1. **Supabase Account**: Sign up at [supabase.com](https://supabase.com)
2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
3. **Google OAuth**: Set up Google OAuth credentials

## Step 1: Set up Supabase

### 1.1 Create a new Supabase project
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Choose a name for your project (e.g., "dinewithus")
3. Set a strong database password
4. Choose a region close to your users

### 1.2 Get your Supabase credentials
1. Go to **Settings** → **API** in your Supabase dashboard
2. Copy the following values:
   - **Project URL** (looks like: `https://your-project-id.supabase.co`)
   - **Anon Key** (starts with `eyJ...`)
   - **Service Role Key** (starts with `eyJ...`)

### 1.3 Get your database connection string
1. Go to **Settings** → **Database** in your Supabase dashboard
2. Copy the **Connection string** (URI format)
   - Format: `postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-ID].supabase.co:5432/postgres`

## Step 2: Update Environment Variables

### 2.1 Local Development (.env.local)
```bash
# Database
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-ID].supabase.co:5432/postgres"

# NextAuth.js
NEXTAUTH_SECRET="your-nextauth-secret-here"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### 2.2 Vercel Environment Variables
In your Vercel dashboard, add these environment variables:

1. **DATABASE_URL**: Your Supabase connection string
2. **NEXTAUTH_SECRET**: Generate with `openssl rand -base64 32`
3. **NEXTAUTH_URL**: Your Vercel app URL (e.g., `https://your-app.vercel.app`)
4. **GOOGLE_CLIENT_ID**: Your Google OAuth client ID
5. **GOOGLE_CLIENT_SECRET**: Your Google OAuth client secret

## Step 3: Update Google OAuth Settings

### 3.1 Update Authorized Redirect URIs
In your Google Cloud Console:
1. Go to **APIs & Services** → **Credentials**
2. Edit your OAuth 2.0 Client ID
3. Add these redirect URIs:
   - `https://your-app.vercel.app/api/auth/callback/google`
   - `http://localhost:3000/api/auth/callback/google` (for local development)

## Step 4: Database Setup

### 4.1 Run Prisma migrations
```bash
# Generate Prisma client
npx prisma generate

# Push schema to Supabase
npx prisma db push

# (Optional) Seed the database
npx prisma db seed
```

### 4.2 Verify database connection
```bash
# Check database connection
npx prisma studio
```

## Step 5: Deploy to Vercel

### 5.1 Connect to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Login: `vercel login`
3. Link project: `vercel link`

### 5.2 Deploy
```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### 5.3 Or deploy via GitHub
1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Vercel will automatically deploy on every push

## Step 6: Post-Deployment

### 6.1 Update Google OAuth (if needed)
1. Go to Google Cloud Console
2. Update the authorized redirect URI with your actual Vercel URL

### 6.2 Test the application
1. Visit your Vercel app URL
2. Test Google OAuth sign-in
3. Test role selection
4. Test all major features

## Troubleshooting

### Common Issues

1. **Database connection errors**: Check your DATABASE_URL format
2. **Google OAuth errors**: Verify redirect URIs are correct
3. **NextAuth errors**: Ensure NEXTAUTH_SECRET is set
4. **Build errors**: Check that all environment variables are set in Vercel

### Environment Variables Checklist

- [ ] DATABASE_URL (Supabase connection string)
- [ ] NEXTAUTH_SECRET (32+ character random string)
- [ ] NEXTAUTH_URL (your Vercel app URL)
- [ ] GOOGLE_CLIENT_ID
- [ ] GOOGLE_CLIENT_SECRET

## Security Notes

1. Never commit `.env.local` to version control
2. Use strong passwords for Supabase database
3. Keep your Google OAuth credentials secure
4. Regularly rotate your NEXTAUTH_SECRET in production

## Support

If you encounter issues:
1. Check Vercel function logs
2. Check Supabase logs
3. Verify all environment variables are set correctly
4. Test locally with the same environment variables
