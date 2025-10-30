import 'reflect-metadata';
import { AppDataSource } from './database';
import { Word, WordCategory, WordDifficulty } from '../entities/Word';
import { User } from '../entities/User';

const seedWords = [
  // Animals - Easy
  { wordEn: 'CAT', wordEs: 'GATO', category: WordCategory.ANIMALS, difficulty: WordDifficulty.EASY },
  { wordEn: 'DOG', wordEs: 'PERRO', category: WordCategory.ANIMALS, difficulty: WordDifficulty.EASY },
  { wordEn: 'LION', wordEs: 'LEON', category: WordCategory.ANIMALS, difficulty: WordDifficulty.EASY },
  { wordEn: 'BEAR', wordEs: 'OSO', category: WordCategory.ANIMALS, difficulty: WordDifficulty.EASY },

  // Animals - Medium
  { wordEn: 'ELEPHANT', wordEs: 'ELEFANTE', category: WordCategory.ANIMALS, difficulty: WordDifficulty.MEDIUM },
  { wordEn: 'GIRAFFE', wordEs: 'JIRAFA', category: WordCategory.ANIMALS, difficulty: WordDifficulty.MEDIUM },
  { wordEn: 'DOLPHIN', wordEs: 'DELFIN', category: WordCategory.ANIMALS, difficulty: WordDifficulty.MEDIUM },

  // Fruits - Easy
  { wordEn: 'APPLE', wordEs: 'MANZANA', category: WordCategory.FRUITS, difficulty: WordDifficulty.EASY },
  { wordEn: 'BANANA', wordEs: 'PLATANO', category: WordCategory.FRUITS, difficulty: WordDifficulty.EASY },
  { wordEn: 'ORANGE', wordEs: 'NARANJA', category: WordCategory.FRUITS, difficulty: WordDifficulty.EASY },

  // Fruits - Medium
  { wordEn: 'PINEAPPLE', wordEs: 'PINA', category: WordCategory.FRUITS, difficulty: WordDifficulty.MEDIUM },
  { wordEn: 'STRAWBERRY', wordEs: 'FRESA', category: WordCategory.FRUITS, difficulty: WordDifficulty.MEDIUM },

  // Objects - Easy
  { wordEn: 'TABLE', wordEs: 'MESA', category: WordCategory.OBJECTS, difficulty: WordDifficulty.EASY },
  { wordEn: 'CHAIR', wordEs: 'SILLA', category: WordCategory.OBJECTS, difficulty: WordDifficulty.EASY },
  { wordEn: 'BOOK', wordEs: 'LIBRO', category: WordCategory.OBJECTS, difficulty: WordDifficulty.EASY },

  // Objects - Medium
  { wordEn: 'COMPUTER', wordEs: 'COMPUTADORA', category: WordCategory.OBJECTS, difficulty: WordDifficulty.MEDIUM },
  { wordEn: 'TELEPHONE', wordEs: 'TELEFONO', category: WordCategory.OBJECTS, difficulty: WordDifficulty.MEDIUM },

  // Countries - Easy
  { wordEn: 'SPAIN', wordEs: 'ESPANA', category: WordCategory.COUNTRIES, difficulty: WordDifficulty.EASY },
  { wordEn: 'MEXICO', wordEs: 'MEXICO', category: WordCategory.COUNTRIES, difficulty: WordDifficulty.EASY },
  { wordEn: 'FRANCE', wordEs: 'FRANCIA', category: WordCategory.COUNTRIES, difficulty: WordDifficulty.EASY },

  // Countries - Medium
  { wordEn: 'ARGENTINA', wordEs: 'ARGENTINA', category: WordCategory.COUNTRIES, difficulty: WordDifficulty.MEDIUM },
  { wordEn: 'COLOMBIA', wordEs: 'COLOMBIA', category: WordCategory.COUNTRIES, difficulty: WordDifficulty.MEDIUM },

  // Movies - Medium
  { wordEn: 'AVATAR', wordEs: 'AVATAR', category: WordCategory.MOVIES, difficulty: WordDifficulty.MEDIUM },
  { wordEn: 'TITANIC', wordEs: 'TITANIC', category: WordCategory.MOVIES, difficulty: WordDifficulty.MEDIUM },
  { wordEn: 'INCEPTION', wordEs: 'ORIGEN', category: WordCategory.MOVIES, difficulty: WordDifficulty.MEDIUM },

  // Hard words
  { wordEn: 'ENCYCLOPEDIA', wordEs: 'ENCICLOPEDIA', category: WordCategory.OBJECTS, difficulty: WordDifficulty.HARD },
  { wordEn: 'HIPPOPOTAMUS', wordEs: 'HIPOPOTAMO', category: WordCategory.ANIMALS, difficulty: WordDifficulty.HARD },
  { wordEn: 'REFRIGERATOR', wordEs: 'REFRIGERADOR', category: WordCategory.OBJECTS, difficulty: WordDifficulty.HARD },
  { wordEn: 'WATERMELON', wordEs: 'SANDIA', category: WordCategory.FRUITS, difficulty: WordDifficulty.HARD },
  { wordEn: 'SWITZERLAND', wordEs: 'SUIZA', category: WordCategory.COUNTRIES, difficulty: WordDifficulty.HARD },
];

const seedUsers = [
  { username: 'player1', email: 'player1@hangman.com' },
  { username: 'player2', email: 'player2@hangman.com' },
  { username: 'guest', email: 'guest@hangman.com' },
];

async function seed() {
  try {
    console.log('🔄 Initializing database connection...');
    await AppDataSource.initialize();
    console.log('✅ Database connection established');

    const wordRepository = AppDataSource.getRepository(Word);
    const userRepository = AppDataSource.getRepository(User);

    // Check if data already exists
    const existingWordsCount = await wordRepository.count();
    const existingUsersCount = await userRepository.count();

    if (existingWordsCount > 0) {
      console.log(`ℹ️  Database already has ${existingWordsCount} words. Skipping word seeding.`);
    } else {
      console.log('🌱 Seeding words...');
      for (const wordData of seedWords) {
        const word = wordRepository.create(wordData);
        await wordRepository.save(word);
      }
      console.log(`✅ Successfully seeded ${seedWords.length} words`);
    }

    if (existingUsersCount > 0) {
      console.log(`ℹ️  Database already has ${existingUsersCount} users. Skipping user seeding.`);
    } else {
      console.log('🌱 Seeding users...');
      for (const userData of seedUsers) {
        const user = userRepository.create(userData);
        await userRepository.save(user);
      }
      console.log(`✅ Successfully seeded ${seedUsers.length} users`);
    }

    console.log('🎉 Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - Words: ${await wordRepository.count()}`);
    console.log(`   - Users: ${await userRepository.count()}`);
    console.log(`   - Categories: ${Object.values(WordCategory).length}`);
    console.log(`   - Difficulty levels: ${Object.values(WordDifficulty).length}`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await AppDataSource.destroy();
    console.log('👋 Database connection closed');
  }
}

seed();
