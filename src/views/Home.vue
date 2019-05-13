<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <div v-infinite-scroll="getProducts" class="container mt-5">
      <h3>Click a product for more info</h3>

      <!-- products API results -->
      <transition-group name="fade" tag="div" class="row">
        <product-result v-for="product in products" :key="product.id" :product="product"
                        class="col col-6 col-lg-2" />
      </transition-group>

      <transition name="fade">
        <p v-if="!product_limit_reached"><em>Scroll for more products...</em></p>
      </transition>
    </div>

    <!-- Product details modal -->
    <b-modal id="productDetails" centered ok-only size="lg" title="Product Info">
      <div>
        <img :src="selected_product.detail_img_url" :alt="selected_product.name" class="img-fluid mb-5" />
        <p><strong>Name: </strong>{{ selected_product.name }}</p>
        <p><strong>Description: </strong>{{ selected_product.description }}</p>
        <p><strong>Price: </strong>{{ selected_product.price }}</p>
        <img v-if="selected_product.is_organic" :src="selected_product.badges.organic.badge_url"
             alt="Organic Product" class="img-fluid" />
      </div>
    </b-modal>
  </div>
</template>

<script>
  // vuex
  import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';

  // @ is an alias to /src
  import ProductResult from '@/components/ProductResult.vue';

  // Bootstrap components
  import BModal from 'bootstrap-vue/es/components/modal/modal';

  // infinite scroll plugin
  import infiniteScroll from 'vue-infinite-scroll'

  /**
   * directly handling scroll events is not a specialty of mine, so i opted to use a library that can be
   * imported and attached as a reusable directive. comes with several options that may improve performance.
   * currently seems effective enough with the checks added to the getProducts() call to prevent simultaneous
   * requests. these options can be considered more if greater efficiency is desired, i.e. reducing event
   * firing/handling.
   */

  export default {
    name: 'Home',
    components: {
      BModal,
      ProductResult,
    },
    directives: {
      infiniteScroll,
    },
    mounted () {
      this.$root.$on('bv::hide::modal', this.clearSelectedProduct)
    },
    computed: {
      ...mapGetters('products', [
        'product_limit_reached',
        'selected_product',
      ]),
      ...mapState('products', [
        'products',
        'selected_product_id',
      ]),
    },
    methods: {
      ...mapActions('products', [
        'getProducts',
      ]),
      ...mapMutations('products', [
        'clearSelectedProduct',
      ]),
    }
  }
</script>

<style lang="scss">
  .home {
    padding-top: 50px;
  }
</style>
