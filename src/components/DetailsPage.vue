<template >
  <div class="bg">
    <b-container>
      <div v-if="hasLoaded" class="card">
        <img :src="pokeCard.imageUrlHiRes" alt="image" class="card__image">
        <div class="card__details">
          <h2 class="text-center text-primary"><b>"{{pokeCard.name}}"</b></h2>
          <hr color="dark">
          <b-row>
            <b-col cols="7">
              <p><b>Type: </b>
                <span v-for="(type, index) in pokeCard.types" :key="index">"{{type}}"</span>
              </p>
              <p><b>Subtype: </b>"{{pokeCard.subtype}}"</p>
              <p><b>Supertype: </b>"{{pokeCard.supertype}}"</p>
            </b-col>
            <b-col>
              <p><b>Artist: </b>"{{pokeCard.artist}}"</p>
              <p><b>Series: </b>"{{pokeCard.series}}"</p>
              <p><b>Set: </b>"{{pokeCard.set}}"</p>
            </b-col>
          </b-row>
          <hr color="dark">
          <b-row>
            <b-col cols="7">
              <h2 class="mb-4"><b>Damage</b></h2>
              <p v-for="attack in pokeCard.attacks" :key="attack.name">
                "{{attack.name}}": <span class="text-danger"><b>{{attack.damage}}</b></span>
              </p>
            </b-col>
            <b-col>
              <h2 class="mb-4"><b>Attack cost</b></h2>
              <p v-for="attack in pokeCard.attacks" :key="attack.name">
                "{{attack.name}}": <span class="text-info"><b>
                {{attack.convertedEnergyCost}}</b></span>
              </p>
            </b-col>
          </b-row>
          <hr color="dark">
          <p v-for="(attack, index) in pokeCard.attacks" :key="attack.name" class="text-justify">
            <span v-if="attack.text" class="text-success">
              <b>Attack {{index + 1}}: </b>
            </span>{{attack.text}}
          </p>
        </div>
      </div>
      <div v-else-if="error" class="mt-3 text-center">{{error}}</div>
      <div v-else class="spin-flex">
        <b-spinner label="Loading..."
                   class="spinner"
        />
      </div>
    </b-container>
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
    error() {
      return this.$store.state.error;
    },
  },
};
</script>

<style lang="scss" scoped>
.bg {
  width: 100vw;
  height: 100vh;
}
.card {
  padding-top: 5vh;
  background: inherit;
  border: none;
  @media (min-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    text-align: start;
  }
  @media (min-width: 1024px) {
    flex-direction: row;
  }

  &__image {
    width: 70%;
    margin: 0 auto;
    @media (min-width: 768px) {
      width: 60%;
    }
    @media (min-width: 1024px) {
      width: 40%;
    }
  }

  &__details {
    width: 100%;
    @media (min-width: 768px) {
      font-size: larger;
    }
    @media (min-width: 1024px) {
      width: 60%;
      margin-left: 5%;
    }
  }
}
.spin-flex {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.spinner {
  width: 200px;
  height: 200px;
}
</style>
