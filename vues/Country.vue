<template>
  <span v-if="flag">
    <CountryFlag :country="country"></CountryFlag> {{computedCountry}}
  </span>
  <span v-else>{{ computedCountry }}</span>
</template>

<script>
import countries from "./data/countries.json";
import CountryFlag from "./CountryFlag";

export default {
  name: 'Country',
  components: {CountryFlag},
  props: {
    country: {
      type: String,
      default: 'us'
    },
    flag: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    computedCountry() {
      const country = this.country;
      if (countries[country]) {
        return countries[country]
      } else {
        return `Unknown Country (${country})`
      }
    }
  }
}
</script>