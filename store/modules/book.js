import axios from 'axios'

// initial state
const state = {
          booksList : {books:[], error:null, loading:false},
          newBook:  {book:null, error:null, loading:false},
          activeBook : {book:null, error:null, loading:false, updated:false},
          deletedBooks : {books:[], error:null, loading:false},
          filterBook : ''
}

// getters
const getters = {}

// actions
const actions = {
  
  getAllBooks ({ commit }) {
     commit('FETCH_BOOKS');
     axios
      .get('book/fetch')
      .then(response => commit('FETCH_BOOKS_SUCCESS', response.data))
      .catch(error => commit('FETCH_BOOKS_FAILURE', error))
  },

  getBookByID ({ commit }, book_id) {
     commit('FETCH_BOOK');
     axios
      .get('book/fetch/' + book_id)
      .then(response => {
          commit('FETCH_BOOK_SUCCESS', response.data);
      })
       .catch(error => commit('FETCH_BOOK_FAILURE', error))
  },

  addBook ({ commit, dispatch }, book) {
     commit('ADD_BOOK');
     axios
      .post('book/add', {
        book_name : book.book_name,
        book_desc : book.book_desc
      })
      .then(response => {
          commit('ADD_BOOK_SUCCESS', response.data);
          dispatch('getAllBooks');
      })
      .catch(error => commit('ADD_BOOK_FAILURE', error))
  },
  
  saveBook ({ commit, dispatch }, book) {
     commit('SAVE_BOOK');
     axios
      .post('book/save', {
        book_id : book.book_id,
        book_name : book.book_name,
        book_desc : book.book_desc
      })
      .then(response => {
          commit('SAVE_BOOK_SUCCESS', response.data);
          dispatch('getAllBooks')
      })
      .catch(error => commit('SAVE_BOOK_FAILURE', error))
  },

  removeBooks ({ commit, dispatch }, book_ids) {
     commit('REMOVE_BOOKS')
     axios
      .post('book/remove', {
        book_ids : book_ids
      })
      .then(response => {
          commit('REMOVE_BOOKS_SUCCESS', response.data);
          dispatch('getAllBooks')
      })
      .catch(error => commit('REMOVE_BOOKS_FAILURE', error))
  }
}

// mutations
const mutations = {
FETCH_BOOKS(state) {
  state.booksList = {books:[], error:null, loading: true}},
FETCH_BOOKS_SUCCESS(state, payload){
  state.booksList = {books: payload, error:null, loading: false}},
FETCH_BOOKS_FAILURE(state, payload){
  state.booksList = {books: [], error : payload, loading: false}},  
RESET_BOOKS(state){
  state.booksList = {books:[], error:null, loading: false}},

ADD_BOOK(state){
  state.newBook = {book:null, error:null, loading: true}},
ADD_BOOK_SUCCESS(state, payload){
  state.newBook =  {book:payload, error:null, loading: false}},
ADD_BOOK_FAILURE(state, payload){
  state.newBook = {book:null, error:payload, loading: false}},
RESET_ADD_BOOK(state){
  state.newBook = {book:null, error:null, loading: false}}, 

FETCH_BOOK(state){
  state.activeBook = {book:null, error:null, loading: true, updated:false}},
FETCH_BOOK_SUCCESS(state, payload){
  state.activeBook = {book:payload, error:null, loading: false}},
FETCH_BOOK_FAILURE(state, payload){
  state.activeBook = {book:null, error:payload, loading: false}},
RESET_FETCH_BOOK(state){
  state.activeBook = {book:null, error:null, loading: false,updated:false}},  

SAVE_BOOK(state){
  state.activeBook =  {book:null, error:null, loading: true, updated:false}},
SAVE_BOOK_SUCCESS(state, payload){
  state.activeBook = {book:payload, error:null, loading: false, updated:true}},
SAVE_BOOK_FAILURE(state, payload){
  state.activeBook =  {book:null, error:payload, loading: false, updated:false}},
RESET_SAVE_BOOK(state){
  state.activeBook = {book:null, error:null, loading: false, updated:false}}, 

REMOVE_BOOKS(state){
  state.deletedBooks = {books:[], error:null, loading: true}},
REMOVE_BOOKS_SUCCESS(state, payload){
  state.deletedBooks =  {books:payload, error:null, loading: false}},
REMOVE_BOOKS_FAILURE(state, payload){
  state.deletedBooks =  {books:[], error:payload, loading: false}},
RESET_REMOVE_BOOKS(state){
  state.deletedBooks = {books:[], error:null, loading: false}},   
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}