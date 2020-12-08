<template>
  <div>
    <div class="float-left">
      <slot name="left"></slot>
    </div>

    <div class="float-right">
      <slot name="right"></slot>
    </div>

    <div class="clear-both"></div>
  </div>
</template>

<script>
export default {
  name: 'LeftRight'
}
</script>