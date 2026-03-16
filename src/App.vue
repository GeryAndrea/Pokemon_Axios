<template>
  <div id="app">
    <SearchBar />
    <Pokedex />
  </div>
</template>

<script>
import SearchBar from './components/SearchBar.vue';
import Pokedex from './pages/Pokedex.vue';
import { mapActions } from 'vuex';

export default {
  name: 'App',
  components: {
    SearchBar,
    Pokedex
  },
  methods: {
    ...mapActions(['fetchPokemons'])
  },
  mounted() {
    this.fetchPokemons();
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  text-align: center;
  background: white;
  min-height: 100vh;
  font-family: Arial, sans-serif;
}
</style>