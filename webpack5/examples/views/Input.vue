<template>
  <div>
    <Input v-model="text" @focus="focus"></Input>
  </div>
</template>
<script>
export default {
  data() {
    return {
      text: "xx",
    };
  },
  methods: {
    focus(){
        console.log(2);
    }
  },
};
</script>
