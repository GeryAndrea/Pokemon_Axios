<template>
  <div class="search-bar">
    <input 
      type="text" 
      placeholder="Buscar Pokémon..." 
      @input="setSearchQuery($event.target.value)"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'SearchBar',
  methods: {
    ...mapActions(['setSearchQuery'])
  }
};
</script>

<style scoped>
.search-bar {
  margin: 20px 0;
  padding: 15px;
  background: #f0f0f0;
  border-bottom: 2px solid #999;
}

input {
  padding: 12px 15px;
  width: 100%;
  max-width: 400px;
  border: 2px solid #999;
  border-radius: 3px;
  background: white;
  color: #333;
  font-size: 1em;
}

input:focus {
  outline: none;
  border-color: #333;
  background: #fff;
}
</style>