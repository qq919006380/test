<template>
  <Card>
    <template #header> 标题 </template>
    <div v-for="item in list">{{ item }}</div>
  </Card>
  <Card header="标题" style="width:100px">
    <div v-for="item in list">{{ item }}</div>
  </Card>
</template>

<script>
import { reactive, toRefs } from "vue";

export default {
  setup() {
    let data = reactive({
      list: ["列表一", "列表二", "列表三"],
    });
    return {
      ...toRefs(data),
    };
  },
};
</script>