export default {
  state: {
    products: [
      {
        id: 1,
        title: 'Радионяня Motorola MBP16',
        price: 3_690,
        categoryId: 4,
        img: './img/radio.jpg',
        colorList: [
          '#222', '#73B6EA', '#8BE000',
        ],
      },
      {
        id: 2,
        title: 'Зубная щётка',
        price: 5_660,
        categoryId: 2,
        img: './img/toothbrush.jpg',
        colorList: [
          '#222', '#73B6EA', '#8BE000',
        ],
      },
      {
        id: 3,
        title: 'Мобильный телефон Xiaomi Poco X3 NFC 6/128GB',
        price: 18_990,
        categoryId: 1,
        img: './img/x248_trim.png',
        colorList: [
          '#222', '#73B6EA', '#8BE000',
        ],
      },
      {
        id: 4,
        title: 'Смартфон Xiaomi Mi Mix 3 6/128GB',
        price: 21_790,
        categoryId: 1,
        img: './img/phone.jpg',
        colorList: [
          '#222', '#73B6EA', '#8BE000',
        ],
      },
      {
        id: 5,
        title: 'Электроскейт Razor Cruiser',
        price: 24_690,
        categoryId: 3,
        img: './img/board.jpg',
        colorList: [
          '#222', '#73B6EA', '#8BE000',
        ],
      },
      {
        id: 6,
        title: 'Смартфон Xiaomi Mi A3 4/64GB Android One',
        price: 14_960,
        categoryId: 1,
        img: './img/phone-2.jpg',
        colorList: [
          '#222', '#73B6EA', '#8BE000',
        ],
      },
      {
        id: 7,
        title: 'Смартфон Xiaomi Redmi 6/128GB',
        price: 8_960,
        categoryId: 1,
        img: './img/phone-3.jpg',
        colorList: [
          '#222', '#73B6EA', '#8BE000',
        ],
      },
      {
        id: 8,
        title: 'Самокат',
        price: 39_900,
        categoryId: 3,
        img: './img/bicycle.jpg',
        colorList: [
          '#222', '#73B6EA', '#8BE000',
        ],
      },
      {
        id: 9,
        title: 'Гироскутер Razor Hovertrax 2.0',
        price: 34_900,
        categoryId: 3,
        img: './img/wheels.jpg',
        colorList: [
          '#222', '#73B6EA', '#8BE000',
        ],
      },
      {
        id: 10,
        title: 'Детский трюковой самокат Razor Grom',
        price: 4_990,
        categoryId: 3,
        img: './img/scooter.jpg',
        colorList: [
          '#222', '#73B6EA', '#8BE000',
        ],
      },
      {
        id: 11,
        title: 'Роллерсёрф Razor RipStik Air Pro',
        price: 6_690,
        categoryId: 3,
        img: './img/ripstik.jpg',
        colorList: [
          '#222', '#73B6EA', '#8BE000',
        ],
      },
      {
        id: 12,
        title: 'Наушники AirPods с беспроводным зарядным футляром',
        price: 16_560,
        categoryId: 5,
        img: 'img/airpods.jpg',
        colorList: [
          '#222', '#73B6EA', '#8BE000',
        ],
      },
      {
        id: 13,
        title: 'Наушники Sony',
        price: 30_690,
        categoryId: 5,
        img: 'img/headphones.jpg',
        colorList: [
          '#222', '#73B6EA', '#8BE000',
        ],
      },
    ],
  },
  getters: {
    getProductList(state) {
      return state.products;
    },
  },
};
