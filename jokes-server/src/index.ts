import express from 'express';
import { connectDB } from './config/database';
import jokeRoutes from './routes/jokeRoutes';

const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json());
app.use('/jokes', jokeRoutes);

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 