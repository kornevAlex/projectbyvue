<template>
    <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        {{countProductInCart}} товара
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul v-if="productList.length > 0" class="cart__list">
             <CartItem v-for="product of productList" :key="product.id" :product="product" />
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{allIn | formatNumbers}} Р</span>
          </p>

          <router-link tag="button" :to="{name: 'order'}"
          class="cart__button button button--primery" type="submit" v-show="productList.length">
            Оформить заказ
          </router-link>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import { mapGetters } from 'vuex';
import formatNumbers from '@/utils/formatNumber';
import CartItem from './CartItem.vue';

export default {
  components: {
    CartItem,
  },
  computed: {
    ...mapGetters({
      productList: 'getProductInCart',
      allIn: 'getTotalCost',
      countProductInCart: 'getCountProduct',
    }),
  },
  filters: {
    formatNumbers,
  },
};
</script>

<style>

</style>
