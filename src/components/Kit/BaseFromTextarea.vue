<template>
  <BaseFromField :error="error" :title="title">
    <textarea class="form__input" type="text" v-model="dataValue"
    :placeholder="placeholder">
    </textarea>
  </BaseFromField>
</template>

<script>
import mixins from '../../mixins/FormOrFieldMixin';

export default {
  mixins: [mixins],
};
</script>

<style>

</style>
