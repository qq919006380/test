<template>
  <div
    v-show="visible"
    class="pencil_host pencil_Toast"
    :class="'pencil_' + position"
  >
    <div ref="host" class="pencil_content">
      <div>内容：{{ message }}</div>
      <div @click.stop="close">关闭</div>
    </div>
  </div>
</template>
<script>
import { render } from "../../_util/util.js";
import { ref, onMounted } from "vue";
import "../../_style/index.less";
export default {
  props: {
    message: {
      type: [String, Object],
      default: "",
    },
    autoClose: {
      type: [Boolean, Number],
      default: 2,
      validator(value) {
        return value === false || typeof value === "number";
      },
    },
    onClose: {
      type: Function,
      required: true,
    },
    showClose: { type: Boolean, default: false },
    position: {
      type: String,
      default: "top",
      validator(value) {
        return ["top", "bottom", "middle"].indexOf(value >= 0);
      },
    },
    enableHtml: {
      type: Boolean,
      default: false,
    },
  },
  name: "Toast",
  setup(props) {
    const host = ref(null);
    let visible = ref(false);
    let hostMap = null;
    onMounted(() => {
      visible.value = true;
      hostMap = new render(host.value);
    });
    function close() {
      visible.value = false;
    }
    return { host, visible, close };
  },
};
</script>
<style lang="less">
@keyframes slide-up {
  0% {
    opacity: 0;
    transform: translateY(100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0%);
  }
}
@keyframes slide-down {
  0% {
    opacity: 0;
    transform: translateY(-100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0%);
  }
}
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.pencil_Toast {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  &.pencil_top {
    top: 0;
    .pencil_content {
      animation: slide-down 300ms;
    }
  }
  &.pencil_bottom {
    bottom: 0;
    .pencil_content {
      animation: slide-up 300ms;
    }
  }
  &.pencil_middle {
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    .pencil_content {
      animation: fade-in 300ms;
    }
  }
}
</style>
