<template>
  <div>{{obj}}</div>
</template>

<script>
export default {
  data(){
    return {
      obj:{
        a:"aa",
        b:"bb"
      }
    }
  },
  mounted(){
    setTimeout(()=>{
      // this.obj.c='xxx'
      this.$set(this.obj,'c','xxx')
    },800)
  }
 
};
</script>

<style>
</style>
