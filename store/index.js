import Vue from 'vue'
import Vuex from 'vuex'
import category from './modules/category'
import language from './modules/language'
import book from './modules/book'


Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    category,
    language,
    book
  },
  strict: debug,
})