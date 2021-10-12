<template>
  <div class="box">
    <div class="item" v-for="item in list" :key="item.name">{{ item.name }}</div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      box: null,
      list: [
        { name: 'xx' },
        { name: 'xx' },
        { name: 'xx' },
        { name: 'xx' },
        { name: 'xx' },
        { name: 'xx' },
      ],
    };
  },
  methods: {
    // 滚动操作
    handleScroll(e) {
      //文档内容实际高度（包括超出视窗的溢出部分）
      let dom = e.target
      let scrollHeight = Math.max(dom.scrollHeight, dom.scrollHeight);
      //滚动条滚动距离
      let scrollTop = e.target.scrollTop;
      //窗口可视范围高度
      let clientHeight = dom.innerHeight || Math.min(dom.clientHeight, dom.clientHeight);
      if (clientHeight + scrollTop >= scrollHeight) {
        var i = 200
        while (i--) {
          this.list.push({ name: "222" })
        }
        console.log('到底部了')
      }
    },

  },
  mounted() {
    this.box = document.querySelector('.box')
    this.box.addEventListener('scroll', this.handleScroll, true)
  },
};
</script>

<style>
.box {
  width: 600px;
  height: 500px;
  overflow: scroll;
}
.item {
  height: 100px;
  border: solid 1px;
}
</style>