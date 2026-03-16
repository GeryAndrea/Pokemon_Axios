<template>
  <div class="pokemon-card">
    <button 
      @click="toggleFavorite"
      :class="{ favorite: esFavoritoPokemon }"
      class="fav-btn-top"
    >
      {{ esFavoritoPokemon ? '❤️' : '🤍' }}
    </button>

    <img :src="pokemon.image" :alt="pokemon.name" />
    <h3>{{ pokemon.apodo || pokemon.name }}</h3>
    <p class="id">ID: {{ pokemon.id }}</p>
    
    <div class="actions">
      <button 
        v-if="esFavoritoPokemon"
        @click="mostrarEdicion = !mostrarEdicion"
        class="edit-btn"
      >
        ✏️ Apodo
      </button>
      
      <button 
        @click="verDetalle"
        class="detail-btn"
      >
        👁️ Ver
      </button>
    </div>

    <!-- Editor de Apodo -->
    <div v-if="mostrarEdicion && esFavoritoPokemon" class="apodo-editor">
      <input 
        v-model="apodonuevo" 
        placeholder="Escribe un apodo..."
        @keyup.enter="guardarApodo"
        @keyup.esc="cancelarEdicion"
      />
      <button @click="guardarApodo" class="save-btn">Guardar</button>
      <button @click="cancelarEdicion" class="cancel-btn">Cancelar</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'PokemonCard',
  props: {
    pokemon: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      mostrarEdicion: false,
      apodonuevo: this.pokemon.apodo || ''
    };
  },
  methods: {
    ...mapActions(['addFavorite', 'removeFavorite', 'updateFavoritoApodo', 'fetchDetalle']),
    
    toggleFavorite() {
      if (this.esFavoritoPokemon) {
        this.removeFavorite(this.pokemon.id);
      } else {
        this.addFavorite(this.pokemon);
      }
    },
    
    guardarApodo() {
      this.updateFavoritoApodo({
        pokemonId: this.pokemon.id,
        apodo: this.apodonuevo || null
      });
      this.mostrarEdicion = false;
    },
    
    cancelarEdicion() {
      this.apodonuevo = this.pokemon.apodo || '';
      this.mostrarEdicion = false;
    },
    
    verDetalle() {
      this.fetchDetalle(this.pokemon.id);
    }
  },
  computed: {
    ...mapGetters(['esFavorito']),
    esFavoritoPokemon() {
      return this.esFavorito(this.pokemon.id);
    }
  },
  watch: {
    'pokemon.apodo': function() {
      this.apodonuevo = this.pokemon.apodo || '';
    },
    mostrarEdicion: function(nuevoValor) {
      if (nuevoValor) {
        this.apodonuevo = this.pokemon.apodo || '';
      }
    }
  }
};
</script>

<style scoped>
.pokemon-card {
  background: #f0f0f0;
  padding: 12px;
  border: 2px solid #ccc;
  border-radius: 5px;
  text-align: center;
  position: relative;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.fav-btn-top {
  position: absolute;
  top: 5px;
  right: 5px;
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
  transition: transform 0.2s;
}

.fav-btn-top:hover {
  transform: scale(1.2);
}

.pokemon-card img {
  width: 100%;
  height: 100px;
  object-fit: contain;
  margin-bottom: 8px;
}

.pokemon-card h3 {
  color: #333;
  margin: 8px 0;
  font-size: 1.1em;
  text-transform: capitalize;
}

.id {
  color: #666;
  font-size: 0.9em;
  margin: 5px 0 10px 0;
}

.actions {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-bottom: 10px;
}

.edit-btn,
.detail-btn {
  padding: 6px 10px;
  border: 1px solid #999;
  background: #e8e8e8;
  color: #333;
  border-radius: 3px;
  cursor: pointer;
  font-size: 0.85em;
  transition: background 0.2s;
}

.edit-btn:hover,
.detail-btn:hover {
  background: #d0d0d0;
}

.apodo-editor {
  margin-top: 10px;
  padding: 8px;
  background: #e0e0e0;
  border: 1px dashed #999;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.apodo-editor input {
  padding: 6px;
  border: 1px solid #999;
  border-radius: 3px;
  font-size: 0.9em;
  background: white;
  color: #333;
}

.apodo-editor input:focus {
  outline: none;
  border-color: #666;
  background: #fff;
}

.save-btn,
.cancel-btn {
  padding: 5px 10px;
  border: 1px solid #999;
  border-radius: 3px;
  cursor: pointer;
  font-size: 0.85em;
  transition: background 0.2s;
}

.save-btn {
  background: #90EE90;
  color: #000;
}

.save-btn:hover {
  background: #7CCD7C;
}

.cancel-btn {
  background: #FFB6C6;
  color: #000;
}

.cancel-btn:hover {
  background: #FF9CB8;
}
</style>