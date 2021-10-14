<template>
  <div>
    {{area}}
    <al-selector v-if="refresh" data-type="code" model v-model="area" level="2" />
    <Button @click="update">event-update</Button>
    <Button @click="update2">event-update2</Button>
    <!-- <Button @click="area = ['130000', '130300', '130303']">update</Button>
    <Button @click="area = ['150000', '150300', '150303']">update2</Button>-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      refresh: true,
      area: []
    };
  },
  mounted(){},
  methods: {
    update() {
      this.refresh = false;
      this.$nextTick(() => {
        this.refresh = true;
        this.area = ["130000", "130300", "130303"];
      });
    },
    update2() {
      this.refresh = false;
      this.$nextTick(() => {
        this.refresh = true;
        this.area = ["150000", "150300", "150303"];
      });
    }
  }
};
</script>

<style>
</style>