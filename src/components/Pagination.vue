<template>
  <div class="pagination">
    <b-pagination-nav
      :number-of-pages="maxPage || 1"
      v-model="currentPage"
      base-url="?page="
      first-text="First"
      prev-text="Prev"
      next-text="Next"
      last-text="Last"
    />
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  beforeMount() {
    this.$store.commit('SET_PAGE', this.$route.query.page || 1);
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
      },
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
