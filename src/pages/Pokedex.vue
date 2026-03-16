<template>
  <div class="pokedex">
    <h1>Pokédex con Vue + Axios</h1>
    
    <div v-if="isLoading" class="loading">
      <p>Cargando Pokémon...</p>
    </div>
    
    <div v-if="hasError" class="error">
      <p>{{ hasError }}</p>
    </div>

    <div v-if="!isLoading" class="favorites-badge">
      <span>❤️ Favoritos: {{ totalFavoritos }}</span>
    </div>

    <div class="pokemons-grid">
      <pokemon-card
        v-for="pokemon in filteredPokemons"
        :key="pokemon.id"
        :pokemon="pokemon"
      />
    </div>

    <div v-if="allFavorites.length > 0" class="favorites-section">
      <h2>Mis Favoritos</h2>
      <div class="favorites-grid">
        <pokemon-card
          v-for="pokemon in allFavorites"
          :key="pokemon.id"
          :pokemon="pokemon"
        />
      </div>
    </div>

    <!-- Modal de Detalles -->
    <div v-if="pokemonActual" class="modal-overlay" @click="cerrarModal">
      <div class="modal-content" @click.stop>
        <button class="close-btn" @click="cerrarModal">✕</button>
        
        <div v-if="isLoadingDetalle" class="loading-detalle">
          <p>Cargando detalles...</p>
        </div>
        
        <div v-else-if="pokemonActual">
          <div class="detalle-header">
            <img :src="pokemonActual.image" :alt="pokemonActual.name" class="detalle-image" />
            <div class="detalle-info">
              <h2>{{ pokemonActual.name }}</h2>
              <p><strong>ID:</strong> #{{ pokemonActual.id }}</p>
              <p><strong>Altura:</strong> {{ pokemonActual.height / 10 }} m</p>
              <p><strong>Peso:</strong> {{ pokemonActual.weight / 10 }} kg</p>
            </div>
          </div>

          <div class="detalle-section">
            <h3>Tipos</h3>
            <div class="tipos">
              <span v-for="tipo in pokemonActual.types" :key="tipo" class="tipo-tag">
                {{ tipo }}
              </span>
            </div>
          </div>

          <div class="detalle-section">
            <h3>Habilidades</h3>
            <div class="habilidades">
              <span v-for="habilidad in pokemonActual.abilities" :key="habilidad" class="habilidad-tag">
                {{ habilidad }}
              </span>
            </div>
          </div>

          <div class="detalle-section">
            <h3>Estadísticas</h3>
            <div class="stats">
              <div v-for="stat in pokemonActual.stats" :key="stat.stat.name" class="stat-bar">
                <label>{{ stat.stat.name }}</label>
                <div class="bar">
                  <div class="fill" :style="{ width: (stat.base_stat / 255) * 100 + '%' }"></div>
                </div>
                <span>{{ stat.base_stat }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import PokemonCard from '../components/PokemonCard.vue';

export default {
  name: 'Pokedex',
  components: {
    PokemonCard
  },
  methods: {
    cerrarModal() {
      this.$store.commit('SET_POKEMON_DETALLE', null);
    }
  },
  computed: {
    ...mapState(['loading', 'error', 'loadingDetalle']),
    ...mapGetters([
      'filteredPokemons', 
      'allFavorites', 
      'favoriteCount', 
      'isLoading', 
      'hasError',
      'totalFavoritos',
      'pokemonActual',
      'isLoadingDetalle'
    ])
  }
};
</script>

<style scoped>
.pokedex {
  padding: 20px;
  background: white;
  min-height: 100vh;
}

h1 {
  color: #333;
  margin-bottom: 20px;
  font-size: 2.2em;
  text-align: center;
  border-bottom: 3px solid #333;
  padding-bottom: 15px;
}

h2 {
  color: #333;
  margin: 30px 0 20px 0;
  font-size: 1.5em;
  border-bottom: 2px solid #999;
  padding-bottom: 10px;
}

.loading,
.error {
  text-align: center;
  padding: 30px;
  font-size: 1.1em;
  border: 2px solid #999;
  border-radius: 5px;
  margin: 20px 0;
  background: #f8f8f8;
  color: #333;
}

.error {
  border-color: #cc0000;
  color: #cc0000;
}

.favorites-badge {
  text-align: center;
  padding: 15px;
  background: #ddd;
  border: 2px solid #999;
  border-radius: 5px;
  margin: 20px 0;
  font-size: 1.1em;
  font-weight: bold;
  color: #333;
}

.pokemons-grid,
.favorites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 15px;
  margin: 20px 0;
}

.favorites-section {
  margin-top: 40px;
  padding-top: 20px;
  border-top: 2px solid #999;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border: 3px solid #333;
  border-radius: 5px;
  padding: 25px;
  max-width: 550px;
  max-height: 85vh;
  overflow-y: auto;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #cc0000;
  border: 1px solid #999;
  color: white;
  width: 28px;
  height: 28px;
  border-radius: 3px;
  cursor: pointer;
  font-size: 1.1em;
}

.close-btn:hover {
  background: #aa0000;
}

.loading-detalle {
  text-align: center;
  padding: 30px;
  color: #333;
  font-size: 1.1em;
}

.detalle-header {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  align-items: flex-start;
}

.detalle-image {
  width: 140px;
  height: 140px;
  object-fit: contain;
  border: 2px solid #999;
  border-radius: 3px;
  padding: 8px;
  background: #f5f5f5;
}

.detalle-info h2 {
  border: none;
  margin: 0 0 12px 0;
  color: #333;
  font-size: 1.4em;
}

.detalle-info p {
  color: #333;
  margin: 8px 0;
  font-size: 0.95em;
}

.detalle-section {
  margin: 18px 0;
  padding: 12px;
  background: #f8f8f8;
  border: 1px solid #ddd;
  border-radius: 3px;
}

.detalle-section h3 {
  color: #333;
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 1.1em;
}

.tipos,
.habilidades {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tipo-tag,
.habilidad-tag {
  background: #ddd;
  color: #333;
  padding: 6px 12px;
  border-radius: 3px;
  border: 1px solid #999;
  font-weight: normal;
  font-size: 0.9em;
}

.stats {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.stat-bar {
  display: grid;
  grid-template-columns: 90px 1fr 45px;
  align-items: center;
  gap: 10px;
}

.stat-bar label {
  color: #333;
  font-weight: bold;
  text-transform: capitalize;
  font-size: 0.85em;
}

.bar {
  background: white;
  border: 1px solid #999;
  height: 18px;
  border-radius: 2px;
  overflow: hidden;
}

.fill {
  background: #4CAF50;
  height: 100%;
  transition: width 0.3s ease;
}

.stat-bar span {
  color: #333;
  font-weight: bold;
  text-align: right;
  font-size: 0.9em;
}

@media (max-width: 768px) {
  .pokemons-grid,
  .favorites-grid {
    grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
  }

  .modal-content {
    margin: 15px;
  }

  .detalle-header {
    flex-direction: column;
  }
}
</style>