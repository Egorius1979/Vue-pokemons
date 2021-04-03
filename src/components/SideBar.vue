<template>
  <div class="sidebar p-3 rounded">

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
                   class="mt-4"
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
  beforeMount() {
    if (!this.isInit) {
      this.$store.commit('SET_TYPE', this.$route.params.currentType);
      this.$store.commit('SET_SUBTYPE', this.$route.params.currentSubType);
      Promise.all([
        this.$store.dispatch('getType'),
        this.$store.dispatch('getSubTypes'),
      ]);
    }
  },
  computed: {
    typesList() {
      return this.$store.state.types;
    },
    subTypesList() {
      return this.$store.state.subtypes;
    },
    isInit() {
      return this.$store.state.isInit;
    },
    typeSelected: {
      get() {
        return this.$store.state.selectedType || null;
      },
      set(type) {
        this.$store.commit('SET_TYPE', type);
      },
    },
    subtypeSelected: {
      get() {
        return this.$store.state.selectedSubtype || null;
      },
      set(subType) {
        this.$store.commit('SET_SUBTYPE', subType);
      },
    },
  },
  methods: {
    setCurrentType() {
      this.$store.commit('SET_IS_SIDEBAR', true);

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
    },
    setCurrentSubType() {
      this.$store.commit('SET_IS_SIDEBAR', true);

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
