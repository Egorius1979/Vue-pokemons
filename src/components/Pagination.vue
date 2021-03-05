<template>
  <div class="pagination">
    <button @click="toStart">На первую</button>
    <button @click="prev">Назад</button>
    <button @click="next">Вперёд</button>
    <button @click="toEnd">В конец</button>
    {{ currentPage }} {{ maxPage }}
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  data() {
    return {};
  },
  computed: {
    currentPage() {
      return this.$store.state.pokemonsList.page;
    },
    maxPage() {
      return this.$store.state.totalPages;
    },
  },
  methods: {
    getNewPage(page) {
      return this.$store.dispatch('getPokemonList', page);
    },
    toStart() {
      this.getNewPage(1);
    },
    prev() {
      if (this.currentPage > 1) {
        this.getNewPage(this.currentPage - 1);
      } else {
        this.getNewPage(1);
      }
    },
    next() {
      if (this.currentPage < this.maxPage) {
        this.getNewPage(this.currentPage + 1);
      } else {
        this.getNewPage(this.maxPage);
      }
    },
    toEnd() {
      this.getNewPage(this.maxPage);
    },
  },
};
</script>

<style lang='scss' scoped>
.pagination {
  margin: 30px 0;
}

button {
  font-size: 20px;
  margin-right: 10px;
}
</style>
