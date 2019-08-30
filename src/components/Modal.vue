<template>
  <div class="md-modal modal-msg md-modal-transition " v-bind:class="{'md-show':loginModelFlag}">
    <div class="md-modal-inner">
      <div class="md-top">
        <button class="md-close" @click="loginModelFlag=false">Close</button>
      </div>
      <div class="md-content">
        <div class="confirm-tips">
          <slot name="message"></slot>
        </div>
        <div class="btn-wrap">
          <slot name="btnGroup"></slot>
        </div>
      </div>
    </div>
  </div>
  <div class="md-overlay" v-if="loginModelFlag"></div>
</template>

<script>
    export default {
        name: "Modal"
    }
</script>

<style scoped>

</style>
