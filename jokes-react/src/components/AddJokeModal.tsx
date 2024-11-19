import { useState } from 'react';
import { jokeService } from '../services/jokeService';
import type { NewJoke } from '../types/joke';
import './AddJokeModal.css';

interface AddJokeModalProps {
  show: boolean;
  onClose: () => void;
  onJokeAdded: () => void;
}

export function AddJokeModal({ show, onClose, onJokeAdded }: AddJokeModalProps) {
  const [joke, setJoke] = useState<NewJoke>({
    type: 'one-liner',
    setup: '',
    punchline: ''
  });

  const isValid = joke.type && joke.setup.trim() && joke.punchline.trim();

  const handleSubmit = async () => {
    if (isValid) {
      const jokeData = {
        type: joke.type,
        setup: joke.setup.trim(),
        punchline: joke.punchline.trim()
      };
      await jokeService.createJoke(jokeData);
      setJoke({
        type: 'one-liner',
        setup: '',
        punchline: ''
      });
      onClose();
      onJokeAdded();
    }
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add New Joke</h2>
        <div className="form-group">
          <label>Type</label>
          <select
            value={joke.type}
            onChange={e => setJoke({ ...joke, type: e.target.value })}
          >
            <option value="knock-knock">Knock Knock</option>
            <option value="one-liner">One Liner</option>
            <option value="qa">Question & Answer</option>
            <option value="wordplay">Wordplay</option>
          </select>
        </div>
        <div className="form-group">
          <label>Setup</label>
          <textarea
            value={joke.setup}
            onChange={e => setJoke({ ...joke, setup: e.target.value })}
            placeholder="Enter the setup..."
            rows={2}
          />
        </div>
        <div className="form-group">
          <label>Punchline</label>
          <textarea
            value={joke.punchline}
            onChange={e => setJoke({ ...joke, punchline: e.target.value })}
            placeholder="Enter the punchline..."
            rows={2}
          />
        </div>
        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSubmit} disabled={!isValid}>Add Joke</button>
        </div>
      </div>
    </div>
  );
} 