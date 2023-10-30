<template>
  <span v-if="withBrackets">({{ computedTime }})</span>
  <span v-else>{{ computedTime }}</span>
</template>

<script lang="ts" setup>
import {format} from 'timeago.js';
import {computed} from "vue";

const props = defineProps({
  date: {required: true, type: [Date, String, Number]},
  withBrackets: {type: Boolean, default: false},
});

const computedTime = computed(() => format(props.date));
</script>