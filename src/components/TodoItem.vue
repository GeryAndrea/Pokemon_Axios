<template>
  <div class="todo-item">
    <span>{{ texto }}</span>
    <button @click="eliminar">Eliminar</button>
  </div>
</template>

<script>
export default {
  name: 'TodoItem',
  props: {
    texto: {
      type: String,
      required: true
    }
  },
  methods: {
    eliminar() {
      this.$emit('eliminar');
    }
  }
};
</script>

<style scoped>
.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #ddd;
  margin: 5px 0;
}
button {
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
}
</style>
