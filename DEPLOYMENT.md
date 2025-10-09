# Deploying DineWithUs to Vercel

This guide will help you deploy your DineWithUs application to Vercel.

## Prerequisites

✅ Your project builds successfully (`npm run build` works)
✅ Git repository is initialized and has at least one commit
✅ You have a Vercel account (sign up at https://vercel.com)

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended for first-time)

1. **Push your code to GitHub/GitLab/Bitbucket**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Import Project to Vercel**
   - Go to https://vercel.com/dashboard
   - Click "Add New..." → "Project"
   - Import your Git repository
   - Vercel will auto-detect Next.js settings

3. **Configure Build Settings** (Usually auto-detected)
   - Framework Preset: **Next.js**
   - Build Command: `npm run build`
   - Output Directory: `.next` (default)
   - Install Command: `npm install`
   - Development Command: `npm run dev`

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete (usually 1-3 minutes)
   - You'll receive a live URL like `https://your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from your project directory**
   ```bash
   cd /Users/giorgikhimshiashvili/Desktop/work/a\ new\ era/DineWithUs
   vercel
   ```

4. **Follow the prompts:**
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N** (for first deployment)
   - Project name? Press enter or customize
   - Directory? `./` 
   - Want to override settings? **N**

5. **Deploy to production**
   ```bash
   vercel --prod
   ```

## Environment Variables (If Needed)

If you need to add environment variables:

1. **Via Vercel Dashboard:**
   - Go to Project Settings → Environment Variables
   - Add your variables (e.g., `NEXT_PUBLIC_API_URL`)
   - Redeploy for changes to take effect

2. **Via CLI:**
   ```bash
   vercel env add VARIABLE_NAME
   ```

## Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS settings as instructed by Vercel
4. Vercel automatically provisions SSL certificates

## Post-Deployment Checklist

- [ ] Test all pages on the live URL
- [ ] Verify images load correctly (from Unsplash)
- [ ] Test navigation between pages
- [ ] Check responsive design on mobile
- [ ] Verify all interactive features work

## Automatic Deployments

Once connected to Git:
- **Production**: Every push to `main` branch
- **Preview**: Every push to feature branches
- Each commit gets a unique preview URL

## Monitoring and Analytics

Enable Vercel Analytics:
1. Go to Project Settings → Analytics
2. Enable Web Analytics
3. Add the analytics code to your app (optional)

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure `npm run build` works locally
- Verify all dependencies are in `package.json`

### Images Not Loading
- Your app uses Unsplash images, which should work fine
- The `next.config.js` already has proper image configuration

### 404 Errors
- Verify file names and routes match exactly (case-sensitive)
- Check that all dynamic routes `[id]` are properly set up

## Project Configuration

Your project uses:
- **Next.js 15.5.4** with App Router
- **TypeScript**
- **Tailwind CSS v4**
- **React 18**

All configurations are properly set up for Vercel deployment!

## Support

- Vercel Documentation: https://vercel.com/docs
- Next.js Deployment: https://nextjs.org/docs/deployment
- Vercel Discord: https://vercel.com/discord

---

**Ready to Deploy!** 🚀

Your project is configured and tested. Choose your preferred deployment method above and go live!

