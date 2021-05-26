<template>
  <div>
    <Button>button</Button>
    <Button type="default">default</Button>
    <Button type="primary">primary</Button>
    <Button type="info">info</Button>
    <Button type="success">success</Button>
    <Button type="warning">warning</Button>
    <Button type="error">error</Button>
  </div>
  <div>
    <Button elevation="1">elevation1</Button>
    <Button elevation="2">elevation2</Button>
    <Button :elevation="3">elevation3</Button>
    <Button elevation="4">elevation4</Button>
    <Button elevation="5">elevation5</Button>
  </div>
  <div>
    <Button disabled>disabled</Button>
  </div>
  <div><Button @click="$toast('点击弹出提示', { position: 'top' })">toast</Button></div>

</template>

<script>
export default {
  name: "Home",
};
</script>
<style scoped lang='less'>
</style>

