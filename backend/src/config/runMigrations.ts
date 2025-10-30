import 'reflect-metadata';
import { AppDataSource } from './database';

async function runMigrations() {
  try {
    console.log('🔄 Initializing database connection...');
    await AppDataSource.initialize();
    console.log('✅ Database connection established');

    console.log('🔄 Running migrations...');
    await AppDataSource.synchronize();
    console.log('✅ Migrations completed successfully');

    console.log('📊 Database schema is up to date');
  } catch (error) {
    console.error('❌ Error running migrations:', error);
    process.exit(1);
  } finally {
    await AppDataSource.destroy();
    console.log('👋 Database connection closed');
  }
}

runMigrations();
