<template>
  <div>
    <Tabs v-model="activeName">
      <Tab title="vue目前使用人数最多">我是内容</Tab>
      <Tab title="react">ss</Tab>
      <Tab title="angular是一个大而全，生态周边很完善的框架">是一个大而全，生态周边很完善的框架"></Tab>
    </Tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: "react",
    };
  },
};
</script>
