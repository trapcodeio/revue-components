<script lang="ts">
import {defineComponent, PropType} from "vue";
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
    data: {default: undefined} as PropType<Record<any, any> | undefined>,
    space: {type: Number, default: 2},
    id: {type: String, default: "debug"},
    header: {type: String},
  },

  setup() {
    return {isDev, processData};
  }
});
</script>

<template>
  <template v-if="isDev">
    <template v-if="data">
      <div :id="id">
        <h6 v-if="header" :id="`${id}-header`" v-text="header"></h6>
        <pre v-text="processData(data, space)"></pre>
      </div>
    </template>
    <slot v-else></slot>
  </template>
</template>