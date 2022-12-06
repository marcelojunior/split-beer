<template>
  <div>
    <LogoHeader>
      <template v-slot:actions>
        <v-btn variant="text" color="orange darken-1" to="/">{{
          $t("createList")
        }}</v-btn>
        <v-btn variant="text" to="/about">{{ $t("about") }}</v-btn>
      </template>
    </LogoHeader>

    <v-card variant="none">
      <v-card-text>
        <!-- CABEÇALHO -->
        <div v-if="loading && list" class="mb-3">
          <BasicInputs v-model="list" v-on:save="save()"></BasicInputs>
        </div>
        <div v-else class="text-center">
          <p class="text-h5 font-weight-light">{{ list.description }}</p>
          <p class="text-h4 font-weight-bold">
            <span v-if="list.value">{{ $n(list.value, "currency") }}</span>
            <v-btn
              size="x-small"
              variant="outlined"
              icon="fa fa-pencil"
              @click="loading = true"
            ></v-btn>
          </p>
        </div>

        <!-- NOVO NOME -->
        <div class="mt-3">
          <v-text-field
            v-model="newName.name"
            :label="$t('yourName')"
            :rules="requiredRule"
            autocomplete="do-not-autofill"
            variant="solo"
          ></v-text-field>
          <DecimalField
            v-model="newName.value"
            :label="$t('sponsored')"
            :hint="$t('sponsoredTip')"
            persistent-hint
            variant="solo"
          ></DecimalField>
          <v-btn
            color="success"
            :disabled="!newNameValid"
            class="mt-4"
            prepend-icon="fa fa-plus"
            @click="addName"
          >
            {{ $t("addName") }}
          </v-btn>
        </div>
      </v-card-text>
    </v-card>

    <v-divider class="my-5"></v-divider>

    <div class="mt-3">
      <!-- LISTA DE NOMES -->
      <v-expansion-panels>
        <v-expansion-panel
          v-for="(item, index) in list.items"
          :key="item.id"
          :selected="updateValueToPay(item)"
        >
          <v-expansion-panel-title
            expand-icon="fa fa-angle-down"
            collapse-icon="fa fa-angle-up"
            :color="item.value ? 'success' : ''"
          >
            <v-row>
              <v-col>
                <v-avatar size="19" color="blue-grey lighten-4" class="mr-2">
                  <small>{{ index + 1 }}</small>
                </v-avatar>
                <strong>{{ item.name }}</strong>
              </v-col>
              <v-col>
                <div class="text-right mr-2">
                  <div v-if="item.value" class="text-white text-end">
                    <strong>{{ $n(item.value, "currency") }}</strong>
                    <br />
                    <small v-if="item.sponsored">{{
                      $t("sponsoredTag")
                    }}</small>
                    <small v-else-if="item.value">{{ $t("paid") }}</small>
                  </div>
                  <div v-else-if="list.value">
                    <span class="text-disabled">{{
                      $n(eachValue, "currency")
                    }}</span>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <div v-if="!item.value && list.value" class="mb-3">
              <v-btn
                color="success"
                class="mt-2"
                prepend-icon="fa fa-check"
                :disabled="!item.valueToPay"
                size="large"
                :loading="paying"
                @click="pay(item)"
                block
              >
                {{ $t("paidN", { n: item.valueToPay }) }}
              </v-btn>
            </div>
            <v-btn
              prepend-icon="fa fa-trash"
              color="error"
              size="small"
              :loading="deleting"
              @click="deleteName(item)"
              variant="outlined"
              block
              >{{ $t("delete") }}</v-btn
            >
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>

      <!-- COMPARTILHAR -->
      <div v-if="list.items && list.items.length > 0">
        <v-btn
          variant="outlined"
          class="mt-3"
          prepend-icon="fa fa-whatsapp"
          @click="shareList()"
          block
        >
          {{ $t("copyListToShare") }}</v-btn
        >
        <div class="text-center">
          <small class="text-disabled">{{ $t("copyListToShareTip") }}</small>
        </div>
        <v-divider class="my-5"></v-divider>
      </div>
    </div>

    <div class="mt-3">
      <MyLastList></MyLastList>
    </div>

    <div class="mt-5 text-center">
      <SelectLocale></SelectLocale>
    </div>

    <v-snackbar v-model="snackbar" :timeout="3000">
      {{ snackbarText }}

      <template v-slot:actions>
        <v-btn
          icon="fa fa-close"
          size="small"
          @click="snackbar = false"
        ></v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
  
<script lang="ts">
import { ListModel } from "@/models/ListModel";
import { ListaService } from "@/services/ListService";
import { defineComponent } from "vue";
import BasicInputs from "@/components/BasicInputs.vue";
import { ListItem } from "@/models/ListItem";
import DecimalField from "@/components/DecimalField.vue";
import MyLastList from "@/components/MyLastLists.vue";
import SelectLocale from "@/components/SelectLocale.vue";
import LogoHeader from "@/components/LogoHeader.vue";

export default defineComponent({
  name: "ListView",
  components: {
    BasicInputs,
    DecimalField,
    MyLastList,
    SelectLocale,
    LogoHeader,
  },
  data() {
    return {
      loading: false,
      newNameValid: false,
      eachValue: 0,
      list: {} as ListModel,
      lists: [] as ListModel[],
      newName: {} as ListItem,
      editName: {} as ListItem,
      listaService: {} as ListaService,
      paying: false,
      deleting: false,
      snackbar: false,
      snackbarText: "",
    };
  },
  computed: {
    requiredRule() {
      return [(v: any) => !!v || this.$t("requiredField")];
    },
  },
  watch: {
    "newName.name"() {
      this.newNameValid = false;
      if (this.newName.name) {
        this.newNameValid = true;
      }
    },
  },
  methods: {
    calcEachValue() {
      const sponsoreds = this.list.items.filter((m: ListItem) => m.sponsored);
      const sumSponsoreds = sponsoreds.reduce((acc: number, item: ListItem) => {
        return acc + (item.value ?? 0);
      }, 0);
      const balance = this.list.value - sumSponsoreds;
      const totalSponsoreds = sponsoreds.length;

      if (this.list.items.length === 0) {
        this.eachValue = balance;
      } else {
        this.eachValue = balance / (this.list.items.length - totalSponsoreds);
      }
    },
    save() {
      this.loading = false;
      this.calcEachValue();
    },
    addName() {
      if (this.newName.value) {
        this.newName.sponsored = true;
      }

      this.listaService
        .addItem(this.list, this.newName)
        .then((model) => {
          this.newName = {} as ListItem;
          this.newName.value = undefined;
          this.calcEachValue();
        })
        .catch((error) => {
          alert(this.$t("internalError"));
        });
    },
    deleteName(item: ListItem) {
      if (!confirm(this.$t("confirmDelete"))) {
        return;
      }

      this.deleting = true;
      this.listaService
        .removeItem(this.list, item)
        .then((model) => {
          this.deleting = false;
          this.calcEachValue();
        })
        .catch((error) => {
          this.deleting = false;
          alert(this.$t("internalError"));
        });
    },
    updateValueToPay(item: ListItem) {
      item.valueToPay = this.$n(
        (item.value ?? this.eachValue) as number,
        "currency"
      );
    },
    pay(item: ListItem) {
      if (!confirm(this.$t("didYouPay"))) {
        return;
      }

      this.paying = true;
      item.value = this.eachValue;

      this.listaService
        .save(this.list)
        .then((model) => {
          this.paying = false;
        })
        .catch((error) => {
          this.paying = false;
          item.value = undefined;
          alert(this.$t("internalError"));
        });
    },
    shareList() {
      const names = this.list.items.map((item: ListItem, index: number) => {
        let name = `${index + 1}-${item.name}`;
        if (item.value) {
          name = name.padEnd(25, ".") + this.$n(item.value, "currency");
        }
        return name;
      });
      const text = `${this.list.description}

${this.$t("total")}: ${this.$n(this.list.value, "currency")}
${this.$t("addYourNameToTheList")}: ${document.URL}
${names.join("\n")}`;
      this.copyText(text, null).then(() => {
        this.snackbarText = this.$t("copyListMsg");
        this.snackbar = true;
      });
    },
    copyText(text: string, event: any): Promise<boolean> {
      return new Promise((resolve) => {
        const id = `copy-${(+new Date()).toString()}`;
        const copyText = document.createElement("textarea");
        copyText.id = id;
        copyText.innerHTML = text;
        copyText.style.position = "absolute";
        copyText.style.zIndex = "2147483648";
        copyText.style.top = "0";
        copyText.style.left = "0";
        copyText.style.opacity = "0";
        if (event) {
          event.target.parentNode.insertBefore(copyText, event.target);
        } else {
          document.body.appendChild(copyText);
        }
        copyText.focus();
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        document.execCommand("copy");
        copyText.remove();
        resolve(true);
      });
    },
  },
  mounted() {
    this.listaService = new ListaService();
    const uid = this.$route.params.id as string;
    this.listaService.get(uid).then((list) => {
      if (list && list.uid) {
        this.list = list;
        this.calcEachValue();
      } else {
        this.$router.push("/");
      }
    });

    const storageLists = localStorage.getItem("lists");
    if (storageLists) {
      const lists = JSON.parse(storageLists) as ListModel[];
      this.lists = lists.filter((m: ListModel) => m.uid !== uid);
    }
  },
});
</script>
  