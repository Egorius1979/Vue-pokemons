<template >
  <div class="bg">
    <b-container>
      <b-card v-if="hasLoaded"
              :img-src="pokeCard.imageUrlHiRes"
              img-alt="Image"
              img-left
              img-width="40%"
              img-height="auto"
              align="left"
              tag="article"
              class="card"
      >
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

      </b-card>
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
  },
};
</script>

<style lang="scss" scoped>
.bg {
  //background: grey;
  width: 100vw;
  height: 100vh;
}
.card {
  padding-top: 5vh;
  background: inherit;
  border: none;

  &__details {
    font-size: larger;
    //color: white;
    margin-left: 5%;
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
