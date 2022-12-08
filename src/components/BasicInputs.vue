<template>
  <div>
    <DecimalField v-model="list.value" :label="$t('valueToSplit')" variant="solo"></DecimalField>
    <v-textarea v-model="list.description" :label="$t('listDescription')" :rules="descriptionRules" variant="solo"
      required>
    </v-textarea>

    <v-toolbar color="white">
      <v-btn :disabled="saving || !formValid" @click="save()" color="success" variant="outlined" :loading="saving">
        <span v-if="list.uid">{{ $t('saveChanges') }}</span>
        <span v-else>{{ $t('createList') }}</span>
      </v-btn>
      <slot name="btn"></slot>
    </v-toolbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import DecimalField from '@/components/DecimalField.vue'
import { ListaService } from '@/services/ListService';
import { ListModel } from '@/models/ListModel';

export default defineComponent({
  name: 'BasicInputs',
  components: { DecimalField },
  emits: ["save", 'update:modelValue'],
  props: {
    modelValue: {
      type: Object as PropType<ListModel>,
      requide: true
    },
  },
  computed: {
    descriptionRules() {
      return [
        (v: any) => !!v || this.$t('descriptionRequired')
      ]
    }
  },
  data: () => ({
    list: {} as ListModel,
    saving: false,
    formValid: false,
  }),
  watch: {
    'list.description'() {
      this.formValid = false;

      if (this.list.description) {
        this.formValid = true;
      }
    }
  },
  methods: {
    save() {
      if (!this.list.description) {
        return false;
      }

      this.saving = true;
      if (!this.list.uid) {
        this.list.items = []
      }
      const listaService = new ListaService();

      listaService.save(this.list).then((model) => {
        this.$emit('update:modelValue', model)
        this.$emit('save', model)
      }).catch((error) => {
        this.saving = false;
        alert(this.$t('internalError'))
      })
    },
  },
  mounted() {
    this.list = this.modelValue as ListModel;
  }
})
</script>