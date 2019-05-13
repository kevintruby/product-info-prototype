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
  import { mapActions, mapState } from 'vuex';

  export default {
    name: 'AppContainer',
    mounted () {
      this.updateBearerToken();
    },
    computed: {
      ...mapState('session', [
        'api_bearer_token',
      ]),
    },
    watch: {
      api_bearer_token: function (new_val, old_val) {
        // sanity check on data type
        if (new_val && new_val.constructor === String && new_val.length && old_val === '')
          this.getProducts();
      },
    },
    methods: {
      ...mapActions('products', [
        'getProducts',
      ]),
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
  /*#nav {*/
  /*  padding: 30px;*/
  /*  a {*/
  /*    font-weight: bold;*/
  /*    color: #2c3e50;*/
  /*    &.router-link-exact-active {*/
  /*      color: #42b983;*/
  /*    }*/
  /*  }*/
  /*}*/

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
