import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pokemonsList: [],
  },
  mutations: {
    GET_POKEMONS(state, data) {
      state.pokemonsList = data;
    },
  },
  actions: {
    getPokemonList({ commit }, page) {
      return axios('https://api.pokemontcg.io/v2/cards', {
        params: {
          pageSize: 15,
          page: page || 1,
        },
      }).then((res) => commit('GET_POKEMONS', res.data));
    },
  },
  modules: {},
});
