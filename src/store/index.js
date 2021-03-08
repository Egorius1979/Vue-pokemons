import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const url = 'https://api.pokemontcg.io/v2';

export default new Vuex.Store({
  state: {
    pokesPerRage: 12,
    pokemonsList: [],
    totalPages: 0,
    types: [],
    subtypes: [],
  },
  mutations: {
    GET_POKEMONS(state, data) {
      state.pokemonsList = data;
      state.totalPages = Math.ceil(data.totalCount / state.pokesPerRage);
    },
    GET_TYPES(state, data) {
      state.types = data;
    },
    GET_SUBTYPES(state, data) {
      state.subtypes = data;
    },
  },
  actions: {
    getPokemonList({ commit }, page) {
      return axios(`${url}/cards`, {
        params: {
          pageSize: 12,
          page: page || 1,
        },
      }).then((res) => commit('GET_POKEMONS', res.data));
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
