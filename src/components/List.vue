<template>
  <b-container class="mt-1" fluid="lg">
    <div class="list-sidebar">
      <div
           class="cards"
           :class="pokemonsList.length > 0 && pokemonsList.length < pokesPerPage
             ? 'cards-last-page' : ''"
      >
        <div v-if="hasLoaded && !pokemonsList.length" class="cards__not-at-all">
          <p>Нет таких покемонов</p>
        </div>
        <div v-if="error" class="m-5 text-center text-white">{{error}}</div>
        <div v-for="poke in pokemonsList"
             v-show="isLoad"
             :key="poke.id"
             class="cards__card"
             @click="modal(poke)"
        >
          <img
            :src="poke.imageUrl"
            :alt="poke.title"
            class="cards__poke-img"
            @load="imgLoaded"
          />
          <p class="cards__card-poke-name">{{ poke.name }}</p>
        </div>
        <div v-if="!isLoad && !error && pokemonsList.length || !hasLoaded" class="spin-flex">
          <b-spinner label="Loading..."
                     class="spinner"
          />
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
              <p><b>subtype:</b> "{{modalPoke.subtype}}"</p>
              <p><b>series:</b> "{{modalPoke.series}}"</p>
              <b-button variant="info"
                        :to="`/pokemon/${modalPoke.id}`"
              >
                More details...
              </b-button>
            </b-col>
          </b-row>
        </b-modal>
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
      isLoad: false,
      imgCount: 0,
    };
  },
  mounted() {
    if (!this.isInit) {
      this.$store.commit('SET_INITIALIZED');
      this.$store.dispatch('getPokemonList');
    }
  },
  computed: {
    pokemonsList() {
      return this.$store.state.pokemonsList.cards || [];
    },
    hasLoaded() {
      return this.$store.state.hasLoaded;
    },
    error() {
      return this.$store.state.error;
    },
    pokesPerPage() {
      return this.$store.state.pokesPerPage;
    },
    isInit() {
      return this.$store.state.isInit;
    },
    isSideBar() {
      return this.$store.state.isSideBar;
    },
  },
  methods: {
    modal(poke) {
      this.modalPoke = poke;
      this.modalShow = !this.modalShow;
    },
    imgLoaded() {
      this.imgCount += 1;
      if (this.imgCount === this.pokemonsList.length) {
        this.isLoad = true;
      }
    },
  },
  watch: {
    $route() {
      this.isLoad = false;
      this.imgCount = 0;
      if (this.$route.name !== 'DetailsPage') {
        this.$store.commit('SET_PAGE', this.$route.query.page || 1);
        if (!this.isSideBar) {
          this.$store.commit('SET_TYPE', this.$route.params.currentType);
          this.$store.commit('SET_SUBTYPE', this.$route.params.currentSubType);
        }
      }
      this.$store.dispatch('getPokemonList');
      if (this.isSideBar) {
        this.$store.commit('SET_IS_SIDEBAR', false);
      }
    },
  },
};

</script>

<style lang="scss" scoped>
$black: #000;

.list-sidebar {
  display: flex;
  flex-direction: column-reverse;
  @media (min-width: 576px) {
    flex-direction: row;
    justify-content: space-around;
  }
}

.cards {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: #808000;
  @media (min-width: 576px) {
    margin-top: 5px;
    width: 65%;
    box-shadow: 7px 7px 15px $black;
    border-radius: 5px;
  }
  @media (min-width: 992px) {
    width: 70%;
  }

  &-last-page {
    align-items: flex-start;
  }

  &__not-at-all {
    font-size: 24px;
    display: flex;
    align-items: center;
    @media (min-width: 992px) {
      font-size: 36px;
    }
  }

  &__card {
    background-color: #2F4F4F;
    border-radius: 5px;
    margin: 5px;
    color:  white;
    text-shadow: 2px 2px 4px $black;

    &:hover {
      box-shadow: 5px 5px 5px $black;
      color: #DEB887;
      font-weight: bold;
    }
    &-poke-name {
      margin: 3px auto;
      max-width: fit-content;
    }
  }

  &__poke-img {
    height: 220px;
    width: auto;
    cursor: pointer;
    @media (min-width: 720px) {
      height: 250px;
    }
  }
}

.spin-flex {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: 576px) {
    width: 65%;
  }
  @media (min-width: 992px) {
    width: 67%;
  }
}

.spinner {
  width: 200px;
  height: 200px;
}

</style>
