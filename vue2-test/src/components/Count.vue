<template>
  <div>
    <div class="er-template">
      <p class="title">
        <span class="table_chnname" :title="data.chnname">{{data.chnname}}</span
        >(<span class="table_name">{{data.name}}</span>)
      </p>

      <div class="fileds_area">
        <div class="PK_field"></div>
        <div class="normal_field"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Count",
  props: {
    data: Object,
  },
  inject: ["getGraph", "getNode"],
  methods: {
    click() {
    },
  },
};
</script>
<style scoped>

</style>