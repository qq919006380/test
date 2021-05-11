<template>
  <div>
    <input type="text" v-model="text" @input="inputValue" />
  </div>
</template>

<script>
export default {
  props: {
    value: String,
  },
  data(){
      return{
        text:this.value
      }
  },
  methods: {
    inputValue(val) {
      this.$emit("input", this.text);
    },
  },
};
</script>

<style>
</style>