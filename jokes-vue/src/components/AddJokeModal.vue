<template>
  <div v-if="modelValue" class="modal-overlay">
    <div class="modal">
      <h2>Add New Joke</h2>
      <div class="form-group">
        <label>Type</label>
        <select v-model="joke.type">
          <option value="knock-knock">Knock Knock</option>
          <option value="one-liner">One Liner</option>
          <option value="qa">Question & Answer</option>
          <option value="wordplay">Wordplay</option>
        </select>
      </div>
      <div class="form-group">
        <label>Setup</label>
        <textarea
          v-model="joke.setup"
          placeholder="Enter the setup..."
          rows="2"
        ></textarea>
      </div>
      <div class="form-group">
        <label>Punchline</label>
        <textarea
          v-model="joke.punchline" 
          placeholder="Enter the punchline..."
          rows="2"
        ></textarea>
      </div>
      <div class="modal-actions">
        <button @click="$emit('update:modelValue', false)">Cancel</button>
        <button @click="submitJoke" :disabled="!isValid">Add Joke</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { jokeService } from '../services/jokeService';

defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'joke-added'): void;
}>();

const joke = ref({
  type: 'one-liner',
  setup: '',
  punchline: ''
});

const isValid = computed(() => {
  return joke.value.type && joke.value.setup.trim() && joke.value.punchline.trim();
});

async function submitJoke() {
  if (isValid.value) {
    const jokeData = {
      type: joke.value.type,
      setup: joke.value.setup.trim(),
      punchline: joke.value.punchline.trim()
    };
    await jokeService.createJoke(jokeData);
    joke.value = {
      type: 'one-liner',
      setup: '',
      punchline: ''
    };
    emit('update:modelValue', false);
    emit('joke-added');
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  color: black;
}

.form-group {
  margin-bottom: 1rem;
  color: rgb(64, 64, 64);
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

select, textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
}

button {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}

button:last-child {
  background: #4CAF50;
  color: white;
  border: none;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style> 