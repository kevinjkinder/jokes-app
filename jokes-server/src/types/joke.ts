import { Document } from 'mongoose';

export interface IJoke {
    setup: string;
    punchline: string;
    type: string;
    rating?: {
        amount: number;
        value: number;
    };
}

export interface IJokeDocument extends IJoke, Document {
    createdAt: Date;
    updatedAt: Date;
} 