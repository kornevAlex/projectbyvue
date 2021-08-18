<template>
  <main class='content container'>
    <div class='content__top'>
      <ul class='breadcrumbs'>
        <li class='breadcrumbs__item'>
          <a class='breadcrumbs__link' href='index.html'> Каталог </a>
        </li>
        <li class='breadcrumbs__item'>
          <a class='breadcrumbs__link' href='#' @click.prevent="goToPage('main')">
            {{category.title}}
            </a>
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
            :src='product.img'
            :alt='product.title'
          />
        </div>
      </div>

      <div class='item__info'>
        <span class='item__code'>Артикул: {{product.id}}</span>
        <h2 class='item__title'>{{product.title}}</h2>
        <div class='item__form'>
          <form class='form' action='#' method='POST'>
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
              <div class='form__counter'>
                <button type='button' aria-label='Убрать один товар' @click="decr">
                  <svg width='12' height='12' fill='currentColor'>
                    <use xlink:href='#icon-minus'></use>
                  </svg>
                </button>

                <input type='text' name='count' readonly v-model="productBasket"/>

                <button type='button' aria-label='Добавить один товар' @click="inc">
                  <svg width='12' height='12' fill='currentColor'>
                    <use xlink:href='#icon-plus'></use>
                  </svg>
                </button>
              </div>

              <button class='button button--primery' type='submit'>
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
import state from '@/state/state';
import goToPage from '@/utils/goToPage';
import formatNumbers from '@/utils/formatNumber';

export default {
  props: ['pageProps'],
  data() {
    return {
      productBasket: 1,
    };
  },
  computed: {
    product() {
      return state.products.find((product) => product.id === this.pageProps.id);
    },
    category() {
      return state.categories.find((cat) => cat.id === this.product.categoryId);
    },
  },
  methods: {
    goToPage,
    inc() {
      this.productBasket += 1;
    },
    decr() {
      if (this.productBasket > 1) {
        this.productBasket -= 1;
      }
    },
  },
  filters: {
    formatNumbers,
  },
};
</script>

<style>
</style>
