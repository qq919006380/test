<template>
  <div>msg2:{{ msg2 }}</div>
  <div>counter:{{ counter }}</div>
  <div>doubleCounter:{{ doubleCounter }}</div>
  <div ref="desc"></div>
  <!-- <div>{{desc}}</div> -->
</template>

<script>
import {
  computed,
  reactive,
  onMounted,
  onUnmounted,
  ref,
  toRefs,
  watch,
} from "vue";
export default {
  setup() {
    const { counter, doubleCounter } = useCounter();
    const msg2 = ref('来了来了');
    const desc = ref(null);
    watch(counter, (val, oldVal) => {
      console.log(desc.value)
      desc.value.textContent = `${oldVal}to${val}`;
    });
    // desc.value.textContent = `asd`;
    return { counter, doubleCounter, msg2,desc };
  },
};
function useCounter() {
  const data = reactive({
    counter: 1,
    doubleCounter: computed(() => data.counter * 2),
  });

  let timer;

  onMounted(() => {
    timer = setInterval(() => {
      data.counter++;
    }, 1000);
  });

  onUnmounted(() => {
    clearInterval(timer);
  });

  return toRefs(data);
}
</script>

<style>
</style>