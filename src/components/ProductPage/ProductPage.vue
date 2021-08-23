<template>
  <main class='content container'>
    <div class='content__top'>
      <ul class='breadcrumbs'>
        <li class='breadcrumbs__item'>
          <router-link class='breadcrumbs__link' :to="{name: 'main'}"> Каталог </router-link>
        </li>
        <li class='breadcrumbs__item'>
          <router-link class='breadcrumbs__link' :to="{name: 'main'}">
            {{category.title}}
            </router-link>
        </li>
        <li class='breadcrumbs__item'>
          <a class='breadcrumbs__link'> {{product.title}} </a>
        </li>
      </ul>
    </div>

    <section class='item'>
      <div class='item__pics pics'>
        <div class='pics__wrapper'>
          <img
            width='570'
            height='570'
            :src="productImage"
            :alt='product.title'
          />
        </div>
      </div>

      <div class='item__info'>
        <span class='item__code'>Артикул: {{product.id}}</span>
        <h2 class='item__title'>{{product.title}}</h2>
        <div class='item__form'>
          <form class='form' action='#' method='POST' @submit.prevent="pushProduct">
            <b class='item__price'> {{product.price | formatNumbers}} ₽ </b>

            <fieldset class='form__block'>
              <legend class='form__legend'>Цвет:</legend>
              <ul class='colors'>
                <li class='colors__item'>
                  <label class='colors__label'>
                    <input
                      class='colors__radio sr-only'
                      type='radio'
                      name='color-item'
                      value='blue'
                      checked=''
                    />
                    <span
                      class='colors__value'
                      style='background-color: #73b6ea'
                    >
                    </span>
                  </label>
                </li>
                <li class='colors__item'>
                  <label class='colors__label'>
                    <input
                      class='colors__radio sr-only'
                      type='radio'
                      name='color-item'
                      value='yellow'
                    />
                    <span
                      class='colors__value'
                      style='background-color: #ffbe15'
                    >
                    </span>
                  </label>
                </li>
                <li class='colors__item'>
                  <label class='colors__label'>
                    <input
                      class='colors__radio sr-only'
                      type='radio'
                      name='color-item'
                      value='gray' />
                    <span
                      class='colors__value'
                      style='background-color: #939393'
                    >
                    </span
                  ></label>
                </li>
              </ul>
            </fieldset>

            <div class='item__row'>
              <FormCounter :productBasket.sync="productBasket"/>
              <button class='button button--primery'>
                В корзину
              </button>
            </div>
          </form>
        </div>
      </div>

      <div class='item__desc'>
        <ul class='tabs'>
          <li class='tabs__item'>
            <a class='tabs__link tabs__link--current'> Описание </a>
          </li>
          <li class='tabs__item'>
            <a class='tabs__link' href='#'> Характеристики </a>
          </li>
          <li class='tabs__item'>
            <a class='tabs__link' href='#'> Гарантия </a>
          </li>
          <li class='tabs__item'>
            <a class='tabs__link' href='#'> Оплата и доставка </a>
          </li>
        </ul>

        <div class='item__content'>
          <p>
            Здесь могла быть ваша реклама
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import formatNumbers from '@/utils/formatNumber';
import FormCounter from '../Kit/FormCounter.vue';

export default {
  components: {
    FormCounter,
  },
  data() {
    return {
      productBasket: 1,
    };
  },
  computed: {
    ...mapGetters(['getProductList', 'getCategory']),
    product() {
      return this.getProductList.find((product) => product.id === +this.$route.params.id);
    },
    category() {
      return this.getCategory.find((cat) => cat.id === this.product.categoryId);
    },
    productImage() {
      return `../${this.product.img}`;
    },
  },
  methods: {
    pushProduct() {
      this.addProduct({
        id: this.product.id,
        count: this.productBasket,
      });
    },
    ...mapMutations(['addProduct']),
  },
  filters: {
    formatNumbers,
  },
};
</script>

<style scoped>
</style>
