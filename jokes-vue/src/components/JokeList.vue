<template>
  <div class="joke-list">
    <div class="joke-list-container">
      <JokeComponent
        v-for="joke in jokes"
        :key="joke._id"
        :joke="joke"
        @delete="handleDelete"
        @rate="handleRate"
      />
      
      <Pagination
        :current-page="currentPage"
        :total-pages="totalPages"
        @change="page => $emit('page-change', page)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Joke } from '../types/joke';
import { jokeService } from '../services/jokeService';
import JokeComponent from './Joke.vue';
import Pagination from './Pagination.vue';

const { jokes, currentPage, totalPages } = defineProps<{
  jokes: Joke[];
  currentPage: number;
  totalPages: number;
}>();

const emit = defineEmits<{
  (e: 'page-change', page: number): void;
  (e: 'joke-deleted', id: number): void;
  (e: 'joke-rated', joke: Joke): void;
}>();

async function handleDelete(id: number) {
  await jokeService.deleteJoke(id);
  emit('joke-deleted', id);
}

async function handleRate(id: number, value: number) {
  const response = await jokeService.updateJokeRating(id, value);
  emit('joke-rated', response);
}
</script>

<style scoped>
.joke-list {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0 1rem;
  box-sizing: border-box;
}

.joke-list-container {
  width: 800px;
}

@media (max-width: 800px) {
  .joke-list {
    padding: 0 0.5rem;
  }
  
  .joke-list-container {
    width: 100%;
  }
}
</style>