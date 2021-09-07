<template>
    <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'cart' }">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        {{basket.length}} товара
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormText :title="'ФИО'" :placeholder="'Введите ваше полное имя'"
            :error="formError.name" v-model="formData.name" />
            <BaseFormText :title="'Адрес'" :placeholder="'Введите ваш адрес'"
            :error="formError.name" v-model="formData.address" />
            <BaseFormText :title="'Телефон'" :placeholder="'Введите ваш телефон'"
            :error="formError.name" v-model="formData.phone" :type="'tel'"/>
            <BaseFormText :title="'Email'" :placeholder="'Введи ваш Email'"
            :error="formError.name" v-model="formData.email" :type="'email'"/>
            <BaseFormTextarea :title="'Комментарии'" :placeholder="'Ваши пожелания'"
            :error="formError.name" v-model="formData.comment" />
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery"
                  value="500" checked="">
                  <span class="options__value">
                    Курьером <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio"
                  name="pay" value="card" checked="">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li class="cart__order" v-for="(product, i) of basket" :key="i">
              <h3>{{product.title}}</h3>
              <b>{{product.price | formatNumbers}} ₽</b>
              <span>Артикул: {{product.id}}</span>
            </li>
          </ul>
          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого: <b>{{basket.length}}</b> товара на сумму <b>
              {{ (allIn + 500) | formatNumbers}} Р
              </b></p>
          </div>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
        <div v-if="errorMessage" class="cart__error form__error-block">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{errorMessage}}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import axios from 'axios';
import { mapGetters, mapMutations } from 'vuex';
import { API_BASE_URL } from '@/config';
import formatNumbers from '@/utils/formatNumber';
import BaseFormText from '../../Kit/BaseFormText.vue';
import BaseFormTextarea from '../../Kit/BaseFromTextarea.vue';

export default {
  components: {
    BaseFormText,
    BaseFormTextarea,
  },
  data() {
    return {
      formData: {},
      formError: {},
      errorMessage: '',
    };
  },
  methods: {
    order() {
      this.formError = {};
      axios.post(`${API_BASE_URL}/api/orders`, {
        ...this.formData,
      }, {
        params: {
          userAccessKey: this.userAccessKey,
        },
      }).then(resp => {
        this.$store.commit('updateOrderInfo', resp.data);
        this.$router.push({ name: 'orderInfo', params: { id: resp.data.id } });
        this.resetBasket();
      }).catch(err => {
        this.formError = err.response.data.error.request || {};
        this.errorMessage = err.response.data.error.message;
      });
    },
    ...mapMutations(['resetBasket']),
  },
  computed: {
    ...mapGetters({
      userAccessKey: 'getUserAccessKey',
      basket: 'getProductInCart',
      allIn: 'getTotalCost',
    }),
  },
  filters: {
    formatNumbers,
  },
};
</script>

<style>

</style>
