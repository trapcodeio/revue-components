<template>
  <span @click.prevent="toggleDate" v-if="toggle" :title="computedDate" class="is-clickable">{{ toggledDate }}</span>
  <span @click.prevent="toggleDate" v-else :title="date" class="is-clickable">{{ computedDate }}</span>
</template>

<script>
import moment from "moment";

export default {
  props: {
    date: {
      type: [String, Date],
      default: null
    },
    format: {
      type: String,
      default: 'timeAgo'
    },
    dateFormat: {
      type: String,
      default: 'YYYY-MM-DD H:mm:ss'
    },
    canToggle: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      toggle: false
    }
  },
  computed: {
    toggledDate() {
      return moment(new Date(this.date)).format(this.dateFormat);
    },
    computedDate() {
      if (!this.date) return 'never';
      if (this.format === 'timeAgo') {
        return moment(new Date(this.date)).fromNow();
      } else if (this.format === 'default') {
        return moment(new Date(this.date)).format(this.dateFormat);
      } else {
        return moment(new Date(this.date)).format(this.format);
      }
    }
  },
  methods: {
    toggleDate() {
      if (this.canToggle) this.toggle = !this.toggle;
    }
  }
}
</script>