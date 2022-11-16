<template>
  <input ref="inputRef" type="text" autocomplete="do-not-autofill" />
</template>
  
<script lang="ts">
import { defineComponent } from 'vue'
import { useCurrencyInput } from 'vue-currency-input'

export default defineComponent({
  name: 'CurrencyInput',
  props: {
    modelValue: Number, // Vue 2: value
    options: Object
  },
  setup(props: any) {
    const { inputRef } = useCurrencyInput(props.options);
    return { inputRef }
  }
})
</script>