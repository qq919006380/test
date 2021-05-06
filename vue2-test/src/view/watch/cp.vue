<template>
  <div>
    {{ data }}
  </div>
</template>

<script>
export default {
  props:["data"],
  watch:{
      data:{
          handler(val){
              console.log(val)
          },
          deep:true
      }
  }
};
</script>

<style>
</style>