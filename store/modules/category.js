import axios from 'axios'

// initial state
const state = {
          categoriesList : {categories:[], error:null, loading:false},
          newCategory:  {category:null, error:null, loading:false},
          activeCategory : {category:null, error:null, loading:false, updated:false},
          deletedCategories : {categories:[], error:null, loading:false},
          filterCategory : ''
}

// getters
const getters = {}

// actions
const actions = {
  
  getAllCategories ({ commit }) {
     commit('FETCH_CATEGORIES');
     axios
      .get('category/fetch')
      .then(response => commit('FETCH_CATEGORIES_SUCCESS', response.data))
      .catch(error => commit('FETCH_CATEGORIES_FAILURE', error))
  },

  getCategoryByID ({ commit }, cat_id) {
     commit('FETCH_CATEGORY');
     axios
      .get('category/fetch/' + cat_id)
      .then(response => {
          commit('FETCH_CATEGORY_SUCCESS', response.data);
      })
       .catch(error => commit('FETCH_CATEGORY_FAILURE', error))
  },

  addCategory ({ commit, dispatch }, category) {
     commit('ADD_CATEGORY');
     axios
      .post('category/add', {
        cat_name : category.cat_name,
        cat_desc : category.cat_desc
      })
      .then(response => {
          commit('ADD_CATEGORY_SUCCESS', response.data);
          dispatch('getAllCategories');
      })
      .catch(error => commit('ADD_CATEGORY_FAILURE', error))
  },
  
  saveCategory ({ commit, dispatch }, category) {
     commit('SAVE_CATEGORY');
     axios
      .post('category/save', {
        cat_id : category.cat_id,
        cat_name : category.cat_name,
        cat_desc : category.cat_desc
      })
      .then(response => {
          commit('SAVE_CATEGORY_SUCCESS', response.data);
          dispatch('getAllCategories')
      })
      .catch(error => commit('SAVE_CATEGORY_FAILURE', error))
  },

  removeCategories ({ commit, dispatch }, cat_ids) {
     commit('REMOVE_CATEGORIES')
     axios
      .post('category/remove', {
        cat_ids : cat_ids
      })
      .then(response => {
          commit('REMOVE_CATEGORIES_SUCCESS', response.data);
          dispatch('getAllCategories')
      })
      .catch(error => commit('REMOVE_CATEGORIES_FAILURE', error))
  }
}

// mutations
const mutations = {
FETCH_CATEGORIES(state) {
  state.categoriesList = {categories:[], error:null, loading: true}},
FETCH_CATEGORIES_SUCCESS(state, payload){
  state.categoriesList = {categories: payload, error:null, loading: false}},
FETCH_CATEGORIES_FAILURE(state, payload){
  state.categoriesList = {categories: [], error : payload, loading: false}},  
RESET_CATEGORIES(state){
  state.categoriesList = {categories:[], error:null, loading: false}},

ADD_CATEGORY(state){
  state.newCategory = {category:null, error:null, loading: true}},
ADD_CATEGORY_SUCCESS(state, payload){
  state.newCategory =  {category:payload, error:null, loading: false}},
ADD_CATEGORY_FAILURE(state, payload){
  state.newCategory = {category:null, error:payload, loading: false}},
RESET_ADD_CATEGORY(state){
  state.newCategory = {category:null, error:null, loading: false}}, 

FETCH_CATEGORY(state){
  state.activeCategory = {category:null, error:null, loading: true, updated:false}},
FETCH_CATEGORY_SUCCESS(state, payload){
  state.activeCategory = {category:payload, error:null, loading: false}},
FETCH_CATEGORY_FAILURE(state, payload){
  state.activeCategory = {category:null, error:payload, loading: false}},
RESET_FETCH_CATEGORY(state){
  state.activeCategory = {category:null, error:null, loading: false,updated:false}},  

SAVE_CATEGORY(state){
  state.activeCategory =  {category:null, error:null, loading: true, updated:false}},
SAVE_CATEGORY_SUCCESS(state, payload){
  state.activeCategory = {category:payload, error:null, loading: false, updated:true}},
SAVE_CATEGORY_FAILURE(state, payload){
  state.activeCategory =  {category:null, error:payload, loading: false, updated:false}},
RESET_SAVE_CATEGORY(state){
  state.activeCategory = {category:null, error:null, loading: false, updated:false}}, 

REMOVE_CATEGORIES(state){
  state.deletedCategories = {categories:[], error:null, loading: true}},
REMOVE_CATEGORIES_SUCCESS(state, payload){
  state.deletedCategories =  {categories:payload, error:null, loading: false}},
REMOVE_CATEGORIES_FAILURE(state, payload){
  state.deletedCategories =  {categories:[], error:payload, loading: false}},
RESET_REMOVE_CATEGORIES(state){
  state.deletedCategories = {categories:[], error:null, loading: false}},   
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}