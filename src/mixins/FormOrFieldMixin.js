import BaseFromField from '../components/Kit/BaseFormField.vue';

export default {
  components: {
    BaseFromField,
  },
  props: ['title', 'error', 'placeholder', 'value'],
  computed: {
    dataValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },

};
