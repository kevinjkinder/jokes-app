<template>
  <div class="pagination">
    <button
      :disabled="currentPage === 1"
      @click="$emit('change', 1)"
    >
      First
    </button>
    <button
      class="nav-btn"
      :disabled="currentPage === 1"
      @click="$emit('change', currentPage - 1)"
    >
      ←
    </button>
    <div class="page-info">
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
    </div>
    <button
      class="nav-btn"
      :disabled="currentPage === totalPages"
      @click="$emit('change', currentPage + 1)"
    >
      →
    </button>
    <button
      :disabled="currentPage === totalPages"
      @click="$emit('change', totalPages)"
    >
      Last
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  currentPage: number;
  totalPages: number;
}>();

defineEmits<{
  (e: 'change', page: number): void;
}>();
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 2rem 0;
  align-items: center;
  flex-wrap: wrap;
  padding: 0 0.5rem;
}

.page-info {
  min-width: 120px;
  text-align: center;
  font-size: 1rem;
}

button {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  color: black;
  border-radius: 4px;
  transition: background-color 0.2s;
  font-size: 1rem;
}

.nav-btn {
  width: 44px;
  height: 44px;
  padding: 0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}


button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 600px) {
  .pagination {
    gap: 0.5rem;
  }

  button {
    padding: 0.75rem 1rem;
    min-width: 44px; /* Minimum touch target size */
  }

  .nav-btn {
    width: 44px;
    height: 44px;
  }

  .page-info {
    width: 100%;
    order: -1;
    margin-bottom: 0.5rem;
  }
}
</style> 