export default {
  state: {
    state: {
      categories: [
        {
          id: 0,
          title: 'Все категории',
        },
        {
          id: 1,
          title: 'Телефоны',
        },
        {
          id: 2,
          title: 'Зубные щётки',
        },
        {
          id: 3,
          title: 'Спортинвентарь',
        },
        {
          id: 4,
          title: 'Радионяни',
        },
        {
          id: 5,
          title: 'Наушники',
        },
      ],
    },
  },
  getters: {
    getCatigories(state) {
      return state.categories;
    },
  },
};
