<script lang="ts">
import {defineComponent} from "vue";
import {isDev} from "../vue3/utils";

export default defineComponent({
  props: ["data"],

  setup(props) {
    return {isDev}
  }
});
</script>

<template>
  <pre v-if="isDev" class="text-xs my-10">
    {{ data || undefined }}

    <slot></slot>
  </pre>
</template>

