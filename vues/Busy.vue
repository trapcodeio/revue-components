<template>
  <div class="text-center my-10">
    <i :class="iconClass" aria-hidden="true"></i>
    <h6 v-if="message" :class="messageClass">{{ message }}...</h6>
  </div>
</template>
<script>
export default {
  name: 'Busy',
  props: {
    message: {
      type: String,
      default: 'Loading'
    },
    iconClass: {
      type: [String, Object],
      default: 'fad fa-spinner-third fa-3x fa-spin'
    },
    messageClass: {
      type: [String, Object],
      default: 'text-md mt-1',
    },
  }
}
</script>
<style>
/*
<include class="fad fa-spinner-third fa-3x fa-spin">
<include class="text-md mt-1">
*/
</style>