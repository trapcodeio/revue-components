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
    data: {
      default: {},
      type: Object as PropType<Record<any, any> | undefined>
    },
    forceShow: {default: false, type: Boolean},
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
  <div v-if="isDev || (!isDev && forceShow)">
    <template v-if="data">
      <div :id="id">
        <h6 v-if="header" :id="`${id}-header`" v-text="header"></h6>
        <pre v-text="processData(data, space)"></pre>
      </div>
    </template>
    <slot v-else></slot>
  </div>
</template>