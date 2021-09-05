<template>
    <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">Каталог</h1>
      <span class="content__info"> {{ countProduct }} товаров </span>
    </div>
    <div class="content__catalog">
      <ProductFilter />
      <section class="catalog">
        <div class="cp-spinner cp-bubble" v-if="productLoading"></div>
        <div v-if="errorLoading">
          Ошибка загрузки. Пожалуйста, обновите страницу
          <button class="research" @click="loadProducts"> Попробовать еще раз</button>
          </div>
        <ProductList :products="products" />
        <Pagination />
      </section>
    </div>
  </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ProductList from './ChoiseProductPage/ProductList/ProductList.vue';
import Pagination from './ChoiseProductPage/Pagination/Pagination.vue';
import ProductFilter from './ChoiseProductPage/ProductFilter/ProductFilter.vue';

export default {
  components: {
    ProductList,
    Pagination,
    ProductFilter,
  },
  created() {
    this.loadProducts();
    this.loadColors();
    this.loadCategory();
  },
  computed: {
    ...mapGetters({
      products: 'getProductList',
      page: 'getNumberPage',
      limitProduct: 'getLimitProduct',
      countProduct: 'getCountProducts',
      productLoading: 'getProductLoading',
      errorLoading: 'geterrorLoading',
    }),
  },
  methods: {
    ...mapActions([
      'loadProducts',
      'loadColors',
      'loadCategory',
    ]),
  },
  watch: {
    page() {
      this.loadProducts();
    },
  },
};
</script>

<style>
.research {
    color: #fff;
    border-radius: 10px;
    border: 0;
    display: inline-block;
    text-align: center;
    font-size: 15px;
    padding: 4px;
    padding-left: 15px;
    padding-right: 15px;
    background-color: #5fba7d;
}
.cp-spinner {
    width: 48px;
    height: 48px;
    display: inline-block;
    box-sizing: border-box;
    position: relative;
    top:40%;
    left: 50%;
}
.cp-bubble {
    border-radius: 50%;
    width: 24px;
    height: 24px;
    display: inline-block;
    box-sizing: border-box;
    background: #58bd55;
    animation: cp-bubble-animate 1s linear infinite
}

.cp-bubble:before {
    border-radius: 50%;
    content: " ";
    width: 24px;
    height: 24px;
    display: inline-block;
    box-sizing: border-box;
    background-color: #58bd55;
    position: absolute;
    left: -30px;
    animation: cp-bubble-animate-before 1s ease-in-out infinite
}

.cp-bubble:after {
    border-radius: 50%;
    content: " ";
    width: 24px;
    height: 24px;
    display: inline-block;
    box-sizing: border-box;
    background-color: #58bd55;
    position: absolute;
    right: -30px;
    animation: cp-bubble-animate-after 1s ease-in-out infinite
}

@keyframes cp-bubble-animate {
    0% {
        opacity: .5;
        transform: scale(1) translateX(0)
    }
    25% {
        opacity: 1;
        transform: scale(1.1) translateX(-15px)
    }
    50% {
        opacity: 1;
        transform: scale(1.2) translateX(15px)
    }
    100% {
        opacity: .5;
        transform: scale(1) translateX(0)
    }
}

@keyframes cp-bubble-animate-before {
    0% {
        opacity: .5;
        transform: scale(1)
    }
    25% {
        transform: scale(1.1)
    }
    100%, 50% {
        opacity: 1;
        transform: scale(1)
    }
}

@keyframes cp-bubble-animate-after {
    0%, 50% {
        opacity: .5;
        transform: scale(1)
    }
    50% {
        transform: scale(1.1)
    }
    100%, 75% {
        opacity: 1;
        transform: scale(1)
    }
}
</style>
