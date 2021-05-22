<template>
  <div>selected {{ modelValue }}</div>

  <div
    v-for="(title, index) in list"
    :ref="
      (el) => {
        if (title === modelValue) selectedItem = el;
      }
    "
    @click="select(title)"
    :key="index"
  >
    {{ title }}
  </div>
</template>
<script>
import { ref } from "vue";
export default {
  props: {
    modelValue: {
      type: String,
    },
  },
  setup(props, context) {
    let list = ref(["vue", "react", "angular"]);
    let selectedItem = ref(null);
    // function select(title) {
    //   context.emit('update:selected', title)
    // }
    const select = (title) => {
      console.log(selectedItem.value);
      context.emit("update:modelValue", title);
    };
    return { list, select, selectedItem };
  },
};
</script>