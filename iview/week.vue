<template>
  <div class="cotent" @click="change">
    <DatePicker
      @on-open-change="change"
      id="pick_week"
      type="date"
      placeholder="Select date"
      style="width: 200px"
    ></DatePicker>
  </div>
</template>

<script>
export default {
  methods: {
    change() {
      let em = document.querySelectorAll(
        "#pick_week>.ivu-select-dropdown .ivu-date-picker-cells .ivu-date-picker-cells-cell"
      );
      for (let i = 1; i <= 7; i++) {
        em[i].onmouseenter = () => {
          this.addClass(1, 7);
        };
        em[i].onmouseleave = () => {
          this.clearClass(1, 7);
        };
      }

      for (let i = 8; i <= 14; i++) {
        em[i].onmouseenter = () => {
          this.addClass(8, 14);
        };
        em[i].onmouseleave = () => {
          this.clearClass(8, 14);
        };
      }

      for (let i = 15; i <= 21; i++) {
        em[i].onmouseenter = () => {
          this.addClass(15, 21);
        };
        em[i].onmouseleave = () => {
          this.clearClass(15, 21);
        };
      }

      for (let i = 22; i <= 28; i++) {
        em[i].onmouseenter = () => {
          this.addClass(22, 28);
        };
        em[i].onmouseleave = () => {
          this.clearClass(22, 28);
        };
      }

      for (let i = 29; i <= 35; i++) {
        em[i].onmouseenter = () => {
          this.addClass(29, 35);
        };
        em[i].onmouseleave = () => {
          this.clearClass(29, 35);
        };
      }
    },
    addClass(a, b) {
      for (let i = a; i <= b; i++) {
        document
          .querySelectorAll("#pick_week .ivu-date-picker-cells-cell")
          [i].classList.add("add");
      }
    },
    clearClass(a, b) {
      for (let i = a; i <= b; i++) {
        document
          .querySelectorAll("#pick_week .ivu-date-picker-cells-cell")
          [i].classList.remove("add");
      }
    }
  },
  mounted() {}
};
</script>

<style lang='less'>
#pick_week {
  .ivu-date-picker-cells-cell.add {
    background: #e1f0fe;
  }
}
</style>
