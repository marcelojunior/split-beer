<template>
  <div>
    <LogoHeader>
      <template v-slot:actions>
        <v-btn variant="text" to="/about">{{ $t('about') }}</v-btn>
      </template>
    </LogoHeader>
    <v-card>
      <v-card-text>
        <BasicInputs v-model="list" v-on:save="save($event)"></BasicInputs>
      </v-card-text>
    </v-card>

    <div class="mt-3">
      <MyLastList></MyLastList>
    </div>

    <div class="mt-5 text-center">
      <SelectLocale></SelectLocale>
    </div>
  </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import { ListModel } from '@/models/ListModel';
import BasicInputs from '@/components/BasicInputs.vue'
import LogoHeader from '@/components/LogoHeader.vue'
import MyLastList from '@/components/MyLastLists.vue'
import SelectLocale from '@/components/SelectLocale.vue'

export default defineComponent({
  name: 'NewView',
  components: { BasicInputs, LogoHeader, MyLastList, SelectLocale },
  data() {
    return {
      list: {} as ListModel,
    }
  },
  methods: {
    save(list: ListModel) {
      this.$router.push(`/${list.uid}`)
    },
  }
});
</script>
  