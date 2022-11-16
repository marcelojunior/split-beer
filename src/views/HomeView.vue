<template>
  <div class="home">
    {{ $t('message') }}
    <NewSplit v-if="!$route.params.id"></NewSplit>
    <ListSplit v-else></ListSplit>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NewSplit from './NewSplit.vue';
import ListSplit from './ListSplit.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    NewSplit, ListSplit
  }
});
</script>
