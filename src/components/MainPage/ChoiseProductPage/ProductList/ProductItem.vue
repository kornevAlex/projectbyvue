<template>
    <li class="catalog__item">
      <router-link class="catalog__pic"
      :to="{name: 'product', params: {id: product.id, categoryId: product.categoryId }}" >
        <img
          :src="product.image.file.url"
          alt="Название товара"
        />
      </router-link>

      <h3 class="catalog__title">
        <a href="#">
          {{ product.title }}
        </a>
      </h3>

      <span class="catalog__price"> {{ product.price | formatNumbers}} ₽ </span>

      <ul class="colors colors--black">
        <li class="colors__item" v-for="(colorItem, i) of product.colors" :key="i">
          <label class="colors__label">
            <input
              class="colors__radio sr-only"
              type="radio"
              :value="colorItem.code"
            />
            <span class="colors__value" :style="`background-color: ${colorItem.code}`">
            </span>
          </label>
        </li>
      </ul>
    </li>
</template>
<script>
import formatNumbers from '@/utils/formatNumber';

export default {
  props: ['product'],
  filters: {
    formatNumbers,
  },
};
</script>
<style lang="less">

</style>
