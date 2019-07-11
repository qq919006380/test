<template>
  <div>
    <Week></Week>
    <Pop :message="message"></Pop>
  </div>
</template>

<script>
import Week from "./iview/week.vue";
import Pop from "./iview/pop.vue";
export default {
  data() {
    return {
      message: {
        
      }
    };
  },
  mounted() {
    setTimeout(() => {
      this.message.a='asd'
    },500);
  },
  components: {
    Week,
    Pop
  }
};
</script>

<style>
</style>
