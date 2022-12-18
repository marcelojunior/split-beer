<template>
  <span>
    <v-text-field
      v-model="valorDisplay"
      v-bind="$attrs"
      v-on:keypress="keyDown($event)"
      v-on:keyup="keyUp($event)"
      v-on:focus="focus()"
      v-on:blur="blur()"
      type="text"
      autocomplete="do-not-autofill"
    ></v-text-field>
    <input type="hidden" :id="id" :name="name" :modelValue="modelValue" />
  </span>
</template>
  
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "DecimalField",
  emits: ["update:modelValue"],
  props: {
    modelValue: null,
    precisao: {
      type: Number,
      default: 2,
    },
    id: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    somentePositivos: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      valorDisplay: "",
    };
  },
  watch: {
    modelValue(v) {
      this.parseDisplay();
    },
  },
  methods: {
    parseDisplay() {
      let format = {
        minimumFractionDigits: this.precisao,
        maximumFractionDigits: this.precisao,
      };

      if (this.modelValue == null || this.modelValue == "") {
        this.valorDisplay = "";
      } else {
        this.valorDisplay = this.modelValue.toLocaleString(
          navigator.language,
          format
        );
      }
    },
    focus() {
      if (this.valorDisplay != "" && this.valorDisplay != null) {
        this.valorDisplay = this.valorDisplay.replace(/\./g, "");
      }
    },
    blur() {
      if (this.valorDisplay == "" || this.valorDisplay == null) {
        this.$emit("update:modelValue", 0);
      } else {
        let valorDecimal = parseFloat(
          this.valorDisplay.replace(/\./g, "").replace(/,/g, ".")
        );
        this.$emit(
          "update:modelValue",
          parseFloat(valorDecimal.toFixed(this.precisao))
        );
      }
      setTimeout(() => {
        this.parseDisplay();
      }, 100);
    },
    keyDown(event: any) {
      let allow = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "0",
        ",",
        ".",
        "-",
        "Backspace",
        "Tab",
        "ArrowUp",
        "ArrowRight",
        "ArrowLeft",
        "ArrowDown",
      ];
      if (this.somentePositivos) allow.splice(allow.indexOf("-"), 1);
      if (!allow.includes(event.key)) {
        event.preventDefault();
      }
    },
    keyUp(event: any) {
      if (event.key == ".") {
        event.target.value = event.target.value.replace(/\./g, ",");
      }
    },
  },
  mounted() {
    this.parseDisplay();
  },
});
</script>