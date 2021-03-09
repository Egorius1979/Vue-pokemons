import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const url = 'https://api.pokemontcg.io/v1';

export default new Vuex.Store({
  state: {
    pokesPerPage: 12,
    pokemonsList: [],
    totalPages: 0,
    currentPage: 1,
    types: [],
    subtypes: [],
    selectedType: null,
    selectedSubtype: null,
  },
  mutations: {
    GET_POKEMONS(state, res) {
      state.pokemonsList = res.data;
      state.totalPages = Math.ceil(res.headers['total-count'] / state.pokesPerPage);
    },
    GET_TYPES(state, data) {
      state.types = data.types.sort();
    },
    GET_SUBTYPES(state, data) {
      state.subtypes = data.subtypes.sort();
    },
    SET_PAGE(state, page) {
      state.currentPage = page;
    },
    SET_TYPE(state, type) {
      state.selectedType = type;
    },
    SET_SUBTYPE(state, subtype) {
      state.selectedSubtype = subtype;
    },
  },
  actions: {
    getPokemonList({ state, commit }) {
      return axios(`${url}/cards`, {
        params: {
          pageSize: 12,
          page: state.currentPage,
          types: state.selectedType,
          subtype: state.selectedSubtype,
        },
      }).then((res) => commit('GET_POKEMONS', res));
    },
    getType({ commit }) {
      return axios(`${url}/types`).then((res) => commit('GET_TYPES', res.data));
    },
    getSubTypes({ commit }) {
      return axios(`${url}/subtypes`).then((res) => commit('GET_SUBTYPES', res.data));
    },
  },
  modules: {},
});
