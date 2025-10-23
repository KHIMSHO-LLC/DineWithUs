#!/bin/bash

# Vercel + Supabase Setup Script
# Run this script to prepare your project for Vercel deployment

echo "🚀 Setting up DineWithUs for Vercel deployment with Supabase..."

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ .env.local file not found!"
    echo "Please create .env.local with your environment variables first."
    echo "See VERCEL_DEPLOYMENT.md for details."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Check database connection
echo "🔗 Testing database connection..."
npx prisma db push --accept-data-loss

echo "✅ Setup completed!"
echo ""
echo "Next steps:"
echo "1. Update your .env.local with Supabase credentials"
echo "2. Run 'npx prisma db push' to sync your schema"
echo "3. Deploy to Vercel with 'vercel --prod'"
echo ""
echo "For detailed instructions, see VERCEL_DEPLOYMENT.md"
