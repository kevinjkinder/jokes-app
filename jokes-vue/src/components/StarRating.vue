<template>
  <div class="star-rating">
    <span
      v-for="i in 5"
      :key="i"
      class="star"
      :class="{ 'star-filled': i <= modelValue, 'rated': rated }"
      @click="handleStarClick(i)"
    >
      ★
    </span>
    <span class="rating-value">{{ modelValue }}</span>
    <span v-if="rated" class="checkmark">rated</span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const rated = ref(false);
defineProps<{
  modelValue: number;
  rating: {
    amount: number;
    value: number;
  }
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void;
}>();

function handleStarClick(value: number) {
  if (!rated.value) {
    rated.value = true;
    emit('update:modelValue', value);
  }
}
</script>

<style scoped>
.star-rating {
  display: inline-flex;
  gap: 4px;
  align-items: center;
}

.star {
  cursor: pointer;
  font-size: 24px;
  color: #ddd;
}

.star-filled {
  color: #ffd700;
}

.rated {
  cursor: default;
}

.checkmark {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #4CAF50;
  border-radius: 12px;
  color: white;
  font-size: 12px;
  font-weight: bold;
  padding: 2px 8px;
  opacity: 0;
  animation: fadeIn 0.3s ease forwards;
  animation-delay: 0.2s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style> 