# DineWithUs - Social Dining Platform

A modern social dining platform built with Next.js 15, TypeScript, and Tailwind CSS v4.

## Tech Stack

- **Framework**: Next.js 15.5.4 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI + Custom Components
- **Deployment**: Vercel-ready

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
DineWithUs/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage
│   ├── search/            # Search page
│   ├── dinners/[id]/      # Dinner detail pages
│   └── booking/           # Booking page
├── src/
│   ├── components/        # React components
│   │   ├── ui/           # UI components (buttons, cards, etc.)
│   │   └── ...           # Feature components
│   └── lib/              # Utilities and mock data
└── next.config.js        # Next.js configuration
```

## Deployment

✅ **Your project is ready to deploy on Vercel with Supabase!**

### Quick Setup
```bash
# Run the setup script
./setup-vercel.sh

# Deploy to Vercel
npm install -g vercel
vercel --prod
```

### Prerequisites
- [Supabase](https://supabase.com) account
- [Vercel](https://vercel.com) account
- Google OAuth credentials

### Detailed Instructions
- **Supabase Setup**: [SUPABASE_SETUP_GUIDE.md](./SUPABASE_SETUP_GUIDE.md) - Complete step-by-step guide
- **Supabase Checklist**: [SUPABASE_CHECKLIST.md](./SUPABASE_CHECKLIST.md) - Track your progress
- **Vercel Deployment**: [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) - Deployment instructions

### Environment Variables
```bash
DATABASE_URL="postgresql://..." # Supabase connection string
NEXTAUTH_SECRET="your-secret"   # Generate with: openssl rand -base64 32
NEXTAUTH_URL="https://your-app.vercel.app"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

## Features

- 🔍 Search for dinner experiences
- 📅 Browse available dinners
- 👤 View host profiles
- 🍽️ Detailed dinner information
- 📱 Fully responsive design

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## License

Private project
