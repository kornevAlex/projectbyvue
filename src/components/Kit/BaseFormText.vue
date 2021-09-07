<template>
  <BaseFromField :error="error" :title="title">
    <input class="form__input" :type="type" v-model="dataValue"
    :placeholder="placeholder">
  </BaseFromField>
</template>

<script>
import mixins from '../../mixins/FormOrFieldMixin';

export default {
  props: {
    type: {
      default: 'text',
    },
  },
  mixins: [mixins],
};
</script>
<style>

</style>
