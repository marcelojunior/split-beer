<template>
  <div>
    <LogoHeader>
      <template v-slot:actions>
        <v-btn variant="text" color="orange darken-1" to="/">{{ $t('createList') }}</v-btn>
      </template>
    </LogoHeader>
    <v-card>
      <v-card-title>{{ $t('about') }}</v-card-title>
      <v-card-text>
        <div v-html="$t('aboutText')"></div>
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
import { defineComponent } from 'vue'
import SelectLocale from '@/components/SelectLocale.vue'
import LogoHeader from '@/components/LogoHeader.vue'
import MyLastList from '@/components/MyLastLists.vue'

export default defineComponent({
  name: "AboutView",
  components: { SelectLocale, LogoHeader, MyLastList }
})
</script>
