<template>
  <v-card v-if="myLastLists.length > 0" variant="none">
    <v-card-title>{{ $t("myLastLists") }}</v-card-title>
    <v-card-text>
      <v-table>
        <tbody>
          <tr v-for="list in myLastLists" :key="list.uid">
            <td style="width: 10px">
              <v-btn
                size="x-small"
                color="error"
                icon="fa fa-trash"
                variant="text"
                @click="removeList(list)"
              ></v-btn>
            </td>
            <td>
              <a :href="`/${list.uid}`" class="font-weight-light">{{
                list.description
              }}</a>
            </td>
            <td class="text-right">
              <strong v-if="list.value">{{
                $n(list.value, "currency")
              }}</strong>
            </td>
            <td class="text-right" style="width: 20px">
              <v-btn
                variant="text"
                size="x-small"
                :to="`/${list.uid}`"
                icon="fa fa-link"
              ></v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { ListModel } from "@/models/ListModel";
import { defineComponent } from "vue";
export default defineComponent({
  name: "MyLastLists",
  data() {
    return {
      myLastLists: [] as ListModel[],
    };
  },
  methods: {
    changeLocale(locale: string) {
      this.$i18n.locale = locale;
      localStorage.setItem("locale", locale);
    },
    removeList(list: ListModel) {
      if (!confirm(this.$t("confirmRemoveList"))) {
        return;
      }

      const storageLists = localStorage.getItem("lists");
      if (storageLists) {
        const lists = JSON.parse(storageLists) as ListModel[];
        const updatedLists = lists.filter((m) => m.uid !== list.uid);
        localStorage.setItem("lists", JSON.stringify(updatedLists));
        this.updateLastLists();
      }
    },
    updateLastLists() {
      const storageLists = localStorage.getItem("lists");
      const uid = this.$route.params.id as string;

      if (storageLists) {
        const lists = JSON.parse(storageLists) as ListModel[];
        this.myLastLists = lists.filter((m) => m.uid !== uid);
      }
    },
  },
  mounted() {
    this.updateLastLists();
  },
});
</script>