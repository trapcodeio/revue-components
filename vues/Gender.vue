<template>
  <span class="has-tooltip">
    <span class="tooltip capitalize">{{gender}}</span>
    <i v-if="gender==='male'" class="fad fa-male" aria-hidden="true"></i>
    <i v-else-if="gender==='female'" class="fad fa-female" aria-hidden="true"></i>
    <i v-else class="fad fa-genderless" aria-hidden="true"></i>
  </span>
</template>

<script>
export default {
  name: "Gender",
  props: {
    gender: {
      type: String,
      default: "unknown"
    }
  }
}
</script>