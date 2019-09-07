<template>
  <div style="border:solid  1px">
    <div>{{model10}}</div>
    <Select @on-change="selectOnChange" v-model="model10" multiple style="width:260px">
      <Option v-for="item in dataList" :value="item.id" :key="item.id">{{ item.name }}</Option>
    </Select>
  </div>
</template>

<script>
export default {
  created() {
    this.dataList.unshift({ id: "all", name: "全选" });
  },

  data() {
    return {
      dataList: [
        {
          id: "11",
          name: "AAAA"
        },
        {
          id: "22",
          name: "BBBB"
        },
        {
          id: "333",
          name: "CCCC"
        },
        {
          id: "4444",
          name: "DDDD"
        },
        {
          id: "555",
          name: "EEEEE"
        },
        {
          id: "6666",
          name: "FFFFFF"
        }
      ],
      model10: [],
      flag: false
    };
  },
  methods: {
    selectOnChange(val) {
      console.log(val);
      if (val.includes("all")) {
        this.selectAll();
        return;
      }
      // if (val.length != this.dataList.length) {
      //   console.log("cancel all");
      //   this.model10.splice(this.model10.indexOf("all"), 1);
      //   return;
      // }
      if (this.flag) {
        this.cancelSelectAll();
      }
    },
    selectAll() {
      this.model10 = this.dataList.map(val => {
        return val.id;
      });
      this.flag = true;
    },
    cancelSelectAll() {
      this.model10 = [];
      this.flag = false;
    }
  }
};
</script>

<style>
</style>