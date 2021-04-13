<template>
  <div class="pagination">
    <b-pagination-nav
      :number-of-pages="maxPage || 1"
      :value="currentPage"
      base-url="?page="
      first-text="First"
      prev-text="Prev"
      next-text="Next"
      last-text="Last"
      class="d-none d-sm-block"
      pills
      use-router
    />
    <b-pagination-nav
      :number-of-pages="maxPage || 1"
      :value="currentPage"
      base-url="?page="
      first-text="First"
      prev-text="Prev"
      next-text="Next"
      last-text="Last"
      class="d-block d-sm-none"
      size="sm"
      use-router
    />
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  beforeMount() {
    if (!this.isInit) {
      this.$store.commit('SET_PAGE', this.$route.query.page || 1);
    }
  },
  computed: {
    maxPage() {
      return this.$store.state.totalPages;
    },
    currentPage() {
      return this.$store.state.currentPage;
    },
    isInit() {
      return this.$store.state.isInit;
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
