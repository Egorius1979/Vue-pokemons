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
    isInit: false,
    types: [],
    subtypes: [],
    selectedType: null,
    selectedSubtype: null,
    hasLoaded: false,
    pokeCard: {},
    error: null,
  },
  mutations: {
    GET_POKEMONS(state, res) {
      state.pokemonsList = res.data;
      state.totalPages = Math.ceil(res.headers['total-count'] / state.pokesPerPage);
      state.hasLoaded = true;
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
    SET_INITIALIZED(state) {
      state.isInit = true;
    },
    SET_TYPE(state, type) {
      state.selectedType = type;
    },
    SET_SUBTYPE(state, subtype) {
      state.selectedSubtype = subtype;
    },
    IS_LOADING(state) {
      state.hasLoaded = false;
      state.error = null;
    },
    GET_CARD(state, poke) {
      state.pokeCard = poke.card;
      state.hasLoaded = true;
    },
    SET_ERROR(state, error) {
      state.error = `Упс, что-то пошло не так. ${error}. Пожалуйста, обновите страницу чуть позже`;
    },
  },
  actions: {
    getPokemonList({ state, commit }, type, subtype) {
      commit('IS_LOADING');
      return axios(`${url}/cards`, {
        params: {
          pageSize: 12,
          page: state.currentPage,
          types: state.selectedType || type,
          subtype: state.selectedSubtype || subtype,
        },
      }).then((res) => commit('GET_POKEMONS', res)).catch((err) => commit('SET_ERROR', err));
    },
    getType({ commit }) {
      return axios(`${url}/types`).then((res) => commit('GET_TYPES', res.data));
    },
    getSubTypes({ commit }) {
      return axios(`${url}/subtypes`).then((res) => commit('GET_SUBTYPES', res.data));
    },
    getPokeById({ commit }, id) {
      commit('IS_LOADING');
      return axios(`${url}/cards/${id}`).then((res) => commit('GET_CARD', res.data))
        .catch((err) => commit('SET_ERROR', err));
    },
  },
  modules: {},
});
