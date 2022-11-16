<template>
  <van-row justify="center">
    <van-col span="20">
      <h1>{{ $t('newList') }}</h1>
      <BasicInputs v-model="list" v-on:save="save($event)"></BasicInputs>
    </van-col>
  </van-row>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import { ListModel } from '@/models/ListModel';
import BasicInputs from '@/components/BasicInputs.vue'

export default defineComponent({
  name: 'NewSplit',
  components: { BasicInputs },
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
  