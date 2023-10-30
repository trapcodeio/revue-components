<template>
  <span v-if="withBrackets">({{ computedTime }})</span>
  <span v-else-if="realtime">{{ realTimeValue }}</span>
  <span v-else>{{ computedTime }}</span>
</template>

<script lang="ts" setup>
import {format} from 'timeago.js';
import {computed, ref, watch, watchEffect} from "vue";

const props = defineProps({
  date: {required: true, type: [Date, String, Number]},
  withBrackets: {type: Boolean, default: false},
  realtime: {type: Boolean, default: false},
  realtimeInterval: {type: Number, default: 1000}
});

const computedTime = computed(() => format(props.date));
const realTimeValue = ref();

if(props.realtime) {
  watch(computedTime, () => {
    realTimeValue.value = computedTime.value;
  });

  setInterval(() => {
    realTimeValue.value = computedTime.value;
  }, props.realtimeInterval);
}
</script>