<template>
  <div class="text-center my-10">
    <i class="fad fa-spinner-third fa-3x fa-spin" aria-hidden="true"></i>
    <h6 v-if="message" class="text-md mt-1">{{ message }}...</h6>
  </div>
</template>
<script>
export default {
  name: 'Busy',
  props: {
    message: {
      type: String,
      default: 'Loading'
    }
  }
}
</script>