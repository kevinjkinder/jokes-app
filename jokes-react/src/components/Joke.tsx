import { useState } from 'react';
import { StarRating } from './StarRating';
import type { Joke as JokeType } from '../types/joke';
import './Joke.css';

interface JokeProps {
  joke: JokeType;
  onDelete: (id: number) => void;
  onRate: (id: number, value: number) => void;
}

export function Joke({ joke, onDelete, onRate }: JokeProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleRating = (value: number) => {
    onRate(joke._id, value);
  };

  const handleDelete = () => {
    onDelete(joke._id);
    setShowDeleteConfirm(false);
  };

  return (
    <div className="joke-card">
      <div className="joke-content">
        <p className="joke-text">{joke.setup}</p>
        <p className={`punchline ${isRevealed ? 'visible' : ''}`}>
          {joke.punchline}
        </p>
      </div>
      <div className="joke-actions">
        <div className="rating-container">
          <StarRating
            value={joke.rating.value}
            onChange={handleRating}
          />
        </div>
        <div className="reveal-container">
          <button 
            className="reveal-btn"
            onClick={() => setIsRevealed(!isRevealed)}
          >
            {isRevealed ? 'Hide' : 'Reveal'}
          </button>
        </div>
        <div className="delete-container">
          {!showDeleteConfirm ? (
            <button 
              className="delete-btn"
              onClick={() => setShowDeleteConfirm(true)}
            >
              Delete
            </button>
          ) : (
            <div className="delete-confirm">
              <span>Are you sure?</span>
              <button className="confirm-btn" onClick={handleDelete}>Yes</button>
              <button className="cancel-btn" onClick={() => setShowDeleteConfirm(false)}>No</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 