<template>
  <div>
    <div class="cards">
      <div v-for="poke in pokemonsList" :key="poke.id" class="card">
        <img :src="poke.images.small" alt=""/>
        <p>{{ poke.name }}</p>
      </div>
    </div>
    <pagination/>
  </div>
</template>

<script>
import Pagination from './Pagination.vue';

export default {
  components: { Pagination },
  name: 'ListPage',
  created() {
    return this.$store.dispatch('getPokemonList');
  },
  computed: {
    pokemonsList() {
      return this.$store.state.pokemonsList.data;
    },
  },
};
</script>

<style lang="scss" scoped>
.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;

  .card {
    margin-right: 10px;
  }
}
</style>
