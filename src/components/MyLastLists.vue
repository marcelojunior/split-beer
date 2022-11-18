<template>
    <v-card v-if="myLastLists.length > 0">
        <v-card-title>{{ $t('myLastLists') }}</v-card-title>
        <v-card-text>
            <v-table>
                <tbody>
                    <tr v-for="list in myLastLists" :key="list.uid">
                        <td><a :href="`/${list.uid}`" class="font-weight-light">{{ list.description }}</a></td>
                        <td class="text-right"><strong v-if="list.value">{{ $n(list.value, 'currency')
                        }}</strong></td>
                        <td class="text-right" style="width: 20px">
                            <v-btn variant="text" size="x-small" :to="`/${list.uid}`" icon="fa fa-link"></v-btn>
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </v-card-text>
    </v-card>
</template>

<script lang="ts">
import { ListModel } from '@/models/ListModel';
import { defineComponent } from 'vue'
export default defineComponent({
    name: "MyLastLists",
    data() {
        return {
            myLastLists: [] as ListModel[]
        }
    },
    methods: {
        changeLocale(locale: string) {
            this.$i18n.locale = locale;
            localStorage.setItem('locale', locale);
        }
    },
    mounted() {
        const storageLists = localStorage.getItem('lists');
        const uid = (this.$route.params.id as string)

        if (storageLists) {
            const lists = JSON.parse(storageLists) as ListModel[]
            this.myLastLists = lists.filter(m => m.uid !== uid)
            
        }
    }
})
</script>