import { createStore } from 'vuex';
import axios from 'axios';

const persistencePlugin = (store) => {
  store.subscribe((mutation, state) => {
    localStorage.setItem('pokedex-favorites', JSON.stringify(state.favorites));
  });
};

export default createStore({
  plugins: [persistencePlugin],
  state: {
    pokemons: [],
    pokemonDetalle: null,
    favorites: JSON.parse(localStorage.getItem('pokedex-favorites') || '[]'),
    loading: false,
    loadingDetalle: false,
    error: null,
    errorDetalle: null,
    searchQuery: ''
  },
  
  mutations: {
    SET_POKEMONS(state, pokemons) {
      state.pokemons = pokemons;
    },
    SET_POKEMON_DETALLE(state, pokemon) {
      state.pokemonDetalle = pokemon;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_LOADING_DETALLE(state, loading) {
      state.loadingDetalle = loading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    SET_ERROR_DETALLE(state, error) {
      state.errorDetalle = error;
    },
    SET_SEARCH_QUERY(state, query) {
      state.searchQuery = query;
    },
    ADD_FAVORITE(state, pokemon) {
      if (!state.favorites.find(f => f.id === pokemon.id)) {
        state.favorites.push({
          ...pokemon,
          apodo: null
        });
      }
    },
    REMOVE_FAVORITE(state, pokemonId) {
      state.favorites = state.favorites.filter(f => f.id !== pokemonId);
    },
    UPDATE_FAVORITE_APODO(state, { pokemonId, apodo }) {
      const favorite = state.favorites.find(f => f.id === pokemonId);
      if (favorite) {
        favorite.apodo = apodo;
      }
    },
    UPDATE_FAVORITE(state, updatedPokemon) {
      const index = state.favorites.findIndex(f => f.id === updatedPokemon.id);
      if (index !== -1) {
        state.favorites[index] = updatedPokemon;
      }
    }
  },
  
  actions: {
    async fetchPokemons({ commit }) {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
        const pokemons = response.data.results.map((pokemon, index) => ({
          id: index + 1,
          name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
          url: pokemon.url
        }));
        commit('SET_POKEMONS', pokemons);
      } catch (error) {
        commit('SET_ERROR', 'Error al cargar Pokémon');
        console.error('Error:', error);
      } finally {
        commit('SET_LOADING', false);
      }
    },
    
    async fetchDetalle({ commit }, pokemonId) {
      commit('SET_LOADING_DETALLE', true);
      commit('SET_ERROR_DETALLE', null);
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        const detalles = {
          id: response.data.id,
          name: response.data.name.charAt(0).toUpperCase() + response.data.name.slice(1),
          height: response.data.height,
          weight: response.data.weight,
          types: response.data.types.map(t => t.type.name),
          abilities: response.data.abilities.map(a => a.ability.name),
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${response.data.id}.png`,
          stats: response.data.stats
        };
        commit('SET_POKEMON_DETALLE', detalles);
        return detalles;
      } catch (error) {
        commit('SET_ERROR_DETALLE', 'Error al cargar detalle del Pokémon');
        console.error('Error:', error);
        return null;
      } finally {
        commit('SET_LOADING_DETALLE', false);
      }
    },
    
    addFavorite({ commit }, pokemon) {
      commit('ADD_FAVORITE', pokemon);
    },
    
    removeFavorite({ commit }, pokemonId) {
      commit('REMOVE_FAVORITE', pokemonId);
    },
    
    updateFavoritoApodo({ commit }, { pokemonId, apodo }) {
      commit('UPDATE_FAVORITE_APODO', { pokemonId, apodo });
    },
    
    updateFavorite({ commit }, pokemon) {
      commit('UPDATE_FAVORITE', pokemon);
    },
    
    setSearchQuery({ commit }, query) {
      commit('SET_SEARCH_QUERY', query);
    }
  },
  
  getters: {
    allFavorites: (state) => state.favorites,
    
    totalFavoritos: (state) => state.favorites.length,
    
    esFavorito: (state) => (pokemonId) => {
      return state.favorites.some(f => f.id === pokemonId);
    },
    
    isFavorite: (state) => (pokemonName) => {
      return state.favorites.some(f => f.name === pokemonName);
    },
    
    filteredPokemons: (state) => {
      return state.pokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    },
    
    pokemonActual: (state) => state.pokemonDetalle,
    
    favoriteCount: (state) => state.favorites.length,
    isLoading: (state) => state.loading,
    isLoadingDetalle: (state) => state.loadingDetalle,
    hasError: (state) => state.error,
    hasErrorDetalle: (state) => state.errorDetalle
  }
});

