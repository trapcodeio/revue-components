<script lang="ts">
import {defineComponent} from "vue";
import {isDev} from "../vue3/utils";

// Convert object to json string
export function processData(data: any, space: number = 2) {
  if (typeof data === "object") {
    return JSON.stringify(data, null, space).trim();
  } else {
    return data;
  }
}

export default defineComponent({
  props: {
    data: {default: undefined},
    space: {type: Number, default: 2},
    id: {type: String, default: "debug"},
  },

  setup() {
    return {isDev, processData};
  }
});
</script>

<template>
  <template v-if="data">
    <pre v-if="isDev" :id="id" v-text="processData(data, space) || undefined"></pre>
  </template>
  <slot v-else></slot>
</template>