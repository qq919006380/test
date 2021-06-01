<template >
  <Card>
    <template #header>2</template>
    <h1 v-for="item in 3">列表内容{{ item }}</h1>
  </Card>
</template>
<script>
export default {
    setup(props) {
        
    }
}
</script>