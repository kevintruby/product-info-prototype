<template>
  <div class="product-tile" @click="showDetails">
    <img :src="product.thumbnail_img_url" :alt="product.name" class="img-fluid" />
    <p>{{ product.name }}</p>
  </div>
</template>

<script>
  // vuex
  import { mapMutations } from 'vuex';

  export default {
    name: 'ProductResult',
    props: {
      // consider importing Product class to map the type definition for better prop validation
      product: { required: true, type: Object },
    },
    methods: {
      ...mapMutations('products', [
        'selectProduct',
      ]),
      showDetails () {
        this.selectProduct(this.product.id);
        this.$root.$emit('bv::show::modal', 'productDetails')
      },
    }
  }
</script>

<style lang="scss">
  @import "~bootstrap/scss/functions";
  @import "~bootstrap/scss/variables";
  @import "~bootstrap/scss/mixins/breakpoints";
  .product-tile {
    padding: 15px;
    &:hover {
      cursor: pointer;
      background: rgba($green, 0.2);
    }

    @include media-breakpoint-up(lg) {
      /*max-width: 250px;*/
    }
  }
</style>
