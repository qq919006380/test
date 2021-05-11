<template>
  <div>
    <input v-model="text" type="text" @input="updateText" />
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  props: { modelValue: String },
  setup(props, context) {
    var text = ref(props.modelValue);
    const updateText = () => {
      console.log(text);
      context.emit("update:modelValue", text);
    };
    return { updateText, text };
  },
};
</script>

<style>
</style>