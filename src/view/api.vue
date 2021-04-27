<template>
  <div>
      <Button @click="api">触发接口</Button>
  </div>
</template>

<script>
export default {
methods:{
    api(){
        this.axios.get('http://localhost:8080/' + 'user/info').then(
            val=>{
                console.log(val)
            }
        )

    }
}
}
</script>

<style>

</style>