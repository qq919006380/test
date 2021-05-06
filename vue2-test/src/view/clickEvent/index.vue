<template>
  <div>
    <div>
      <Button @click.native.stop="tets"></Button>
    </div>

    <div id="box" style="height: 100px;overflow: scroll;">
        <h1>asd</h1>
        <h1>asd</h1>
        <h1>asd</h1>
        <h1>asd</h1>

    </div>
  </div>
</template>

<script>
import Button from "./button";
export default {
  components: { Button },
  methods: {
    tets() {
      console.log("ss");
      document.body.style.overflow = "";
      var box = document.querySelector("#box");
      box.style.overflow = 'hidden';
      box.style.overflow = "";
      
    },
  },
};
</script>

<style>

</style>