<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a @click.prevent="backPage"
        :class="{'pagination__link--disabled': page === 1}"
        class="pagination__link pagination__link--arrow"
        aria-label="Предыдущая страница">
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </a>
    </li>
    <li class="pagination__item" v-for="numberPage in countPage" :key="numberPage">
      <a @click.prevent="changePage(numberPage)"
      :class="{'pagination__link--current': numberPage === page}"
      class="pagination__link"
      href="#">
        {{numberPage}}
      </a>
    </li>
    <li class="pagination__item">
      <a @click.prevent="nextPage"
        class="pagination__link pagination__link--arrow"
        href="#"
        :class="{'pagination__link--disabled' :page === countPage}"
        aria-label="Следующая страница">
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  methods: {
    ...mapMutations(['backPage', 'nextPage', 'changePage']),
  },
  computed: {
    ...mapGetters({
      page: 'getNumberPage',
      limitProduct: 'getLimitProduct',
      countProduct: 'getCountProducts',
      countPage: 'countPage',
    }),
  },
};
</script>
<style lang="less"></style>
