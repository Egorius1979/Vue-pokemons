<template>
  <b-container class="mt-1">
    <div class="list-sidebar">
      <div v-if="hasLoaded" class="cards">
        <div v-for="poke in pokemonsList"
             :key="poke.id"
             class="cards__card"
             @click="modal(poke)">
          <img :src="poke.imageUrl" alt="" class="cards__poke-img"/>
          <p cards__poke-name>{{ poke.name }}</p>
        </div>
        <b-modal v-model="modalShow"
                 :title="modalPoke.name"
                 header-bg-variant="dark"
                 header-text-variant="light"
                 hide-footer
        >
          <b-row>
            <b-col>
              <img :src="modalPoke.imageUrl" alt="" class="cards__poke-img"/>
            </b-col>
            <b-col>
                <p><b>id:</b> {{ modalPoke.id }}</p>
                <p><b>type:</b> {{modalPoke.types}}</p>
                <p><b>subtype:</b> {{modalPoke.subtype}}</p>
                <p><b>series:</b> {{modalPoke.series}}</p>
                <b-button variant="info"
                          :to="`/${modalPoke.id}`"
                >
                  More details...
                </b-button>
            </b-col>
          </b-row>
        </b-modal>
      </div>
      <div v-else class="spin-flex">
        <b-spinner label="Loading..."
                   class="spinner"
        />
      </div>
      <side-bar/>
    </div>
    <pagination/>
  </b-container>
</template>

<script>
import Pagination from './Pagination.vue';
import SideBar from './SideBar.vue';

export default {
  components: { SideBar, Pagination },
  name: 'ListPage',
  data() {
    return {
      modalShow: false,
      modalPoke: {},
    };
  },
  computed: {
    pokemonsList() {
      return this.$store.state.pokemonsList.cards;
    },
    hasLoaded() {
      return this.$store.state.hasLoaded;
    },
  },
  methods: {
    modal(poke) {
      this.modalPoke = poke;
      this.modalShow = !this.modalShow;
    },
  },
};

</script>

<style lang="scss" scoped>
.list-sidebar {
  display: flex;
  justify-content: space-around;
  //background-color: #8B4513;
  //width: 100vw;
  //height: 92vh;
  //margin: auto;
  //@media (min-width: 1440px) {
  //  width: 70vw;
  //}
}

.cards {
  width: 70%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  //border-radius: 10px;
  //background-color: #FFFFE0;
  //box-shadow: 7px 7px 15px #000;

  &__card {
    background-color: lightblue;
    border-radius: 5px;
    margin: 5px;
    &:hover {
      box-shadow: 7px 7px 15px #000;
      background-color: cyan;
    }
  }

  &__poke-img {
    height: 250px;
    width: auto;
    cursor: pointer;
  }
  p {
    margin: 2px auto;
    max-width: fit-content;
  }
}
.spin-flex {
  width: 65%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.spinner {
  width: 200px;
  height: 200px;
}

</style>
