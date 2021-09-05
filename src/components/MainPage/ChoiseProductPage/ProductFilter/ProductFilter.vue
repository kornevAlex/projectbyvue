<template>
  <aside class='filter'>
    <h2 class='filter__title'>Фильтры</h2>

    <form
      class='filter__form form'
      action='#'
      method='get'
      @submit.prevent='submit'
    >
      <fieldset class='form__block'>
        <legend class='form__legend'>Цена</legend>
        <label class='form__label form__label--price'>
          <input
            class='form__input'
            type='text'
            name='min-price'
            v-model='currentPriceFrom'
          />
          <span class='form__value'>От</span>
        </label>
        <label class='form__label form__label--price'>
          <input
            class='form__input'
            type='text'
            name='max-price'
            v-model='currentPriceTo'
          />
          <span class='form__value'>До</span>
        </label>
      </fieldset>

      <fieldset class='form__block'>
        <legend class='form__legend'>Категория</legend>
        <label class='form__label form__label--select'>
          <select
            class='form__select'
            type='text'
            name='category'
            v-model='currentCategory'>
            <option
              v-for='category of category'
              :key='category.id'
              :value='category.id'>
              {{ category.title }}
            </option>
          </select>
        </label>
      </fieldset>

      <fieldset class='form__block'>
        <legend class='form__legend'>Цвет</legend>
        <ul class='colors'>
          <li class='colors__item' v-for="({code, title, id}) of colorList" :key="id">
            <label class='colors__label'>
              <input
                class='colors__radio sr-only'
                type='radio'
                :name="title"
                v-model="currentColor"
                :value="id" />
              <span class='colors__value' :style="`background-color: ${code}`"> </span
            ></label>
          </li>
        </ul>
      </fieldset>

      <button class='filter__submit button button--primery' type='submit'>
        Применить
      </button>
      <button class='filter__reset button button--second' type='button' @click.prevent="reset">
        Сбросить
      </button>
    </form>
  </aside>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  data() {
    return {
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentCategory: 0,
      currentColor: 0,
    };
  },
  watch: {
    currentPriceFrom(val) {
      this.changeMinPrice(val);
    },
    currentPriceTo(val) {
      this.changeMaxPrice(val);
    },
    currentCategory(val) {
      this.changeCategories(val);
    },
    currentColor(val) {
      this.changeColorId(val);
    },
  },
  methods: {
    submit() {
      this.loadProducts();
    },
    reset() {
      const [one] = this.category;
      this.currentPriceFrom = 0;
      this.currentPriceTo = 0;
      this.currentCategory = one.id;
      this.currentColor = 0;
      this.loadProducts();
    },
    ...mapActions(['loadProducts']),
    ...mapMutations(['changeMinPrice', 'changeMaxPrice', 'changeCategories', 'changeColorId']),
  },
  computed: {
    ...mapGetters({
      category: 'getCategory',
      colorList: 'getColorList',
      priceFrom: 'getPriceFrom',
      priceTo: 'getPriceTo',
      categoryId: 'getCategoriesId',
      color: 'getColorId',
    }),
  },
};
</script>
