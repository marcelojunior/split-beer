<template>
  <div class="home">
    <NewView v-if="!$route.params.id"></NewView>
    <ListView v-else></ListView>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NewView from './NewView.vue';
import ListView from './ListView.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    NewView, ListView
  }
});
</script>
