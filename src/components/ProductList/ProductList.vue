<template>
  <ul class="catalog__list">
      <ProductItem v-for="product of products" :key="product.id" :product="product"/>
  </ul>
</template>
<script>
import ProductItem from './ProductItem.vue';

export default {
  components: {
    ProductItem,
  },
  props: ['products'],
};
</script>
