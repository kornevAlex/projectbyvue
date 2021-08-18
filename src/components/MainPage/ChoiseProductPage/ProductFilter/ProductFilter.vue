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
            v-model.number='currentCategory'
          >
            <option
              v-for='category of Allcategory'
              :key='category.id'
              :value='category.id'
            >
              {{ category.title }}
            </option>
          </select>
        </label>
      </fieldset>

      <fieldset class='form__block'>
        <legend class='form__legend'>Цвет</legend>
        <ul class='colors'>
          <li class='colors__item' v-for="(color, i) of colorList" :key="i">
            <label class='colors__label'>
              <input
                class='colors__radio sr-only'
                type='radio'
                name='color'
                v-model="currentColor"
                :value="color" />
              <span class='colors__value' :style="`background-color: ${color}`"> </span
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
import state from '@/state/state';

export default {
  props: ['priceFrom', 'priceTo', 'categoryId', 'Allcategory', 'color'],
  data() {
    return {
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentCategory: 0,
      currentColor: '#73B6EA',
    };
  },
  watch: {
    priceFrom(val) {
      this.currentPriceFrom = val;
    },
    priceTo(val) {
      this.currentPriceTo = val;
    },
    categoryId(val) {
      this.currentCategory = val;
    },
    color(val) {
      this.currentColor = val;
    },
  },
  methods: {
    submit() {
      this.$emit('update:priceFrom', this.currentPriceFrom);
      this.$emit('update:priceTo', this.currentPriceTo);
      this.$emit('update:categoryId', this.currentCategory);
      this.$emit('update:color', this.currentColor);
    },
    reset() {
      this.$emit('update:priceFrom', 0);
      this.$emit('update:priceTo', 0);
      this.$emit('update:categoryId', 0);
      this.$emit('update:color', 0);
    },
  },
  computed: {
    colorList() {
      return state.colorList;
    },
  },
};
</script>
