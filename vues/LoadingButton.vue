<template>
  <button @click.prevent="onClick" :disabled="isLoading" :class="computedButtonClass">
    <span v-if="isLoading" class="blink">
      <i :class="icon" aria-hidden="true"></i>
      <template v-if="message">{{ message }}<span v-if="!noTripleDots">...</span></template>
    </span>
    <slot v-else/>
  </button>
</template>

<script>
export default {
  name: 'LoadingButton',
  model: {
    prop: 'loading',
    event: 'on-switch',
  },
  props: {
    icon: {
      type: "string",
      default: "fad fa-spinner-third fa-spin mr-1"
    },
    message: {
      type: [String, Boolean],
      default: 'Loading',
    },
    noTripleDots: {
      type: Boolean,
      default: false,
    },
    on: {
      type: String,
      default: '',
    },
    off: {
      type: String,
      default: '',
    },
    click: {
      type: Function,
      default: () => () => {
      },
    },
    loading: {
      type: Boolean,
      default: false,
    },
    data: {
      type: [Array, Object, String, Number, Boolean],
      default: null,
    },
    noButtonClass: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isLoading: false,
      buttonIsDisabled: false,
    };
  },
  computed: {
    computedButtonClass() {
      let $class = this.noButtonClass ? '' : 'loading-button ';
      let on = this.on;
      let off = this.off;
      if (off.length && !on.length) {
        on = off;
      }
      if (this.isLoading) {
        $class += on;
      } else {
        $class += this.off;
      }
      return $class;
    },
  },
  mounted() {
    if (this.loading) {
      this.startLoading();
    }
  },
  methods: {
    startLoading() {
      this.isLoading = true;
      this.buttonIsDisabled = true;
    },
    stopLoading(run = undefined) {
      this.isLoading = false;
      this.buttonIsDisabled = false;
      if (run && typeof run === 'function') run();
    },
    onClick() {
      if (!this.isLoading) {
        this.startLoading();
        return this.click(this, this.data);
      }
    },
  },
};
</script>

<style scoped>
.loading-button {
  @apply py-1.5 px-4 rounded-sm font-medium text-white;
  @apply focus:outline-none;
}
</style>