<template>
  <div>
    <Child v-model="foo" val="1">Foo</Child>
    {{ foo }}
  </div>
</template>

<script>
import Child from "./child";

export default {
  components: {
    Child,
  },
  data() {
    return {
      foo: [],
    };
  },
};
</script>