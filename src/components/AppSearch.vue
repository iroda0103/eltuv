<template>
  <div class="search-container">
    <input v-model="searchQuery" type="text" placeholder="Search for restaurants  food or products..."
      class="search-input" @input="updateSearchQuery" />
    <button class="search-btn">
      <!-- <i class="search-icon">🔍</i> -->
      <font-awesome-icon class="search-icon" :icon="['fas', 'search']" />
    </button>
  </div>

</template>
<script>
export default {
  name: 'AppSearch',
  props: {
  },
  data() {
    return {
      // searchQuery: ''
    };
  },
  emits: ['update:searchQuery'],
  methods: {
    updateSearchQuery(event) {
      this.$emit('update:searchQuery', event.target.value);
    }
  }   
};
</script>
<style>
.search-container {
  display: flex;
  /* margin-bottom: 24px; */
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--border-color);
  background: var(--bg-container);
  width: 123%;
}

.search-btn {
  background: transparent;
  border: none;
  padding: 0 12px;
  cursor: pointer;
}

.search-input {
  flex: 1;
  padding: 14px;
  border: none;
  outline: none;
  font-size: 16px;
  color: var(--text-primary);
  /* background: var(--card-bg); */
  background: transparent;
  width: 100%;
}
</style>