#!/usr/bin/env node

/**
 * Test Supabase Connection Script
 * Run this script to verify your Supabase setup is working correctly
 */

import { PrismaClient } from '../src/generated/client.js'

async function testSupabaseConnection() {
  console.log('🔗 Testing Supabase connection...')
  
  const prisma = new PrismaClient()

  try {
    // Test basic connection
    console.log('1️⃣ Testing database connection...')
    await prisma.$connect()
    console.log('✅ Database connection successful!')

    // Test table access
    console.log('2️⃣ Testing table access...')
    const userCount = await prisma.user.count()
    console.log(`✅ User table accessible (${userCount} users found)`)

    const dinnerCount = await prisma.dinner.count()
    console.log(`✅ Dinner table accessible (${dinnerCount} dinners found)`)

    const bookingCount = await prisma.booking.count()
    console.log(`✅ Booking table accessible (${bookingCount} bookings found)`)

    // Test creating a test record
    console.log('3️⃣ Testing database write operations...')
    const testUser = await prisma.user.create({
      data: {
        email: `test-${Date.now()}@example.com`,
        name: 'Test User',
        role: 'guest',
        emailVerified: new Date(),
        needsRoleSelection: false,
      }
    })
    console.log(`✅ Test user created: ${testUser.email}`)

    // Clean up test user
    await prisma.user.delete({
      where: { id: testUser.id }
    })
    console.log('✅ Test user cleaned up')

    console.log('\n🎉 All tests passed! Your Supabase setup is working correctly.')
    console.log('\nNext steps:')
    console.log('1. Run: npm run dev')
    console.log('2. Test Google OAuth sign-in')
    console.log('3. Deploy to Vercel')

  } catch (error) {
    console.error('\n❌ Supabase connection test failed:')
    console.error(error.message)
    
    if (error.message.includes('connection')) {
      console.log('\n🔧 Troubleshooting tips:')
      console.log('1. Check your DATABASE_URL in .env.local')
      console.log('2. Verify your Supabase project is active')
      console.log('3. Ensure your database password is correct')
      console.log('4. Check if special characters in password need URL encoding')
    }
    
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

// Check if environment variables are set
if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL environment variable not found!')
  console.log('Please make sure your .env.local file contains:')
  console.log('DATABASE_URL="postgresql://postgres:password@db.project-id.supabase.co:5432/postgres"')
  process.exit(1)
}

testSupabaseConnection()
