<template>
  <div class="pagination">
    <b-button variant="success" @click="toStart">На первую</b-button>
    <b-button variant="outline-primary" @click="prev">Назад</b-button>
    <b-button variant="outline-primary" @click="next">Вперёд</b-button>
    <b-button variant="success" @click="toEnd">В конец</b-button>
    currentPage:  {{ currentPage }}
    totalPages: {{ maxPage }}
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  data() {
    return {
    };
  },
  computed: {
    maxPage() {
      return this.$store.state.totalPages;
    },
    currentPage: {
      get() {
        return this.$store.state.currentPage;
      },
      set(page) {
        this.$store.commit('SET_PAGE', page);
        this.getNewPage(this.currentPage);
      },
    },
  },
  methods: {
    getNewPage() {
      this.$store.dispatch('getPokemonList');
    },
    toStart() {
      if (this.currentPage > 1) {
        this.currentPage = 1;
      }
    },
    prev() {
      if (this.currentPage > 1) {
        this.currentPage -= 1;
      }
    },
    next() {
      if (this.currentPage < this.maxPage) {
        this.currentPage += 1;
      }
    },
    toEnd() {
      if (this.currentPage < this.maxPage) {
        this.currentPage = this.maxPage;
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.pagination {
  display: inline-block;
  margin: 30px auto 10px;

  button {
    font-size: 16px;
    margin-right: 10px;
    width: 150px;
  }
}
</style>
