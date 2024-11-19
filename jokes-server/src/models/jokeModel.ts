import { Schema, model } from 'mongoose';
import { IJokeDocument } from '../types/joke';

const jokeSchema = new Schema<IJokeDocument>(
    {
        setup: { type: String, required: true },
        type: { type: String, required: true },
        punchline: { type: String, required: true },
        rating: {
            amount: { type: Number, default: 0 },
            value: { type: Number, default: 0 }
        }
    },
    { timestamps: true }
);

export default model<IJokeDocument>('Joke', jokeSchema);