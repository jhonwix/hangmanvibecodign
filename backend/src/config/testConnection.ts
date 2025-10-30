import 'reflect-metadata';
import { AppDataSource } from './database';

async function testConnection() {
  try {
    console.log('🔄 Testing database connection...');
    console.log('📋 Configuration:');
    console.log(`   - Host: ${process.env.DB_HOST || 'localhost'}`);
    console.log(`   - Port: ${process.env.DB_PORT || '5432'}`);
    console.log(`   - Database: ${process.env.DB_NAME || 'hangman_db'}`);
    console.log(`   - User: ${process.env.DB_USER || 'hangman_user'}`);
    console.log('');

    await AppDataSource.initialize();
    console.log('✅ Database connection successful!');

    // Test query
    const result = await AppDataSource.query('SELECT NOW()');
    console.log('✅ Test query successful!');
    console.log(`   - Current time: ${result[0].now}`);

    // Show entities
    console.log('\n📦 Registered entities:');
    AppDataSource.entityMetadatas.forEach((entity) => {
      console.log(`   - ${entity.name} (table: ${entity.tableName})`);
    });

    console.log('\n🎉 All database checks passed!');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
    }
    process.exit(1);
  } finally {
    await AppDataSource.destroy();
    console.log('\n👋 Database connection closed');
  }
}

testConnection();
