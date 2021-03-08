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
    types: [],
    subtypes: [],
    selectedType: '',
    selectedSubtype: '',
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
    SET_TYPE(state, type) {
      state.selectedType = type;
    },
    SET_SUBTYPE(state, subtype) {
      state.selectedSubtype = subtype;
    },
  },
  actions: {
    getPokemonList({ state, commit }, page) {
      return axios(`${url}/cards`, {
        params: {
          pageSize: 12,
          page: page || 1,
          types: state.selectedType,
          subtypes: state.selectedSubtype,
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
