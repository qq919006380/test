<template>
    <div class="host" ref="host">s</div>
</template>
<script>
import { render } from "../../_util/util.js";
import { ref, onMounted } from "vue";
import '../../_style/index.less'
export default {
    props:{},
    name:"Tab",
    setup(props) {
      const host = ref(null);
      let hostMap = null;
      onMounted(() => {
        hostMap = new render(host.value);
      });
      return {host}
    }
}
</script>
<style lang="less" scoped>

</style>
