<template>
  <div @click="$emit('update:modelValue',modelValue+1)">事件</div>
</template>

<script>
export default {
props:{
    modelValue:{
        type:Number,
        default:0
    }
}
}
</script>

<style>

</style>