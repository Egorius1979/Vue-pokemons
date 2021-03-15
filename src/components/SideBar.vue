<template>
  <div class="sidebar shadow p-3 mb-5 bg-info rounded">

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
  mounted() {
    this.$store.dispatch('getPokemonList');
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
  width: 30%;
  height: 75vh;
  background-color: #4dc0b5;
  margin-top: 10px;
}
</style>
