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
  props: ["data", "space"],

  setup() {
    return {isDev, processData};
  }
});
</script>

<template>
  <template v-if="data">
    <pre v-if="isDev" v-text="processData(data, space) || undefined"></pre>
  </template>
  <slot v-else></slot>
</template>