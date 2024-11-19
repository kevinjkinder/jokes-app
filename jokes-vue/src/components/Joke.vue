<template>
  <div class="joke-card">
    <div class="joke-content">
      <p class="joke-text">{{ joke.setup }}</p>
      <p class="punchline" :class="{ visible: isRevealed }">
        {{ joke.punchline }}
      </p>
    </div>
    <div class="joke-actions">
      <div class="rating-container">
        <StarRating
          v-model="joke.rating.value"
          :rating="joke.rating"
          @update:modelValue="handleRating"
        />
      </div>
      <div class="reveal-container">
        <button 
          class="reveal-btn"
          @click="isRevealed = !isRevealed"
        >
          {{ isRevealed ? 'Hide' : 'Reveal' }}
        </button>
      </div>
      <div class="delete-container">
        <button v-if="!showDeleteConfirm" class="delete-btn" @click="showDeleteConfirm = true">Delete</button>
        <div v-else class="delete-confirm">
          <span>Are you sure?</span>
          <button class="confirm-btn" @click="handleDelete">Yes</button>
          <button class="cancel-btn" @click="showDeleteConfirm = false">No</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { type Joke } from '../types/joke';
import StarRating from './StarRating.vue';

const props = defineProps<{
  joke: Joke;
}>();

const emit = defineEmits<{
  (e: 'delete', id: number): void;
  (e: 'rate', id: number, value: number): void;
}>();

const isRevealed = ref(false);
const showDeleteConfirm = ref(false);

function handleRating(value: number) {
  emit('rate', props.joke._id, value);
}

function handleDelete() {
  emit('delete', props.joke._id);
  showDeleteConfirm.value = false;
}
</script>

<style scoped>
.joke-card {
  padding: 1rem;
  margin: 1rem 0;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
  color: black;
}

.joke-content {
  min-height: 100px;
}

.joke-text {
  margin-bottom: 1rem;
  font-size: 1.1rem;
  line-height: 1.5;
}

.punchline {
  margin: 0;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease;
  margin-bottom: 1rem;
  font-size: 1.4rem;
  /* font-style: italic; */
  font-weight: bold;
  line-height: 1.5;
}

.punchline.visible {
  opacity: 1;
  visibility: visible;
}

.joke-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  border-top: 1px solid #eee;
  padding-top: 1rem;
  gap: 1rem;
  font-size: 0.8rem;
}

.reveal-container {
  flex: 1 1 0;
  display: flex;
  justify-content: center;
}
.reveal-btn {
  background: #4CAF50;
}

.rating-container {
  flex: 1 1 0;
  display: flex;
  justify-content: flex-start;
}

.delete-container {
  flex: 1 1 0;
  display: flex;
  justify-content: flex-end;
}

.delete-confirm {
  display: flex;
  align-items: center;
  gap: 4px;
}
.delete-btn {
  background: #f44336;
}
.confirm-btn {
  background: #f44336;
}
.cancel-btn {
  background: #9d9d9d;
}

button {
  font-size: 0.8rem;
  padding: 0.5rem 1rem;
}

@media (max-width: 600px) {
  .joke-card {
    padding: 0.75rem;
  }

  .joke-actions {
    flex-direction: column;
    gap: 0.75rem;
  }

  .rating-container,
  .reveal-container,
  .delete-container {
    width: 100%;
    justify-content: center;
  }

  button {
    width: 100%;
  }

  .delete-confirm {
    width: 100%;
    flex-direction: column;
    gap: 0.5rem;
  }

  .delete-confirm span {
    text-align: center;
  }

  .delete-confirm button {
    width: 100%;
  }
}
</style> 