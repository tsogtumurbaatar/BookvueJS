import axios from 'axios'

// initial state
const state = {
          languagesList : {languages:[], error:null, loading:false},
          newLanguage:  {language:null, error:null, loading:false},
          activeLanguage : {language:null, error:null, loading:false, updated:false},
          deletedLanguages : {languages:[], error:null, loading:false},
          filterLanguage : ''
}

// getters
const getters = {}

// actions
const actions = {
  
  getAllLanguages ({ commit }) {
     commit('FETCH_LANGUAGES');
     axios
      .get('lng/fetch')
      .then(response => commit('FETCH_LANGUAGES_SUCCESS', response.data))
      .catch(error => commit('FETCH_LANGUAGES_FAILURE', error))
  },

  getLanguageByID ({ commit }, lng_id) {
     commit('FETCH_LANGUAGE');
     axios
      .get('lng/fetch/' + lng_id)
      .then(response => {
          commit('FETCH_LANGUAGE_SUCCESS', response.data);
      })
       .catch(error => commit('FETCH_LANGUAGE_FAILURE', error))
  },

  addLanguage ({ commit, dispatch }, language) {
     commit('ADD_LANGUAGE');
     axios
      .post('lng/add', {
        lng_name : language.lng_name,
        lng_desc : language.lng_desc
      })
      .then(response => {
          commit('ADD_LANGUAGE_SUCCESS', response.data);
          dispatch('getAllLanguages');
      })
      .catch(error => commit('ADD_LANGUAGE_FAILURE', error))
  },
  
  saveLanguage ({ commit, dispatch }, language) {
     commit('SAVE_LANGUAGE');
     axios
      .post('lng/save', {
        lng_id : language.lng_id,
        lng_name : language.lng_name,
        lng_desc : language.lng_desc
      })
      .then(response => {
          commit('SAVE_LANGUAGE_SUCCESS', response.data);
          dispatch('getAllLanguages')
      })
      .catch(error => commit('SAVE_LANGUAGE_FAILURE', error))
  },

  removeLanguages ({ commit, dispatch }, lng_ids) {
     commit('REMOVE_LANGUAGES')
     axios
      .post('lng/remove', {
        lng_ids : lng_ids
      })
      .then(response => {
          commit('REMOVE_LANGUAGES_SUCCESS', response.data);
          dispatch('getAllLanguages')
      })
      .catch(error => commit('REMOVE_LANGUAGES_FAILURE', error))
  }
}

// mutations
const mutations = {
FETCH_LANGUAGES(state) {
  state.languagesList = {languages:[], error:null, loading: true}},
FETCH_LANGUAGES_SUCCESS(state, payload){
  state.languagesList = {languages: payload, error:null, loading: false}},
FETCH_LANGUAGES_FAILURE(state, payload){
  state.languagesList = {languages: [], error : payload, loading: false}},  
RESET_LANGUAGES(state){
  state.languagesList = {languages:[], error:null, loading: false}},

ADD_LANGUAGE(state){
  state.newLanguage = {language:null, error:null, loading: true}},
ADD_LANGUAGE_SUCCESS(state, payload){
  state.newLanguage =  {language:payload, error:null, loading: false}},
ADD_LANGUAGE_FAILURE(state, payload){
  state.newLanguage = {language:null, error:payload, loading: false}},
RESET_ADD_LANGUAGE(state){
  state.newLanguage = {language:null, error:null, loading: false}}, 

FETCH_LANGUAGE(state){
  state.activeLanguage = {language:null, error:null, loading: true, updated:false}},
FETCH_LANGUAGE_SUCCESS(state, payload){
  state.activeLanguage = {language:payload, error:null, loading: false}},
FETCH_LANGUAGE_FAILURE(state, payload){
  state.activeLanguage = {language:null, error:payload, loading: false}},
RESET_FETCH_LANGUAGE(state){
  state.activeLanguage = {language:null, error:null, loading: false,updated:false}},  

SAVE_LANGUAGE(state){
  state.activeLanguage =  {language:null, error:null, loading: true, updated:false}},
SAVE_LANGUAGE_SUCCESS(state, payload){
  state.activeLanguage = {language:payload, error:null, loading: false, updated:true}},
SAVE_LANGUAGE_FAILURE(state, payload){
  state.activeLanguage =  {language:null, error:payload, loading: false, updated:false}},
RESET_SAVE_LANGUAGE(state){
  state.activeLanguage = {language:null, error:null, loading: false, updated:false}}, 

REMOVE_LANGUAGES(state){
  state.deletedLanguages = {languages:[], error:null, loading: true}},
REMOVE_LANGUAGES_SUCCESS(state, payload){
  state.deletedLanguages =  {languages:payload, error:null, loading: false}},
REMOVE_LANGUAGES_FAILURE(state, payload){
  state.deletedLanguages =  {languages:[], error:payload, loading: false}},
RESET_REMOVE_LANGUAGES(state){
  state.deletedLanguages = {languages:[], error:null, loading: false}},   
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}