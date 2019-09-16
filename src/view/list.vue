<template>
  <div>
    <Checkbox v-model="val" @on-change='on'>val:{{val}}</Checkbox>
    <Checkbox disabled v-model="val">xxx</Checkbox>
  </div>
</template>

<script>
import Checkbox from "./components/checkbox";
export default {
  components: {
    Checkbox
  },
  data() {
    return {
      val: false
    };
  },
  methods:{
    on(val){
      console.log(val)
    }
  }
};
</script>


