# ✅ Supabase Setup Checklist

Use this checklist to ensure you complete all necessary steps for Supabase setup.

## Account & Project Setup
- [ ] Sign up for Supabase account at [supabase.com](https://supabase.com)
- [ ] Verify email address
- [ ] Create new project named "dinewithus"
- [ ] Set strong database password (save it!)
- [ ] Choose appropriate region
- [ ] Wait for project setup to complete (2-3 minutes)

## Database Configuration
- [ ] Navigate to Settings → Database
- [ ] Copy connection string (URI format)
- [ ] Replace `[YOUR-PASSWORD]` with actual password
- [ ] Test connection string format

## API Credentials
- [ ] Navigate to Settings → API
- [ ] Copy Project URL for `NEXT_PUBLIC_SUPABASE_URL`
- [ ] Copy anon public key for `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Copy service_role secret (keep secure)

## Environment Variables
- [ ] Update `.env.local` with database connection string
- [ ] Generate `NEXTAUTH_SECRET` using `openssl rand -base64 32`
- [ ] Keep existing Google OAuth credentials
- [ ] Verify all environment variables are set

## Database Setup
- [ ] Run `npx prisma generate`
- [ ] Run `npx prisma db push`
- [ ] Run `npx prisma studio` to verify tables
- [ ] Check Supabase dashboard for created tables

## Testing
- [ ] Run `npm run db:test` to test connection
- [ ] Start development server with `npm run dev`
- [ ] Test Google OAuth sign-in
- [ ] Test role selection functionality
- [ ] Verify user data is saved to Supabase

## Troubleshooting
- [ ] Check connection string format
- [ ] Verify password doesn't contain special characters
- [ ] Ensure all environment variables are loaded
- [ ] Check Supabase project status
- [ ] Verify database tables exist

## Ready for Deployment
- [ ] All tests pass locally
- [ ] Google OAuth works with localhost
- [ ] Database operations work correctly
- [ ] Environment variables are documented
- [ ] Ready to deploy to Vercel

## Notes
- **Database Password**: ________________
- **Project ID**: ________________
- **Connection String**: ________________
- **NextAuth Secret**: ________________

## Common Issues & Solutions

### Connection String Issues
- **Problem**: Invalid connection string
- **Solution**: Check format: `postgresql://postgres:password@db.project-id.supabase.co:5432/postgres`

### Password Issues
- **Problem**: Special characters in password
- **Solution**: URL-encode special characters or use simpler password

### SSL Issues
- **Problem**: SSL connection errors
- **Solution**: Add `?sslmode=require` to connection string

### Environment Variables
- **Problem**: Variables not loading
- **Solution**: Restart development server after updating `.env.local`

## Next Steps After Completion
1. Deploy to Vercel
2. Update Vercel environment variables
3. Update Google OAuth redirect URIs
4. Test production deployment
5. Monitor Supabase logs

---

**Status**: ⏳ In Progress
**Last Updated**: [Date]
**Completed Steps**: ___ / 25
