<template >
  <Card>
    <template #header>
        <div>卡片名称</div>
        <Button>配置</Button>
    </template>
    <div v-for="item in 3">列表内容{{ item }}</div>
  </Card>
</template>
<script>
export default {
    setup(props) {
        
    }
}
</script>