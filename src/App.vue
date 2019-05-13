<template>
  <div id="app">
    <!-- while this currently only serves a single page; including vue-router at the beginning will -->
    <!-- make future additions and scaling easier than to integrate within an established structure -->
    <!--<div id="nav">-->
      <!--<router-link to="/">Home</router-link> |-->
      <!--<router-link to="/about">About</router-link>-->
    <!--</div>-->
    <router-view />
  </div>
</template>

<script>
  // vuex
  import { mapActions } from 'vuex';

  // @todo: use mapState to watch for bearer token, and fetch products once set up in Vuex products module
  export default {
    name: 'AppContainer',
    mounted () {
      this.updateBearerToken();
    },
    methods: {
      ...mapActions('session', [
        'updateBearerToken',
      ]),
    }
  }
</script>

<style lang="scss">
  @import '~bootstrap/scss/bootstrap';
  @import '~bootstrap-vue/src/index.scss';

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  #nav {
    padding: 30px;
    a {
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>
