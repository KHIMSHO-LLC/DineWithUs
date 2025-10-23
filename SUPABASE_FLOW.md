# 🔄 Supabase Setup Flow

## Visual Flow Diagram

```
1. Sign Up at supabase.com
   ↓
2. Create New Project
   ├── Project Name: "dinewithus"
   ├── Database Password: [CREATE STRONG PASSWORD]
   ├── Region: [CHOOSE CLOSEST TO USERS]
   └── Plan: Free
   ↓
3. Wait for Project Setup (2-3 minutes)
   ↓
4. Get Database Connection String
   ├── Go to Settings → Database
   ├── Copy Connection String (URI format)
   └── Replace [YOUR-PASSWORD] with actual password
   ↓
5. Get API Credentials
   ├── Go to Settings → API
   ├── Copy Project URL → NEXT_PUBLIC_SUPABASE_URL
   ├── Copy anon key → NEXT_PUBLIC_SUPABASE_ANON_KEY
   └── Copy service_role key → SUPABASE_SERVICE_ROLE_KEY
   ↓
6. Update Environment Variables
   ├── Update .env.local with connection string
   ├── Generate NEXTAUTH_SECRET
   └── Keep existing Google OAuth credentials
   ↓
7. Test Database Connection
   ├── Run: npx prisma generate
   ├── Run: npx prisma db push
   └── Run: npx prisma studio
   ↓
8. Verify Setup
   ├── Check Supabase dashboard for tables
   ├── Test local development
   └── Verify Google OAuth works
```

## Connection String Format

```
postgresql://postgres:[PASSWORD]@db.[PROJECT_ID].supabase.co:5432/postgres
```

**Example:**
```
postgresql://postgres:mySecurePassword123@db.abcdefghijklmnop.supabase.co:5432/postgres
```

## Environment Variables Template

```bash
# Database
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.YOUR_PROJECT_ID.supabase.co:5432/postgres"

# NextAuth.js
NEXTAUTH_SECRET="generated-secret-here"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth (keep existing)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Supabase (optional)
NEXT_PUBLIC_SUPABASE_URL="https://YOUR_PROJECT_ID.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJ...your-anon-key"
```

## Quick Commands

```bash
# Generate NextAuth secret
openssl rand -base64 32

# Generate Prisma client
npx prisma generate

# Push schema to Supabase
npx prisma db push

# Open Prisma Studio
npx prisma studio
```
