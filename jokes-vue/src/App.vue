<template>
  <div class="app">
    <h1>Joke Collection</h1>
    
    <JokeList
      :jokes="jokes"
      :current-page="currentPage"
      :total-pages="totalPages"
      @page-change="loadPage"
      @joke-deleted="handleJokeDeleted"
      @joke-rated="handleJokeRated"
    />
    
    <button class="add-joke-btn" @click="showAddModal = true">
      Add New Joke
    </button>
    
    <AddJokeModal
      v-model="showAddModal"
      @joke-added="handleJokeAdded"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Joke } from './types/joke';
import { jokeService } from './services/jokeService';
import JokeList from './components/JokeList.vue';
import AddJokeModal from './components/AddJokeModal.vue';

const jokes = ref<Joke[]>([]);
const currentPage = ref(1);
const totalPages = ref(1);
const showAddModal = ref(false);

async function loadJokes() {
  const { jokes: _jokes, totalPages: _totalPages } = await jokeService.getJokes(currentPage.value, 20);
  jokes.value = _jokes;
  totalPages.value = _totalPages;
}

async function loadPage(page: number) {
  currentPage.value = page;
  await loadJokes();
}

function handleJokeDeleted(id: number) {
  jokes.value = jokes.value.filter(joke => joke._id !== id);
  loadJokes();
}

function handleJokeRated(updatedJoke: Joke) {
  const index = jokes.value.findIndex(joke => joke._id === updatedJoke._id);
  if (index !== -1) {
    jokes.value[index] = { ...jokes.value[index], ...updatedJoke };
  }
}

function handleJokeAdded() {
  loadJokes();
}

onMounted(() => {
  loadJokes();
});
</script>

<style>
.app {
  max-width: 1200px;
  margin: 0 auto;
}

.add-joke-btn {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: #4CAF50;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
}
</style>
