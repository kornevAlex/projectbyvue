<template>
    <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">Каталог</h1>
      <span class="content__info"> {{countProduct}} товаров </span>
    </div>
    <div class="content__catalog">
      <ProductFilter :priceFrom.sync="filterPriceFrom"
                     :priceTo.sync="filterPriceTo"
                     :categoryId.sync="filtercategoryId"
                     :Allcategory.sync="category"
                     :color.sync="filteredColor" />
      <section class="catalog">

        <ProductList :products="products" />
        <Pagination
          :page.sync="page"
          :count="countProduct"
          :productPerPages="productPerPages"
        />
      </section>
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex';
import ProductList from './ChoiseProductPage/ProductList/ProductList.vue';
import Pagination from './ChoiseProductPage/Pagination/Pagination.vue';
import ProductFilter from './ChoiseProductPage/ProductFilter/ProductFilter.vue';

export default {
  components: {
    ProductList,
    Pagination,
    ProductFilter,
  },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filtercategoryId: 0,
      page: 1,
      productPerPages: 3,
      filteredColor: 0,
    };
  },
  computed: {
    filteredProducts() {
      let filteredProduct = this.getProductList;

      if (this.filterPriceFrom > 0) {
        filteredProduct = filteredProduct.filter((el) => el.price >= this.filterPriceFrom);
      }
      if (this.filterPriceTo > 0) {
        filteredProduct = filteredProduct.filter((el) => el.price <= this.filterPriceTo);
      }
      if (this.filtercategoryId) {
        filteredProduct = filteredProduct.filter((el) => el.categoryId === this.filtercategoryId);
      }
      if (this.filteredColor) {
        filteredProduct = filteredProduct.filter((el) => el.colorList.includes(this.filteredColor));
      }

      return filteredProduct;
    },
    products() {
      const offset = (this.page - 1) * this.productPerPages;

      return this.filteredProducts.slice(offset, offset + this.productPerPages);
    },
    countProduct() {
      return this.filteredProducts.length;
    },
    ...mapGetters({
      category: 'getCategory',
      getProductList: 'getProductList',
    }),
  },
};
</script>

<style>

</style>
