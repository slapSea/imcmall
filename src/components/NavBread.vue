<template>
  <div class="nav-breadcrumb-wrap">
    <div class="container">
      <nav class="nav-breadcrumb">
        <a href="/">Home</a>
        <slot name="bread"></slot>
        <slot name="B"></slot>
      </nav>
    </div>
  </div>
</template>

<script>
    export default {
        name: "NavBread"
    }
</script>

<style scoped>

</style>
