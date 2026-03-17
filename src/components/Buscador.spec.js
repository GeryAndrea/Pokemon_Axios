import { mount } from '@vue/test-utils';
import Buscador from '@/components/Buscador.vue';

describe('Buscador.vue - TDD (Test-Driven Development)', () => {
  
  test('Renderiza un elemento input', () => {
    const wrapper = mount(Buscador);
    const input = wrapper.find('input');
    
    expect(input.exists()).toBe(true);
  });

  test('Al escribir en el input, emite evento "buscar" con el texto ingresado', async () => {
    const wrapper = mount(Buscador);
    const input = wrapper.find('input');
    
    await input.setValue('pikachu');
    
    expect(wrapper.emitted()).toHaveProperty('buscar');
    expect(wrapper.emitted('buscar')[0]).toEqual(['pikachu']);
  });

  test('El input tiene el placeholder exacto: "Buscar..."', () => {
    const wrapper = mount(Buscador);
    const input = wrapper.find('input');
    
    expect(input.attributes('placeholder')).toBe('Buscar...');
  });
});
