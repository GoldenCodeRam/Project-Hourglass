<template>
  <div class="background">
    <div class="container">
      <p>Server status</p>
    </div>
  </div>
</template>

<script lang="ts">
export default {};
</script>

<style lang="scss" scoped>
@import "./colors.scss";

.background {
  .container {
    display: inline-block;
    padding: 0em 0.5em;
    margin: auto auto;
    border: 0.3em solid $panel-border;
    box-shadow: 3px 3px 3px 0.1px $panel-shadow,
      inset 0 0 0 0.2em $panel-inset;
    border-radius: 5px;
    background: $panel-background;
  }
}
</style>
