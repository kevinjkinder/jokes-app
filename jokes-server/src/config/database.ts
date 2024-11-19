import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async (): Promise<void> => {
    try {
        const user = process.env.MONGODB_USER;
        const password = process.env.MONGODB_PASSWORD;
        const host = process.env.MONGODB_HOST;
        const port = process.env.MONGODB_PORT;
        const database = process.env.MONGODB_DATABASE || '';
        
        const mongoURI: string = `mongodb://${user}:${password}@${host}:${port}/${database}?authSource=admin`;
        
        await mongoose.connect(mongoURI);
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        console.error('Connection string details:', {
            host: process.env.MONGODB_HOST,
            port: process.env.MONGODB_PORT,
            user: process.env.MONGODB_USER,
            database: process.env.MONGODB_DATABASE
        });
        process.exit(1);
    }
};

export const disconnectDB = async (): Promise<void> => {
    try {
        await mongoose.connection.close();
        console.log('MongoDB Disconnected...');
    } catch (err) {
        console.error('Error disconnecting from MongoDB:', err);
        process.exit(1);
    }
}; 