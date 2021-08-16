<template>
  <component :is="currentPageComponent" :pageProps="currentPageProps"/>
</template>

<script>
import MainPage from './components/MainPage/MainPage.vue';
import ProductPage from './components/MainPage/ProductPage/ProductPage.vue';
import PageNoFound from './components/MainPage/PageNoFound/PageNoFound.vue';
import eventBus from './eventBus';

const pages = {
  main: 'MainPage',
  product: 'ProductPage',
};

export default {
  name: 'App',
  components: {
    MainPage,
    ProductPage,
    PageNoFound,
  },
  created() {
    eventBus.$on('goToPage', (pageName, pageProps) => this.goToPage(pageName, pageProps));
  },
  data() {
    return {
      currentPage: 'main',
      currentPageProps: {

      },
    };
  },
  computed: {
    currentPageComponent() {
      return pages[this.currentPage] || 'PageNoFound';
    },
  },
  methods: {
    goToPage(pageName, pageProps) {
      this.currentPage = pageName;
      this.currentPageProps = pageProps;
    },
  },
};
</script>

<style lang="less"></style>
