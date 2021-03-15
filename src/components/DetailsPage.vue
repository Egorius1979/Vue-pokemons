<template>
  <b-card v-if="hasLoaded"
          :title="pokeCard.name"
          :img-src="pokeCard.imageUrlHiRes"
          img-alt="Image"
          img-left
          img-width="40%"
          tag="article"
          class="mb-2"
  >
    <p>name: {{pokeCard.name}}</p>
  </b-card>
  <div v-else class="spin-flex">
    <b-spinner label="Loading..."
               class="spinner"
    />
  </div>
</template>

<script>
export default {
  name: 'DetailsPage',
  mounted() {
    return this.$store.dispatch('getPokeById', this.$route.params.id);
  },
  computed: {
    hasLoaded() {
      return this.$store.state.hasLoaded;
    },
    pokeCard() {
      return this.$store.state.pokeCard;
    },
  },
};
</script>

<style lang="scss" scoped>
.spin-flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
.spinner {
  width: 200px;
  height: 200px;
}
</style>
