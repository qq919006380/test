<template>
  <Card>
    <template #header>
      <div>标题</div>
    </template>
    <div v-for="item in list">{{ item }}</div>
  </Card>
  <Button>按钮</Button>
  <!-- <Card header="标题">
    <div v-for="item in list">{{ item }}</div>
  </Card>

  <Card header="标题" elevation="5">
    <div v-for="item in list">{{ item }}</div>
  </Card> -->
</template>

<script>
import { onMounted, reactive, ref, toRefs } from "vue";

export default {
  setup() {
    let data = reactive({
      list: ["列表一", "列表二", "列表三"],
    });
    var z = ref("z");

    return {
      ...toRefs(data),
      z,
    };
  },
};
</script>