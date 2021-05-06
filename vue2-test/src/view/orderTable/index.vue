<template>
  <div>
    <h2>table</h2>
    <orderRow></orderRow>
    <TableFlex></TableFlex>
  </div>
</template>

<script>
import orderRow from "./orderRow.vue";
import TableFlex from "./table_flex.vue";
export default {
  components: {
    orderRow,
    TableFlex
  }
};
</script>

<style>
</style>