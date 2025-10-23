import { PrismaClient } from './src/generated/client.js'

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://postgres:EJv9380x69XAQz5R@db.flqztzvxtktxtkzxdkeo.supabase.co:5432/postgres?sslmode=require"
    }
  }
})

async function testConnection() {
  try {
    console.log('🔗 Testing Supabase connection...')
    await prisma.$connect()
    console.log('✅ Connected successfully!')
    
    // Test a simple query
    const result = await prisma.$queryRaw`SELECT 1 as test`
    console.log('✅ Query test passed:', result)
    
    await prisma.$disconnect()
    console.log('🎉 Connection test completed successfully!')
  } catch (error) {
    console.error('❌ Connection failed:', error.message)
    process.exit(1)
  }
}

testConnection()
