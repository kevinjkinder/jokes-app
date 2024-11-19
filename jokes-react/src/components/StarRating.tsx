import { useState } from 'react';
import './StarRating.css';

interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
}

export function StarRating({ value, onChange }: StarRatingProps) {
  const [rated, setRated] = useState(false);

  const handleStarClick = (newValue: number) => {
    if (!rated) {
      setRated(true);
      onChange(newValue);
    }
  };

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`star ${i <= value ? 'star-filled' : ''} ${rated ? 'rated' : ''}`}
          onClick={() => handleStarClick(i)}
        >
          ★
        </span>
      ))}
      <span className="rating-value">{value}</span>
      {rated && <span className="checkmark">rated</span>}
    </div>
  );
} 