<template>
  <TimeAgoLite :date="date" :class="{ 'text-xs': !inline }"></TimeAgoLite>
  <br v-if="!inline" />
  <template v-else> - </template>
  <small>{{ computedDate }}</small>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TimeAgoLite from "./TimeAgoLite.vue";

export default defineComponent({
  name: "DateSummary",
  components: {TimeAgoLite},
  props: {
    date: {
      type: [String, Date],
      required: true
    },
    inline: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    computedDate(): string {
      let date = this.date as string | Date;
      if (typeof date === "string") date = new Date(date);
      return date.toLocaleString().split("/").join("-");
    }
  }
});
</script>
