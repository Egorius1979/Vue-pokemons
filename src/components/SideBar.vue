<template>
  <div class="sidebar p-3 mb-5 rounded">

    <b-form-select id="type"
                   v-model="typeSelected"
                   @change="setCurrentType"
                   :options="typesList"
    >
      <template #first>
        <b-form-select-option :value="null" disabled>
          -- Please select type --
        </b-form-select-option>
      </template>
    </b-form-select>

    <b-form-select id="subtype"
                   v-model="subtypeSelected"
                   class="mt-3"
                   @change="setCurrentSubType"
                   :options="subTypesList"
    >
      <template #first>
        <b-form-select-option :value="null" disabled>
          -- Please select subtype --
        </b-form-select-option>
      </template>
    </b-form-select>

  </div>
</template>

<script>

export default {
  name: 'SideBar',
  data() {
    return {
      typeSelected: this.$route.params.currentType || null,
      subtypeSelected: this.$route.params.currentSubType || null,
    };
  },
  beforeCreate() {
    return Promise.all([
      this.$store.dispatch('getType'),
      this.$store.dispatch('getSubTypes'),
    ]);
  },
  beforeMount() {
    this.$store.commit('SET_TYPE', this.$route.params.currentType);
    this.$store.commit('SET_SUBTYPE', this.$route.params.currentSubType);
  },
  computed: {
    typesList() {
      return this.$store.state.types;
    },
    subTypesList() {
      return this.$store.state.subtypes;
    },
  },
  methods: {
    setCurrentType() {
      this.$store.commit('SET_TYPE', this.typeSelected);
      this.$store.commit('SET_PAGE', 1);

      if (!this.subtypeSelected) {
        this.$router.push({
          name: 'TypePageFiltered',
          params: { currentType: this.typeSelected },
        });
      } else {
        this.$router.push({
          name: 'BothTypesPageFiltered',
          params: {
            currentType: this.typeSelected,
            currentSubType: this.subtypeSelected,
          },
        });
      }

      this.$store.dispatch('getPokemonList');
    },
    setCurrentSubType() {
      this.$store.commit('SET_SUBTYPE', this.subtypeSelected);
      this.$store.commit('SET_PAGE', 1);

      if (!this.typeSelected) {
        this.$router.push({
          name: 'SubtypePageFiltered',
          params: { currentSubType: this.subtypeSelected },
        });
      } else {
        this.$router.push({
          name: 'BothTypesPageFiltered',
          params: {
            currentType: this.typeSelected,
            currentSubType: this.subtypeSelected,
          },
        });
      }

      this.$store.dispatch('getPokemonList');
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  width: 100%;
  margin: auto;
  @media (min-width: 576px) {
    width: 35%;
    height: 75vh;
    margin: 5px 5px;
    background-color: #4dc0b5;
    box-shadow: 7px 7px 15px #000;
  }
  @media (min-width: 992px) {
    width: 25%;
  }
}
</style>
