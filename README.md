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

✅ **Your project is ready to deploy on Vercel!**

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

**Quick Deploy:**
```bash
npm install -g vercel
vercel
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
