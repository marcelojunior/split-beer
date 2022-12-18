<template>
  <v-row class="mb-3" align="center">
    <v-col xs="9">
      <v-row class="hidden-sm-and-up">
        <v-col sm="12">
          <div class="float-left">
            <div class="text-h4 font-weight-light font-italic ml-1">
              Split Beer
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row class="hidden-xs">
        <v-col sm="3"><img src="../assets/logo.png" width="70" /></v-col>
        <v-col sm="9">
          <div class="float-left">
            <div class="text-h4 font-weight-light font-italic ml-1">
              Split Beer
            </div>
            <div class="text-h6 font-weight-light ml-1">
              {{ $t("slogan") }}
            </div>
          </div>
        </v-col>
      </v-row>
    </v-col>
    <v-col xs="3" class="text-center">
      <slot name="actions"></slot>
    </v-col>
  </v-row>
</template>