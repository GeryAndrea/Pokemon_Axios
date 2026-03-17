import { mount } from '@vue/test-utils';
import axios from 'axios';

jest.mock('axios');

const ComponentoConAPI = {
  template: `
    <div>
      <div v-if="cargando">Cargando...</div>
      <div v-if="error">Error: {{ error }}</div>
      <div v-if="datos" class="datos">
        <h2>{{ datos.name }}</h2>
        <p>{{ datos.description }}</p>
      </div>
    </div>
  `,
  data() {
    return {
      datos: null,
      cargando: false,
      error: null
    };
  },
  async mounted() {
    this.cargando = true;
    try {
      const response = await axios.get('/api/pokemon/1');
      this.datos = response.data;
    } catch (err) {
      this.error = 'No se pudieron cargar los datos';
    } finally {
      this.cargando = false;
    }
  }
};

describe('Mock de API con Jest y Axios - Bonus', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('Renderiza correctamente los datos mockeados de la API', async () => {
    const datosMockeados = {
      name: 'Pikachu',
      description: 'Pokémon eléctrico'
    };

    axios.get.mockResolvedValue({ data: datosMockeados });

    const wrapper = mount(ComponentoConAPI);
    
    await new Promise(resolve => setTimeout(resolve, 50));
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.datos').exists()).toBe(true);
    expect(wrapper.text()).toContain('Pikachu');
    expect(wrapper.text()).toContain('Pokémon eléctrico');
  });

  test('Maneja errores correctamente cuando la API falla', async () => {
    axios.get.mockRejectedValue(new Error('Error de red'));

    const wrapper = mount(ComponentoConAPI);
    
    await new Promise(resolve => setTimeout(resolve, 50));
    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain('Error: No se pudieron cargar los datos');
  });

  test('Muestra estado de carga mientras se obtienen datos', async () => {
    axios.get.mockImplementation(
      () => new Promise(resolve => setTimeout(() => resolve({ data: {} }), 200))
    );

    const wrapper = mount(ComponentoConAPI);
    
    await new Promise(resolve => setTimeout(resolve, 10));
    expect(wrapper.text()).toContain('Cargando...');

    await new Promise(resolve => setTimeout(resolve, 250));
    await wrapper.vm.$nextTick();

    expect(wrapper.text()).not.toContain('Cargando...');
  });
});
