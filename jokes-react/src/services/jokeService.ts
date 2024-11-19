import axios from 'axios';
import type { NewJoke, Joke, PaginatedResponse } from '../types/joke';

const API_BASE_URL = 'http://localhost:3005/api';

export const jokeService = {
  async getJokes(page: number, pageSize: number): Promise<PaginatedResponse> {
    const response = await axios.get(`${API_BASE_URL}/jokes/paginated`, {
      params: { page, pageSize }
    });
    return response.data as PaginatedResponse;
  },

  async deleteJoke(id: number): Promise<void> {
    await axios.delete(`${API_BASE_URL}/jokes/${id}`);
  },

  async updateJokeRating(id: number, rating: number): Promise<Joke> {
    const response = await axios.post(`${API_BASE_URL}/jokes/rate`, { id, rating });
    return response.data as Joke;
  },

  async createJoke(jokeData: NewJoke): Promise<Joke> {
    const response = await axios.post(`${API_BASE_URL}/jokes`, jokeData);
    return response.data as Joke;
  }
}; 