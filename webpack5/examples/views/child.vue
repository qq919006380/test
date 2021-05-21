<template>
  <label>
    {{ $attrs }}
    {{ $props }}
    <input type="checkbox" v-model="model" :value="val" />
    <slot />
  </label>
</template>

<script>
export default {
  model: {
    prop: "modelValue",
    event: "update:modelValue",
  },
  props: {
    modelValue: null,
    val: null,
  },
  computed: {
    model: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
};
</script>