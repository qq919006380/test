<template>
  
  <ul>
    <li v-for="(item, index) in items">
      <slot
        :item="item"
        :index="index"
      ></slot>
    </li>
  </ul>
</template>
<script>
export default {
  data() {
    return {
      items: ["Feed a cat", "Buy milk"],
    };
  },
};
</script>