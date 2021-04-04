<template>
<div class="container">
  <table>
    <tr class="header">
      <th style="width: 10%"><i class="fab fa-slack-hash"></i></th>
      <th style="width: 50%">Hour</th>
      <th style="width: 40%">Comment</th>
    </tr>
    <tr v-for="date, index in dateLogs" :key="index">
      <td>{{index + 1}}</td>
      <td>{{date.hour.toLocaleString()}}</td>
      <td>{{date.comment}}</td>
    </tr>
  </table>
</div>
</template>

<script lang="ts">
export default {
  props: {
    dateLogs: Array,
  },
};
</script>

<style lang="scss" scoped>
@import "./colors.scss";

div.container {
  width: 80%;
  margin: auto;
}

table {
  width: 100%;
  margin: 1em auto;
  padding: 0.5em;
  background: $foreground;
  border-radius: 5px;
  border-collapse: collapse;
}
tr.header {
  border-bottom: 1pt solid $background;
}
th {
  padding: 0.5em 0;
  font-family: "Rubik", sans-serif;
  color: $white;
  font-size: 14pt;
  font-weight: bold;
}
td {
  padding: 0.3em 0;
  font-family: "Rubik", sans-serif;
  color: $white;
  font-size: 12pt;
}
</style>