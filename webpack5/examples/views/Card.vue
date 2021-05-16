<template>
  <Card>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias laudantium consequatur facilis enim ipsa eius, reiciendis modi voluptatibus expedita possimus earum laborum voluptas doloribus fuga dicta non culpa labore totam!
  </Card>
</template>

<script>
import { reactive, ref } from "vue";

export default {
  setup() {
    let num = ref(123);
    let data = reactive({
      age: 13,
      name: "jack",
    });
    return {
      num,
      data,
    };
  },
};
</script>