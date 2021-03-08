<template>
  <div class="sidebar shadow p-3 mb-5 bg-info rounded">

    <b-form-select v-model="typeSelected" id="type" @change="setCurrentType">
      <b-form-select-option :value="null" disabled>
        -- Please select type --
      </b-form-select-option>
      <b-form-select-option
        v-for="(type, index) in typesList"
        :key="index"
        :value="type"
      >
        {{ type }}
      </b-form-select-option>
    </b-form-select>
    {{currentType}}

    <b-form-select v-model="subtypeSelected" class="mt-3" id="subtype" @change="setCurrentSubType">
      <b-form-select-option :value="null" disabled>
        -- Please select subtype --
      </b-form-select-option>
      <b-form-select-option
        v-for="(subtype, index) in subTypesList"
        :key="index"
        :value="subtype"
      >
        {{ subtype }}
      </b-form-select-option>
    </b-form-select>
    {{currentSubType}}

  </div>
</template>

<script>
export default {
  name: 'SideBar',
  data() {
    return {
      typeSelected: null,
      subtypeSelected: null,
    };
  },
  computed: {
    typesList() {
      return this.$store.state.types;
    },
    subTypesList() {
      return this.$store.state.subtypes;
    },
    currentType() {
      return this.$store.state.selectedType;
    },
    currentSubType() {
      return this.$store.state.selectedSubtype;
    },
  },
  methods: {
    setCurrentType() {
      return this.$store.commit('SET_TYPE', this.typeSelected);
    },
    setCurrentSubType() {
      return this.$store.commit('SET_SUBTYPE', this.subtypeSelected);
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
