import { mount } from '@vue/test-utils';
import TodoItem from '@/components/TodoItem.vue';

describe('TodoItem.vue - Pruebas Unitarias Básicas', () => {
  
  test('Renderiza correctamente el texto pasado por la prop', () => {
    const texto = 'Comprar leche';
    const wrapper = mount(TodoItem, {
      props: {
        texto: texto
      }
    });
    
    expect(wrapper.text()).toContain(texto);
  });

  test('El botón de "Eliminar" existe en el DOM', () => {
    const wrapper = mount(TodoItem, {
      props: {
        texto: 'Tarea de prueba'
      }
    });
    
    const button = wrapper.find('button');
    expect(button.exists()).toBe(true);
    expect(button.text()).toBe('Eliminar');
  });

  test('Emite el evento "eliminar" cuando se hace clic en el botón', async () => {
    const wrapper = mount(TodoItem, {
      props: {
        texto: 'Tarea para eliminar'
      }
    });
    
    const button = wrapper.find('button');
    await button.trigger('click');
    
    expect(wrapper.emitted()).toHaveProperty('eliminar');
    expect(wrapper.emitted('eliminar')).toHaveLength(1);
  });
});
