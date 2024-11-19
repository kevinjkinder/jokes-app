import { Joke as JokeComponent } from './Joke';
import { Pagination } from './Pagination';
import type { Joke } from '../types/joke';
import { jokeService } from '../services/jokeService';
import './JokeList.css';

interface JokeListProps {
  jokes: Joke[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onJokeDeleted: (id: number) => void;
  onJokeRated: (joke: Joke) => void;
}

export function JokeList({ 
  jokes, 
  currentPage, 
  totalPages, 
  onPageChange,
  onJokeDeleted,
  onJokeRated 
}: JokeListProps) {
  
  async function handleDelete(id: number) {
    await jokeService.deleteJoke(id);
    onJokeDeleted(id);
  }

  async function handleRate(id: number, value: number) {
    const response = await jokeService.updateJokeRating(id, value);
    onJokeRated(response);
  }

  return (
    <div className="joke-list">
      <div className="joke-list-container">
        {jokes.map(joke => (
          <JokeComponent
            key={joke._id}
            joke={joke}
            onDelete={handleDelete}
            onRate={handleRate}
          />
        ))}
        
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onChange={onPageChange}
        />
      </div>
    </div>
  );
} 