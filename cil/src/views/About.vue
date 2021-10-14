<template>
  <div>{{ list }}</div>
</template>

<script>
export default {
  data() {
    return {
      // list: [
      //   { name: "b-2", level: '2' },
      //   { name: "b-3", level: '3' },
      //   { name: "b-3", level: '3' },
      //   { name: "b-2", level: '2' },
      //   { name: "b-3", level: '3' },
      //   { name: "b-4", level: '4' },
      // ],

      listMap: [
        {
          name: "b-2", level: '2', children: [
            { name: "b-3", level: '3' },
            { name: "b-3", level: '3' },
          ]
        },
        {
          name: "b-2", level: '2', children: [
            {
              name: "b-3", level: '3', children: [
                { name: "b-4", level: '4' },
              ]
            },
          ]
        },
      ],






      list: [
        {
          name: 'a',
          out: [
            { name: "a-2", level: '2' },
            { name: "a-3", level: '3' },
            { name: "a-2", level: '2' },
            { name: "a-3", level: '3' },
            { name: "a-4", level: '4' },
          ]
        },
        {
          name: 'b',
          out: [
            { name: "b-2", level: '2' },
            { name: "b-3", level: '3' },
            { name: "b-3", level: '3' },
            { name: "b-2", level: '2' },
            { name: "b-3", level: '3' },
            { name: "b-4", level: '4' },
          ]
        }
      ]
    }
  },
  mounted() {
    this.filter()
    // console.log(this.listToTree(this.list))
  },
  methods: {
    filter() {
      this.list.forEach(item => {
        if (item.out) {
          item.children = this.listToTree(item.out)
        }
      })
    },
    
    listToTree(list) {
      // 原数据中没有 level 为 1 的节点
      // 所以产生一个虚拟 root 节点
      // 而且根据节点序号猜测，节点序号是从 1 开始的
      let virtualRoot = { level: 1, children: [] };

      // path 记录当前处理路径，注意 virtualRoot 的序号是 0，正好是 level - 1
      let path = [virtualRoot];

      // 遍历处理
      list.forEach(it => {
        // 找到当前节点的层序号，及其父节点序号
        const levelIndex = parseInt(it.level) - 1;
        const parentLevelIndex = levelIndex - 1;
        // 根据序号找到父节点
        const parent = path[parentLevelIndex];
        // 将当前节点加入到父节点中
        (parent.children ??= []).push(it);
        // 同时将当前节点放入 path，若之前有同级节点，直接替换掉
        path[levelIndex] = it;
      });

      // 返回虚拟根的子节点集即可
      return virtualRoot.children;
    },


    
    getAllchildren(out) {
      let map = []
      out.map(val => {
        if (val.level == '2') {
          val.children = []
          map.push(val)
        }
        if (val.level == '3') {
          val.children = []
          map[map.length - 1].children.push(val)
        }
        if (val.level == '4') {
          val.children = []
          var a = map[map.length - 1].children
          a[a.length - 1].children.push(val)
        }
      })

      return map
    },
  }
}
</script>

<style>
</style>

