<template>
  <div>
    <div>
      外面的flag：{{ flag }}
      <Button @click="on">切换</Button>
    </div>
    <Checkbox v-model="flag">x</Checkbox>
    <Checkbox v-model="flag">x</Checkbox>
    <Checkbox v-model="flase">x</Checkbox>
  </div>
</template>
<script>
export default {
  data() {
    return {
      flag: true,
    };
  },
  methods: {
    on() {
      this.flag = !this.flag;
    },
  },
};
</script>