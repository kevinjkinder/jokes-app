import app from './src/app';
import dotenv from 'dotenv';

dotenv.config();

const PORT: number = parseInt(process.env.PORT || '3005', 10);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));