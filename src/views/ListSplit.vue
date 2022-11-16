<template>
    <div class="container" v-if="list">

        <!-- CABECALHO -->
        <div class="row justify-content-center">
            <div class="col-md-4 col-sm-12 text-center">
                <p class="lead">{{ list.description }}</p>
                <div v-if="editingValue" class="mb-3">
                    <BasicInputs v-model="list" v-on:save="save()"></BasicInputs>
                    <hr class="my-4" />
                </div>
                <h2 v-else>
                    <span v-if="list.value">{{ $n(list.value, 'currency') }}</span>
                    <button type="button" @click="editingValue = true" class="btn btn-link btn-sm">{{ $t('edit')
                    }}</button>
                </h2>

            </div>
        </div>

        <!-- LISTA NOMES -->
        <div class="row justify-content-center">
            <div class="col-md-4 col-sm-12">
                <ul class="list-group mb-3">
                    <a href="javascript:void(0)" @click="openEditNameModal(item)"
                        class="list-group-item list-group-item-action d-flex justify-content-between lh-sm dropdown"
                        data-bs-toggle="modal" data-bs-target="#editNameModal" aria-expanded="false"
                        :class="{ 'bg-success': item.value }" v-for="item in list.items" :key="item.id">
                        <div :class="{ 'text-white': item.value }">
                            <h6 class="my-0">{{ item.name }}</h6>
                        </div>
                        <div v-if="item.value" class="text-white text-end">
                            <strong>{{ $n(item.value, 'currency') }}</strong>
                            <br />
                            <small v-if="item.sponsored">{{ $t('sponsoredTag') }}</small>
                            <small v-else-if="item.value">{{ $t('paid') }}</small>
                        </div>
                        <div v-else>
                            <span class="text-muted">{{ $n(eachValue, 'currency') }}</span>
                        </div>
                    </a>
                </ul>
                <hr class="my-4" />
            </div>
        </div>

        <!-- MODAL -->
        <div class="modal fade" id="editNameModal" tabindex="-1" aria-labelledby="editNameModalLabel"
            aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header" :class="{ 'bg-success text-white': editName.value }">
                        <h1 class="modal-title fs-5" id="editNameModal">{{ editName.name }}</h1>
                        <button type="button" class="btn-close" :class="{ 'btn-close-white': editName.value }"
                            data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div v-if="!editName.value">
                            <div class="row">
                                <div class="col-sm-6">
                                    <label for="valueToPay" class="form-label">{{ $t('paidValue') }}</label>
                                    <div class="input-group">                                        
                                        <CurrencyInput v-model="valueToPay" id="valueToPay" class="form-control form-control"
                                        :options="{ currency: 'BRL', currencyDisplay: 'hidden', autoDecimalDigits: true }" />
                                        <button class="btn btn-success" type="button" id="button-addon2">{{ $t('pay') }}</button>
                                    </div>                                    
                                </div>      
                            </div>
                            <hr class="my-4" />
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">{{ $t('close')
                        }}</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- NOVO NOME -->
        <div class="row justify-content-center">
            <div class="col-md-4 col-sm-12 needs-validation">
                <h4 class="mb-3">{{ $t('addName') }}</h4>
                <div class="mb-3">
                    <label for="name" class="form-label">{{ $t('yourName') }}</label>
                    <input v-model="newName.name" type="text" class="form-control" id="name"
                        autocomplete="do-not-autofill" required>
                    <div class="invalid-feedback">
                        {{ $t('requiredField') }}
                    </div>
                </div>
                <div class="mb-3">
                    <label for="value" class="form-label">{{ $t('sponsored') }}</label>
                    <CurrencyInput v-model="newName.value" id="value" class="form-control"
                        :options="{ currency: 'BRL', currencyDisplay: 'hidden', autoDecimalDigits: true }" />
                    <small class="text-muted">{{ $t('sponsoredTip') }}</small>
                </div>
                <div class="mb-3">
                    <button type="button" class="btn btn-success" :disabled="!newNameValid" @click="addName">{{
                            $t('save')
                    }}</button>
                </div>
            </div>
        </div>

    </div>
</template>
  
<script lang="ts">
import { ListModel } from '@/models/ListModel';
import { ListaService } from '@/services/ListService';
import { defineComponent } from 'vue';
import CurrencyInput from '@/components/CurrencyInput.vue'
import BasicInputs from '@/components/BasicInputs.vue'
import { ListItem } from '@/models/ListItem';

export default defineComponent({
    name: 'ListSplit',
    components: { BasicInputs, CurrencyInput },
    data() {
        return {
            editingValue: false,
            newNameValid: false,
            eachValue: 0,
            list: {} as ListModel,
            newName: {} as ListItem,
            editName: {} as ListItem,
            listaService: {} as ListaService,
            valueToPay: 0
        }
    },
    watch: {
        'newName.name'() {
            this.newNameValid = false;
            if (this.newName.name) {
                this.newNameValid = true;
            }
        }
    },
    methods: {
        calcEachValue() {
            const sponsoreds = this.list.items.filter((m: ListItem) => m.sponsored);
            const sumSponsoreds = sponsoreds.reduce((acc: number, item: ListItem) => {
                return acc + (item.value ?? 0);
            }, 0)
            const balance = (this.list.value - sumSponsoreds);

            if (this.list.items.length === 0) {
                this.eachValue = balance;
            } else {
                this.eachValue = balance / (this.list.items.length - sumSponsoreds);
            }
        },
        save() {
            this.editingValue = false;
            this.calcEachValue();
        },
        addName() {
            if (this.newName.value) {
                this.newName.sponsored = true;
            }

            this.listaService.addItem(this.list, this.newName)
            this.newName = {} as ListItem;
            this.newName.value = undefined;
            this.calcEachValue();
        },
        openEditNameModal(item: ListItem) {
            this.editName = item;
            this.valueToPay = this.eachValue           
        },
        deleteName(item: ListItem) {
            if (!confirm(this.$t('confirmDelete'))) {
                return;
            }

            console.log(this.list)
            this.listaService.removeItem(this.list, item);
            this.calcEachValue();
        }
    },
    mounted() {
        this.listaService = new ListaService();
        const id = (this.$route.params.id as string)
        const list = this.listaService.get(id)

        if (list) {
            this.list = list;
            this.calcEachValue();
        } else {
            this.$router.push("/")
        }
    }
});
</script>
  