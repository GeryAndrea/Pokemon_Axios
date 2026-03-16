import axios from 'axios';

export async function fetchPokemons() {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
    return response.data.results.map((pokemon, index) => ({
      name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
    }));
  } catch (error) {
    console.error('Error fetching pokemons:', error);
    return [];
  }
}