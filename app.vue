<template>
  <div class="col-md-8 col-md-offset-2">
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="/" id="logo"> <img src="/images/logo.png" alt="vue logo" style="display: inline"> BookVue</a>
        </div>
        <ul class="nav navbar-nav">
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/category">Category</router-link></li>
          <li><router-link to="/language">Language</router-link></li>
          <li><router-link to="/about">About</router-link></li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li v-if="$auth.check()"><router-link to="/dashboard"><span class="glyphicon glyphicon-dashboard"></span> Dashboard</router-link></li>
           <li v-if="!$auth.check()"><router-link to="/register"><span class="glyphicon glyphicon-user"></span> Register</router-link></li>
          <li v-if="!$auth.check()"> <router-link to="/login"> <span class="glyphicon glyphicon-log-in"></span> Login</router-link></li>
          <li v-if="$auth.check()"><a href="#" @click.prevent="$auth.logout()"> <span class="glyphicon glyphicon-log-out"></span> Logout</a></li>
       </ul>
      </div>
    </nav>  
    <div class="col-md-12">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'app',
    computed : mapState({
      loading : state => state.category.categoriesList.loading  
    }),

    created() {
     this.$store.dispatch('category/getAllCategories');
     this.$store.dispatch('language/getAllLanguages');
     this.$store.dispatch('book/getAllBooks');

  }
}
</script>

<style>

</style>