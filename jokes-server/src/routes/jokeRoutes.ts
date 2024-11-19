import { Router } from 'express';
import { getAllJokesController, getRandomJokeController, getJokeByIdController, createJokeController, deleteJokeController, rateJokeController, getPaginatedJokesController } from '../controllers/jokeController';

const router = Router();

router.get('/', getAllJokesController);
router.get('/random', getRandomJokeController);
router.get('/paginated', getPaginatedJokesController);
router.get('/:id', getJokeByIdController);

router.post('/', createJokeController);
router.post('/rate', rateJokeController);

router.delete('/:id', deleteJokeController);



export default router;
