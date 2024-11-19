import express, { Express, Request, Response, NextFunction } from 'express';
import { connectDB } from './config/database';
import jokeRoutes from './routes/jokeRoutes';
import cors from 'cors';

const app: Express = express();

connectDB();
app.use(cors({origin: '*'}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/jokes', jokeRoutes);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

export default app; 