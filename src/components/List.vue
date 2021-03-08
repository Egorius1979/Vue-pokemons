<template>
  <div>
    <div class="list-sidebar">
      <div class="cards">
        <div v-for="poke in pokemonsList" :key="poke.id" class="card">
          <img :src="poke.images.small" alt="" class="poke-img"/>
          <p>{{ poke.name }}</p>
        </div>
      </div>
      <side-bar/>
    </div>
    <pagination/>
  </div>
</template>

<script>
import Pagination from './Pagination.vue';
import SideBar from './SideBar.vue';

export default {
  components: { SideBar, Pagination },
  name: 'ListPage',
  created() {
    return Promise.all([
      this.$store.dispatch('getPokemonList'),
      this.$store.dispatch('getType'),
      this.$store.dispatch('getSubTypes'),
    ]);
  },
  computed: {
    pokemonsList() {
      return this.$store.state.pokemonsList.data;
    },
  },
};
</script>

<style lang="scss" scoped>
.list-sidebar {
  display: flex;
  justify-content: space-around;
}

.cards {
  width: 65%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;

  .card {
    margin: 10px;
  }

  .poke-img {
    height: 250px;
    width: auto;
  }
}
</style>
