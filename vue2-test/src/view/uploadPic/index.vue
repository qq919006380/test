<template>
  <div>
    <input type="file" id="file_input" @change="show_image" />
    <img :src="src" width="100px" height="100px" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      src: "",
    };
  },
  methods: {
    show_image(e) {
      var target = e.target.files[0];
      this.src = window.URL.createObjectURL(target);
    },
  },
};
</script>

<style>
</style>