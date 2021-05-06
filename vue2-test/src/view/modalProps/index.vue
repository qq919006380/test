<template>
  <div>
    <el-button type="text" @click="openModal">点击打开 Dialog</el-button>
    {{obj}}
    <Modal v-model="obj"></Modal>
  </div>
</template>

<script>
import Modal from "./modal";
export default {
  components: { Modal },
  data() {
    return {
      obj: {
        show: false,
      },
    };
  },
  methods:{
      openModal(){
          this.obj.show = true
          this.obj.id='s'
      }
  }
};
</script>

<style>
</style>