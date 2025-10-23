# 🗄️ Complete Supabase Setup Guide

This guide will walk you through setting up Supabase for your DineWithUs project step by step.

## Step 1: Create Supabase Account

### 1.1 Sign Up for Supabase
1. Go to [https://supabase.com](https://supabase.com)
2. Click **"Start your project"** or **"Sign up"**
3. Sign up using:
   - **GitHub** (recommended - easier integration)
   - **Google**
   - **Email** (create password)

### 1.2 Verify Your Email
- Check your email for verification link
- Click the verification link to activate your account

## Step 2: Create a New Project

### 2.1 Create New Project
1. After logging in, you'll see the Supabase dashboard
2. Click **"New Project"** (green button)
3. Fill in the project details:
   - **Name**: `dinewithus` (or any name you prefer)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to your users (e.g., `us-east-1` for US)
   - **Pricing Plan**: Select **Free** for development

### 2.2 Wait for Project Setup
- Project creation takes 2-3 minutes
- You'll see a progress indicator
- Don't refresh the page during setup

## Step 3: Get Your Database Connection String

### 3.1 Navigate to Database Settings
1. Once your project is ready, go to **Settings** (gear icon in left sidebar)
2. Click **"Database"** in the settings menu

### 3.2 Copy Connection String
1. Scroll down to **"Connection string"** section
2. You'll see different connection options
3. **Copy the "URI" connection string** (starts with `postgresql://`)
4. It will look like this:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-ID].supabase.co:5432/postgres
   ```

### 3.3 Replace Password in Connection String
- Replace `[YOUR-PASSWORD]` with the actual password you created
- Example:
  ```
  postgresql://postgres:your_actual_password@db.abcdefghijklmnop.supabase.co:5432/postgres
  ```

## Step 4: Get API Credentials

### 4.1 Navigate to API Settings
1. Go to **Settings** → **API**
2. You'll see several important values:

### 4.2 Copy API Keys
1. **Project URL**: 
   - Copy the URL (looks like: `https://abcdefghijklmnop.supabase.co`)
   - This is your `NEXT_PUBLIC_SUPABASE_URL`

2. **anon public key**:
   - Copy the long key that starts with `eyJ...`
   - This is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`

3. **service_role secret** (optional):
   - Copy this key if you need server-side access
   - **Keep this secret!** Don't expose it in client-side code

## Step 5: Update Your Environment Variables

### 5.1 Update .env.local File
Open your `.env.local` file and add/update these variables:

```bash
# Database (Supabase PostgreSQL)
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.YOUR_PROJECT_ID.supabase.co:5432/postgres"

# NextAuth.js
NEXTAUTH_SECRET="your-nextauth-secret-here"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth (keep your existing values)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Supabase (optional - for future use)
NEXT_PUBLIC_SUPABASE_URL="https://YOUR_PROJECT_ID.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJ...your-anon-key"
```

### 5.2 Generate NextAuth Secret
Run this command to generate a secure secret:
```bash
openssl rand -base64 32
```
Copy the output and use it as your `NEXTAUTH_SECRET`

## Step 6: Test Database Connection

### 6.1 Generate Prisma Client
```bash
npx prisma generate
```

### 6.2 Push Schema to Supabase
```bash
npx prisma db push
```

### 6.3 Verify Connection
```bash
npx prisma studio
```
This should open Prisma Studio and show your database tables.

## Step 7: Verify Setup

### 7.1 Check Database Tables
In Supabase dashboard:
1. Go to **Table Editor**
2. You should see your tables:
   - `User`
   - `Dinner`
   - `Booking`
   - `Review`

### 7.2 Test Local Development
```bash
npm run dev
```
Visit `http://localhost:3000` and test:
- User registration
- Google OAuth
- Role selection
- Database operations

## Common Issues & Solutions

### Issue 1: Connection String Format
**Problem**: `Error: Invalid connection string`
**Solution**: Make sure your connection string looks exactly like:
```
postgresql://postgres:password@db.project-id.supabase.co:5432/postgres
```

### Issue 2: Password Special Characters
**Problem**: Password contains special characters that break the URL
**Solution**: URL-encode special characters:
- `@` becomes `%40`
- `#` becomes `%23`
- `$` becomes `%24`
- etc.

### Issue 3: Database Not Found
**Problem**: `database "postgres" does not exist`
**Solution**: Use `postgres` as the database name (default for Supabase)

### Issue 4: SSL Connection Required
**Problem**: SSL connection errors
**Solution**: Add `?sslmode=require` to your connection string:
```
postgresql://postgres:password@db.project-id.supabase.co:5432/postgres?sslmode=require
```

## Security Best Practices

### 1. Environment Variables
- Never commit `.env.local` to version control
- Use different passwords for development and production
- Rotate secrets regularly

### 2. Database Access
- Use `anon` key for client-side operations
- Use `service_role` key only for server-side operations
- Never expose `service_role` key in client-side code

### 3. Connection String Security
- Keep your database password secure
- Use connection pooling for production
- Monitor database access logs

## Next Steps

After completing this setup:

1. **Test locally**: Ensure everything works with your local development
2. **Deploy to Vercel**: Follow the VERCEL_DEPLOYMENT.md guide
3. **Update Vercel environment variables**: Add the same environment variables to Vercel
4. **Update Google OAuth**: Add your Vercel domain to Google OAuth settings

## Need Help?

If you encounter issues:

1. Check the Supabase logs in your dashboard
2. Verify all environment variables are correct
3. Ensure your database password doesn't contain special characters
4. Check that your connection string format is correct

## Quick Checklist

- [ ] Supabase account created
- [ ] New project created
- [ ] Database connection string copied
- [ ] API keys copied
- [ ] Environment variables updated
- [ ] Prisma schema pushed to Supabase
- [ ] Local development tested
- [ ] Database tables visible in Supabase dashboard

Once you complete these steps, your project will be ready for Vercel deployment! 🚀
