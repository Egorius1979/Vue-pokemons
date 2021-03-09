<template>
  <div class="sidebar shadow p-3 mb-5 bg-info rounded">

    <b-form-select v-model="typeSelected"
                   id="type"
                   @change="setCurrentType"
                   :options="typesList"
    >
      <template #first>
        <b-form-select-option :value="null" disabled>
          -- Please select an option --
        </b-form-select-option>
      </template>

    </b-form-select>
    {{ typeSelected }}

    <b-form-select v-model="subtypeSelected"
                   class="mt-3" id="subtype"
                   @change="setCurrentSubType"
                   :options="subTypesList"
    >
      <template #first>
        <b-form-select-option :value="null" disabled>
          -- Please select an option --
        </b-form-select-option>
      </template>
    </b-form-select>
    {{ subtypeSelected }}
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
  beforeMount() {
    this.typeSelected = this.typesList
      .filter((it) => it === this.$route.params.currentType).length
      ? this.$route.params.currentType : null;
    // return this.$store.state.selectedType;
    this.subtypeSelected = this.subTypesList
      .filter((it) => it === this.$route.params.currentSubType).length
      ? this.$route.params.currentSubType : null;
    // return this.$store.state.selectedSubtype;
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

      // if (!this.subtypeSelected && !this.typeSelected) {
      //   this.$router.push({
      //     name: 'ListPage',
      //   });
      // }

      if (!this.subtypeSelected) {
        this.$router.push({
          name: 'typePageFiltered',
          params: { currentType: this.typeSelected },
        });
      } else {
        this.$router.push({
          name: 'bothTypesPageFiltered',
          params: {
            currentType: this.typeSelected,
            currentSubType: this.subtypeSelected,
          },
        });
      }
    },
    setCurrentSubType() {
      this.$store.commit('SET_SUBTYPE', this.subtypeSelected);

      // if (!this.subtypeSelected && !this.typeSelected) {
      //   this.$router.push({
      //     name: 'ListPage',
      //   });
      // }

      if (!this.typeSelected) {
        this.$router.push({
          name: 'subtypePageFiltered',
          params: { currentSubType: this.subtypeSelected },
        });
      } else {
        this.$router.push({
          name: 'bothTypesPageFiltered',
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
  width: 30%;
  height: 75vh;
  background-color: #4dc0b5;
  margin-top: 10px;
}
</style>
