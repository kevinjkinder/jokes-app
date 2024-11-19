import { IJokeDocument } from '../types/joke';
import mongoose from 'mongoose';
import Joke from '../models/jokeModel';

export const getAllJokes = async (): Promise<IJokeDocument[]> => {
    const jokes = await Joke.find();
    return jokes;
};

export const getRandomJoke = async (): Promise<IJokeDocument | null> => {
    const count = await Joke.countDocuments();
    const random = Math.floor(Math.random() * count);
    const joke = await Joke.findOne().skip(random);
    return joke;
};

export const getJokeById = async (id: string): Promise<IJokeDocument | null> => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid joke ID format');
    }
    const joke = await Joke.findById(id);

    return joke;
};

export const createJoke = async (jokeData: IJokeDocument): Promise<IJokeDocument> => {
    console.log(jokeData);
    const joke = await Joke.create(jokeData);
    return joke;
};

export const deleteJoke = async (id: string): Promise<boolean> => {
    const result = await Joke.findByIdAndDelete(id);
    return result !== null;
};

export const rateJoke = async (id: string, rating: number): Promise<IJokeDocument | null> => {
    if (rating < 1 || rating > 10) {
        throw new Error('Rating must be between 1 and 10');
    }

    const joke = await Joke.findById(id);
    if (!joke) return null;

    const currentAmount = joke.rating?.amount || 0;
    const currentValue = joke.rating?.value || 0;
    
    const weight = 1 / (currentAmount + 1);
    const newValue = (currentValue * (1 - weight)) + (rating * weight);

    const updatedJoke = await Joke.findByIdAndUpdate(
        id,
        {
            rating: {
                amount: currentAmount + 1,
                value: Number(newValue.toFixed(2))
            }
        },
        { new: true }
    );

    return updatedJoke;
};

export const getPaginatedJokes = async (page: number, pageSize: number): Promise<{
    jokes: IJokeDocument[];
    currentPage: number;
    nextPage: number | null;
    pageSize: number;
    totalPages: number;
}> => {
    const maxPageSize = 20;
    const _pageSize = Math.min(pageSize, maxPageSize);
    const totalJokes = await Joke.countDocuments();
    const totalPages = Math.ceil(totalJokes / _pageSize);

    const jokes = await Joke.find().skip((page - 1) * _pageSize).limit(_pageSize);
    
    return {
        jokes,
        currentPage: page,
        nextPage: page < totalPages ? page + 1 : null,
        pageSize: _pageSize,
        totalPages
    };
};