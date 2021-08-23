<template>
  <div class="form__counter" :class="{product__counter: isCard}">
    <button type="button" aria-label="Убрать один товар" @click="decr">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input type="text" name="count" readonly v-model="productBasket" />

    <button type="button" aria-label="Добавить один товар" @click="inc">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  props: ['productBasket', 'isCard'],
  methods: {
    inc() {
      this.$emit('update:productBasket', this.productBasket + 1);
    },
    decr() {
      if (this.productBasket > 1) {
        this.$emit('update:productBasket', this.productBasket - 1);
      } else {
        this.$emit('update:productBasket', this.productBasket);
      }
    },
  },
};
</script>

<style>
button {
  cursor: pointer;
}
</style>
