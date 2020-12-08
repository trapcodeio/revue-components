<template>
  <span><i :class="computedClass" :title="country"/></span>
</template>

<script>
import "./flags/flags.min.css";

export default {
  name: 'CountryFlag',
  props: {
    country: {
      default: 'us',
      type: String
    }
  },

  computed: {
    computedClass() {
      if (this.country) {
        return "flag flag-" + this.country.toLowerCase()
      }
      return ''
    }
  }
}
</script>