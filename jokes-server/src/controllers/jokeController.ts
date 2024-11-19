import { Request, Response, NextFunction } from 'express';
import { getAllJokes, getRandomJoke, getJokeById, createJoke, deleteJoke, rateJoke, getPaginatedJokes } from '../services/jokeService';

export const getAllJokesController = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const jokes = await getAllJokes();
        res.json(jokes);
    } catch (err) {
        next(err);
    }
};

export const getRandomJokeController = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const joke = await getRandomJoke();
        if (!joke) {
            res.status(404).json({ message: 'No jokes found' });
        }
        res.json(joke);
    } catch (err) {
        next(err);
    }
};

export const getJokeByIdController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const joke = await getJokeById(req.params.id);
        if (!joke) {
            res.status(404).json({ message: 'Joke not found' });
        }
        res.json(joke);
    } catch (err) {
        next(err);
    }
};

export const createJokeController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newJoke = await createJoke(req.body);
        res.status(201).json(newJoke);
    } catch (err) {
        next(err);
    }
};

export const deleteJokeController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await deleteJoke(req.params.id);
        res.json({ success: result });
    } catch (err) {
        next(err);
    }
};

export const rateJokeController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const joke = await rateJoke(req.body.id, req.body.rating);
        res.json(joke);
    } catch (err) {
        next(err);
    }
};

export const getPaginatedJokesController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = parseInt(req.query.page as string);
        const pageSize = parseInt(req.query.pageSize as string);
        const jokes = await getPaginatedJokes(page, pageSize);
        res.json(jokes);
    } catch (err) {
        next(err);
    }
};