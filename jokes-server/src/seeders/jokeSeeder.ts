import dotenv from 'dotenv';
import { connectDB, disconnectDB } from '../config/database';
import Joke from '../models/jokeModel';
import jokes from '../../jokes/index.json';

dotenv.config();

const seedDatabase = async (): Promise<void> => {
    try {
        await connectDB();
        
        await Joke.deleteMany({});
        console.log('Cleared existing jokes');

        const seededJokes = await Joke.insertMany(jokes);
        console.log(`Successfully seeded ${seededJokes.length} jokes`);

        await disconnectDB();
        console.log('Database connection closed');
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

setTimeout(seedDatabase, 5000); 