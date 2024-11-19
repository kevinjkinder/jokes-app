export interface Joke {
  _id: number;
  type: string;
  punchline: string;
  setup: string;
  rating: {
    amount: number;
    value: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse {
  jokes: Joke[];
  currentPage: number;
  nextPage: number | null;
  pageSize: number;
  totalPages: number;
}

export interface NewJoke {
  type: string;
  setup: string;
  punchline: string;
}
