<template>
  <div>
      <tabs v-model="activeName">
          <tab title="vue目前使用人数最多"></tab>
          <tab title="react">目前使用人数最多"></tab>
          <tab title="angular是一个大而全，生态周边很完善的框架">是一个大而全，生态周边很完善的框架"></tab>
      </tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName:"react"
    }
  },
};
</script>
