<template>
  <div class="pagination">
    <b-button variant="success" @click="toStart">На первую</b-button>
    <b-button variant="outline-primary" @click="prev">Назад</b-button>
    <b-button variant="outline-primary" @click="next">Вперёд</b-button>
    <b-button variant="success" @click="toEnd">В конец</b-button>
        {{ currentPage }} {{ maxPage }}
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  data() {
    return {
      // currentPage: 1,
    };
  },
  computed: {
    maxPage() {
      return this.$store.state.totalPages;
    },
    currentPage() {
      return this.$store.state.currentPage;
    },
  },
  methods: {
    getNewPage(page) {
      this.$store.commit('SET_PAGE', page);
      this.$store.dispatch('getPokemonList');
    },
    toStart() {
      if (this.currentPage > 1) {
        this.getNewPage(1);
      }
    },
    prev() {
      if (this.currentPage > 1) {
        this.getNewPage(this.currentPage -= 1);
      }
    },
    next() {
      if (this.currentPage < this.maxPage) {
        this.getNewPage(this.currentPage += 1);
      }
    },
    toEnd() {
      if (this.currentPage < this.maxPage) {
        this.getNewPage(this.maxPage);
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.pagination {
  display: inline-block;
  margin: 30px auto;

  button {
    font-size: 16px;
    margin-right: 10px;
    width: 150px;
  }
}
</style>
