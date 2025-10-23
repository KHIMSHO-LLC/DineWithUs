#!/usr/bin/env node

/**
 * Database setup script for Supabase
 * Run this script after setting up your Supabase project
 */

const { PrismaClient } = require('../src/generated/client')

async function setupDatabase() {
  const prisma = new PrismaClient()

  try {
    console.log('🔗 Connecting to Supabase database...')
    
    // Test connection
    await prisma.$connect()
    console.log('✅ Connected to Supabase database successfully!')

    // Check if tables exist
    const userCount = await prisma.user.count()
    console.log(`📊 Found ${userCount} users in database`)

    // Create a test user (optional)
    if (userCount === 0) {
      console.log('👤 Creating a test user...')
      const testUser = await prisma.user.create({
        data: {
          email: 'test@example.com',
          name: 'Test User',
          role: 'guest',
          emailVerified: new Date(),
          needsRoleSelection: false,
        }
      })
      console.log(`✅ Created test user: ${testUser.email}`)
    }

    console.log('🎉 Database setup completed successfully!')

  } catch (error) {
    console.error('❌ Database setup failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

setupDatabase()
