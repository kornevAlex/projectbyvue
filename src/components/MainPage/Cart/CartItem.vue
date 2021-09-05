<template>
  <li class='cart__item product'>
    <div class='product__pic'>
      <img :src='product.image.file.url' width='120' height='120' alt='Название товара' />
    </div>
    <h3 class='product__title'>
      {{ product.title }}
    </h3>
    <span class='product__code'> Артикул: {{ product.id }} </span>

    <div class="product__counter form__counter">
      <button type="button" aria-label="Убрать один товар" @click="decr">
        <svg width="12" height="12" fill="currentColor">
          <use xlink:href="#icon-minus"></use>
        </svg>
      </button>

      <input type="text" name="count" readonly v-model="count" />

      <button type="button" aria-label="Добавить один товар" @click="inc">
        <svg width="12" height="12" fill="currentColor">
          <use xlink:href="#icon-plus"></use>
        </svg>
      </button>
    </div>

    <b class='product__price'>
      {{ (product.price * product.count) | formatNumbers }} Р
    </b>

    <button
      class='product__del button-del'
      type='button'
      aria-label='Удалить товар из корзины' @click="deleteProduct">
      <svg width='20' height='20' fill='currentColor'>
        <use xlink:href='#icon-close'></use>
      </svg>
    </button>
  </li>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import formatNumbers from '@/utils/formatNumber';

export default {
  props: ['product'],
  filters: {
    formatNumbers,
  },
  computed: {
    ...mapGetters({
      productList: 'getProductInCart',
      allIn: 'getTotalCost',
      countProductInCart: 'getCountProduct',
    }),
    count: {
      get() {
        return this.product.count;
      },
      set(value) {
        this.$store.commit('updateCountProduct', { id: this.product.id, count: value });
      },
    },
  },
  methods: {
    ...mapActions(['updateProductCart', 'deleteProductInBasket']),
    inc() {
      this.updateProductCart({
        count: this.product.count + 1,
        id: this.product.id,
      });
    },
    decr() {
      if (this.product.count > 1) {
        this.updateProductCart({
          count: this.product.count - 1,
          id: this.product.id,
        });
      }
    },
    deleteProduct() {
      this.deleteProductInBasket(this.product.id);
    },
  },
};
</script>

<style>
</style>
