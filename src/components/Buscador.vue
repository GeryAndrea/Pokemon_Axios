<template>
  <div class="buscador">
    <input
      type="text"
      placeholder="Buscar..."
      @input="buscar"
    />
  </div>
</template>

<script>
export default {
  name: 'Buscador',
  methods: {
    buscar(event) {
      this.$emit('buscar', event.target.value);
    }
  }
};
</script>

<style scoped>
.buscador {
  margin: 20px 0;
}

input {
  padding: 10px;
  width: 300px;
  border: 1px solid #ddd;
  border-radius: 3px;
}
</style>
