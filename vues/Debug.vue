<script lang="ts">
import {defineComponent} from "vue";
import {isDev} from "../vue3/utils";

// Convert object to json string
export function processData(data: any, space: number = 2) {
  if (typeof data === "object") {
    return JSON.stringify(data, null, space);
  } else {
    return data;
  }
}

export default defineComponent({
  props: ["data", "space"],

  setup() {
    return {isDev, processData}
  },
});
</script>

<template>
  <pre v-if="isDev" class="text-xs my-10">
    {{ data ? processData(data, Number(space)) : undefined }}

    <slot></slot>
  </pre>
</template>

