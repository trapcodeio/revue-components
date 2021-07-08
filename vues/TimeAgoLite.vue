<template>
  <span v-if="withBrackets">{{ computedTime }}</span>
  <span v-else>({{ computedTime }})</span>
</template>

<script>
import {format} from 'timeago.js';

export default {
  name: 'TimeAgoLite',
  // props: ['date', 'withBrackets'],
  props: {
    date: { required: true},
    withBrackets: {type: Boolean, default: false},
  },
  computed: {
    computedTime() {
      return format(this.date);
    },
  },
};
</script>