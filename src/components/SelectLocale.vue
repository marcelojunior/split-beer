<template>
    <v-menu top>
        <template v-slot:activator="{ props }">
            <v-btn variant="text" color="disabled" prepend-icon="fa fa-globe" v-bind="props">{{ locales.find(m => m.locale === $i18n.locale)?.name }}</v-btn>
        </template>

        <v-list>
            <v-list-item v-for="(locale, index) in locales" :key="index" @click="changeLocale(locale.locale)">
                <v-list-item-title>{{ locale.name }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>


<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: "SelectLocale",
    data() {
        return {
            locales: [
                { name: 'Português', locale: 'pt' },
                { name: 'English', locale: 'en' },
            ],
        }
    },
    methods: {
        changeLocale(locale: string){
            this.$i18n.locale = locale;
            localStorage.setItem('locale', locale);
        }
    },
})
</script>