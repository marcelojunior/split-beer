<template>
    <v-row class="mb-3" align="center">
        <v-col sm="12" md="9">
            <div class="hidden-md-and-up text-center">
                <div>
                    <img src="../assets/logo.png" width="90" />
                </div>
                <div class="text-h4 font-weight-light font-italic">Split Beer</div>
                <div class="text-h7 font-weight-light">{{ $t('slogan') }}</div>
            </div>
            <div class="hidden-sm-and-down">
                <div class="float-left">
                    <img src="../assets/logo.png" width="70" />
                </div>
                <div class="float-left">
                    <div class="text-h4 font-weight-light font-italic ml-1">Split Beer</div>
                    <div class="text-h6 font-weight-light ml-1">{{ $t('slogan') }}</div>
                </div>
            </div>
        </v-col>
        <v-col sm="12" md="3" class="text-center">
            <slot name="actions"></slot>
        </v-col>
    </v-row>
</template>