<template>
  <div>
    <div class="list-sidebar">
      <div v-if="hasLoaded" class="cards">
        <div v-for="poke in pokemonsList"
             :key="poke.id"
             class="cards__card"
             @click="modal(poke)">
          <img :src="poke.imageUrl" alt="" class="cards__poke-img"/>
          <p>{{ poke.name }}</p>
        </div>
        <b-modal v-model="modalShow"
                 :title="modalPoke.name"
        >
          <img :src="modalPoke.imageUrl" alt="" class="cards__poke-img"/>
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
  </div>
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
}

.cards {
  width: 65%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  //align-items: stretch;

  &__card {
    background-color: lightblue;
    border-radius: 5px;
    margin: 5px;
  }

  &__poke-img {
    height: 250px;
    width: auto;
    cursor: pointer;
  }
  p {
    margin: 2px auto;
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
