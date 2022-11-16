<template>
    <div class="mb-3">
        <label for="value" class="form-label">{{ $t('valueToSplit') }}</label>
        <CurrencyInput v-model="list.value" id="value" class="form-control form-control-lg"
          :options="{ currency: 'BRL', currencyDisplay: 'hidden', autoDecimalDigits: true }" autocomplete="do-not-autofill" />
      </div>
      <div class="mb-3 was-validated">
        <label for="description" class="form-label">{{ $t('listDescription') }}</label>
        <textarea v-model="list.description" id="description" class="form-control" required></textarea>
        <div class="invalid-feedback">{{ $t('descriptionRequired') }}</div>
      </div>
      <div>
        <button type="button" class="btn btn-primary" :disabled="saving || !formValid" @click="save()">
          <span v-if="list.uid">{{ $t('saveChanges') }}</span>
          <span v-else>{{ $t('createList') }}</span>
          <span class="spinner-grow spinner-grow-sm" v-if="saving" role="status" aria-hidden="true"></span>
        </button>
      </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import CurrencyInput from '@/components/CurrencyInput.vue'
import { ListaService } from '@/services/ListService';
import { ListModel } from '@/models/ListModel';

export default defineComponent({
  name: 'BasicInputs',
  components: { CurrencyInput },
  emits: ["save", 'update:modelValue'],
  props: {
    modelValue: {
        type: Object as PropType<ListModel>,
        requide: true
    },
  },
  data: () => ({
    list: {} as ListModel,
    saving: false,
    formValid: false,
  }),
  watch: {
    'list.description' () {
      this.formValid = false;

      if (this.list.description){
        this.formValid = true;
      }
    }
  },
  methods: {
    save() {
      if (!this.list.description){
        return false;
      }

      this.saving = true;
      if (!this.list.uid){
        this.list.uid = this.generateUID();
        this.list.items = [] 
      }
      const listaService = new ListaService();

      listaService.save(this.list)
      this.$emit('update:modelValue', this.list)
      this.$emit('save', this.list)
    },
    generateUID() {
      let firstPart = (Math.random() * 46656) | 0;
      let secondPart = (Math.random() * 46656) | 0;
      return ("000" + firstPart.toString(36)).slice(-3) + ("000" + secondPart.toString(36)).slice(-3);
    }
  },
  mounted () {
    this.list = this.modelValue as ListModel;
  }
})
</script>