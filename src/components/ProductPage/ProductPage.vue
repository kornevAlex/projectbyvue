<template>
  <div v-if="errorLoading">Страница не найдена</div>
  <div v-else-if="productLoading" class="cp-spinner cp-bubble"> </div>
  <main v-else-if="product" class='content container'>
    <div v-show="productAddBasket" class="toast toast_show">
      {{product.title}} добавлен в корзину
    <button @click="hiddenEl" class="toast__close" type="button">&times;</button>
    </div>
    <div class='content__top'>
      <ul class='breadcrumbs'>
        <li class='breadcrumbs__item'>
          <router-link class='breadcrumbs__link' :to="{name: 'main'}"> Каталог </router-link>
        </li>
        <li class='breadcrumbs__item'>
          <router-link class='breadcrumbs__link' :to="{name: 'main'}">
            {{product.category.title}}
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
            :src="product.image.file.url"
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
            </fieldset>

            <div class='item__row'>
              <FormCounter :productBasket.sync="productBasket"/>
              <button class='button button--primery' :disabled="productSending">
                <div v-if="productSending" class="loader"></div>
                {{loadingInBasket}}
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
import { mapGetters, mapActions } from 'vuex';
import formatNumbers from '@/utils/formatNumber';
import FormCounter from '../Kit/FormCounter.vue';

export default {
  components: {
    FormCounter,
  },
  data() {
    return {
      productBasket: 1,
      productAddBasket: false,
      productSending: false,
    };
  },
  computed: {
    loadingInBasket() {
      return this.productSending ? '' : 'В корзину';
    },
    ...mapGetters({
      product: 'getProduct',
      getCategory: 'getCategory',
      productLoading: 'getProductLoadingPage',
      errorLoading: 'getErrorLoadingProduct',
    }),
  },
  methods: {
    hiddenEl() {
      this.productAddBasket = false;
    },
    pushProduct() {
      this.productSending = true;
      this.addProducttoServer({
        id: this.product.id,
        count: this.productBasket,
      }).then(() => {
        this.productSending = false;
        this.productAddBasket = true;
        setTimeout(() => {
          this.productAddBasket = false;
        }, 3000);
      });
    },
    ...mapActions(['loadProductPage', 'addProducttoServer']),
  },
  filters: {
    formatNumbers,
  },
  watch: {
    '$route.params.id': {
      handler() {
        this.loadProductPage(this.$route.params.id);
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>
  .research {
    color: #fff;
    border-radius: 10px;
    border: 0;
    display: inline-block;
    text-align: center;
    font-size: 15px;
    padding: 4px;
    padding-left: 15px;
    padding-right: 15px;
    background-color: #5fba7d;
}
.cp-spinner {
    width: 48px;
    height: 48px;
    display: inline-block;
    box-sizing: border-box;
    position: relative;
    top:40%;
    left: 50%;
}
.cp-bubble {
    border-radius: 50%;
    width: 24px;
    height: 24px;
    display: inline-block;
    box-sizing: border-box;
    background: #58bd55;
    animation: cp-bubble-animate 1s linear infinite
}

.cp-bubble:before {
    border-radius: 50%;
    content: " ";
    width: 24px;
    height: 24px;
    display: inline-block;
    box-sizing: border-box;
    background-color: #58bd55;
    position: absolute;
    left: -30px;
    animation: cp-bubble-animate-before 1s ease-in-out infinite
}

.cp-bubble:after {
    border-radius: 50%;
    content: " ";
    width: 24px;
    height: 24px;
    display: inline-block;
    box-sizing: border-box;
    background-color: #58bd55;
    position: absolute;
    right: -30px;
    animation: cp-bubble-animate-after 1s ease-in-out infinite
}

@keyframes cp-bubble-animate {
    0% {
        opacity: .5;
        transform: scale(1) translateX(0)
    }
    25% {
        opacity: 1;
        transform: scale(1.1) translateX(-15px)
    }
    50% {
        opacity: 1;
        transform: scale(1.2) translateX(15px)
    }
    100% {
        opacity: .5;
        transform: scale(1) translateX(0)
    }
}

@keyframes cp-bubble-animate-before {
    0% {
        opacity: .5;
        transform: scale(1)
    }
    25% {
        transform: scale(1.1)
    }
    100%, 50% {
        opacity: 1;
        transform: scale(1)
    }
}

@keyframes cp-bubble-animate-after {
    0%, 50% {
        opacity: .5;
        transform: scale(1)
    }
    50% {
        transform: scale(1.1)
    }
    100%, 75% {
        opacity: 1;
        transform: scale(1)
    }
}
.toast {
overflow: hidden;
font-size: 0.875rem;
background-color: rgba(255, 255, 255, 0.5);
background-clip: padding-box;
border: 1px solid rgba(0, 0, 0, 0.1);
border-radius: 0.25rem;
box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.1);
backdrop-filter: blur(10px);
display: none;
position: absolute;
right: 50px;
background: rgb(75, 158, 75);
padding: 0.75rem 2rem 0.75rem 0.75rem;
overflow-wrap: break-word;
word-break: break-word;
}
.toast_show {
display: block;
}
.toast__close {
position: absolute;
top: 0;
right: 10px;
padding: 0;
background-color: transparent;
border: 0;
cursor: pointer;
float: right;
font-size: 1.5rem;
font-weight: 700;
line-height: 1;
color: #000;
text-shadow: 0 1px 0 #fff;
opacity: 0.6;
appearance: button;
margin: 0;
font-family: inherit;
border-radius: 0;
}
.loader {
    border: 5px solid #f3f3f3; /* Light grey */
    border-top: 5px solid #3498db; /* Blue */
    border-radius: 50%;
    top: calc(50% - 25px);
    left: calc(50% - 25px);
    width: 50px;
    height: 50px;
    position: absolute;
    animation: spin 2s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
.button--primery {
  position: relative;
}
</style>
